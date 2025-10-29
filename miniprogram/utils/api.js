// utils/api.js
const config = require('./config')

/**
 * 图片增强API调用
 * @param {string} imagePath - 本地图片路径
 * @param {Function} onProgress - 进度回调
 * @returns {Promise} 处理结果
 */
function enhanceImage(imagePath, onProgress) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now()
        let timeoutId = null

        // 设置全局超时保护（30秒）
        timeoutId = setTimeout(() => {
            reject(new Error('处理超时：30秒内未完成，请检查网络连接或稍后重试'))
        }, config.globalTimeout)

        // 步骤1: 获取预签名URL
        console.log('步骤1: 获取预签名URL...')

        console.log('开始获取预签名URL:', `${config.baseURL}/api/v1/upload/presigned-url`)

        wx.request({
            url: `${config.baseURL}/api/v1/upload/presigned-url`,
            method: 'POST',
            data: {
                user_id: 'wx_user_' + Date.now(), // 微信用户ID
                file_type: 'image/jpeg',
                file_size: 0, // 将在上传时自动获取
                filename: 'image.jpg'
            },
            timeout: config.timeout,
            success: (res) => {
                console.log('预签名URL请求响应:', {
                    statusCode: res.statusCode,
                    data: res.data
                })

                if (res.statusCode !== 200 || !res.data) {
                    clearTimeout(timeoutId)
                    const errorMsg = `获取预签名URL失败: HTTP ${res.statusCode}`
                    console.error(errorMsg, res)
                    reject(new Error(errorMsg))
                    return
                }

                if (res.data.success) {
                    // 服务器返回的是 cos_key，兼容 file_key
                    const fileKey = res.data.cos_key || res.data.file_key
                    const { presigned_url } = res.data

                    if (!presigned_url || !fileKey) {
                        clearTimeout(timeoutId)
                        const errorMsg = '预签名URL响应数据不完整'
                        console.error(errorMsg, {
                            hasPresignedUrl: !!presigned_url,
                            hasCosKey: !!res.data.cos_key,
                            hasFileKey: !!res.data.file_key,
                            data: res.data
                        })
                        reject(new Error(errorMsg))
                        return
                    }

                    console.log('预签名URL获取成功:', {
                        file_key: fileKey,
                        cos_key: res.data.cos_key,
                        presigned_url_length: presigned_url.length
                    })

                    // 步骤2: 上传图片到COS
                    uploadToCos(imagePath, presigned_url, fileKey, onProgress)
                        .then(() => {
                            // 步骤3: 通知处理图片
                            console.log('步骤3: 通知处理图片...')

                            return new Promise((resolveReq, rejectReq) => {
                                // 使用 /api/v1/single-process-uploaded-image 接口
                                // 该接口接受 cos_key 参数（不是 file_key）
                                const enhanceRequestData = {
                                    cos_key: fileKey, // 使用 cos_key 参数
                                    tile_size: 400,
                                    quality_level: 'high'
                                }

                                console.log('发送处理请求:', {
                                    url: `${config.baseURL}/api/v1/single-process-uploaded-image`,
                                    data: enhanceRequestData
                                })

                                wx.request({
                                    url: `${config.baseURL}/api/v1/single-process-uploaded-image`,
                                    method: 'POST',
                                    data: enhanceRequestData,
                                    timeout: config.timeout,
                                    success: (enhanceRes) => {
                                        console.log('处理请求响应:', {
                                            statusCode: enhanceRes.statusCode,
                                            data: enhanceRes.data
                                        })

                                        if (enhanceRes.statusCode !== 200 || !enhanceRes.data) {
                                            const errorMsg = `处理请求失败: HTTP ${enhanceRes.statusCode}`
                                            console.error(errorMsg, enhanceRes)
                                            rejectReq(new Error(errorMsg))
                                            return
                                        }

                                        if (enhanceRes.data.success) {
                                            const elapsed = Date.now() - startTime
                                            console.log(`图片处理成功 (耗时: ${elapsed}ms):`, enhanceRes.data)
                                            
                                            // 检查返回结果：可能直接返回cdn_url，也可能返回task_id需要轮询
                                            if (enhanceRes.data.cdn_url) {
                                                // 同步处理完成，直接返回
                                                clearTimeout(timeoutId)
                                                console.log('处理完成，图片URL:', enhanceRes.data.cdn_url)
                                                resolveReq(enhanceRes.data)
                                            } else if (enhanceRes.data.task_id) {
                                                // 异步处理，需要轮询任务状态
                                                // 这里应该使用轮询逻辑，但为了简化，先返回错误提示
                                                // 实际应该调用轮询接口
                                                clearTimeout(timeoutId)
                                                console.warn('返回了task_id，需要轮询:', enhanceRes.data.task_id)
                                                // 暂时返回错误，告知需要实现轮询
                                                rejectReq(new Error('处理已提交，返回了task_id，需要实现轮询逻辑。task_id: ' + enhanceRes.data.task_id))
                                            } else {
                                                clearTimeout(timeoutId)
                                                console.error('处理成功但未返回图片URL或task_id:', enhanceRes.data)
                                                rejectReq(new Error('处理成功但未返回图片URL或task_id，响应数据: ' + JSON.stringify(enhanceRes.data)))
                                            }
                                        } else {
                                            clearTimeout(timeoutId)
                                            const errorMsg = `图片处理失败: ${enhanceRes.data.error || enhanceRes.data.message || enhanceRes.data.detail || '未知错误'}`
                                            console.error(errorMsg, enhanceRes.data)
                                            rejectReq(new Error(errorMsg))
                                        }
                                    },
                                    fail: (error) => {
                                        const errorMsg = `处理请求失败: ${error.errMsg || '网络错误'}`
                                        console.error(errorMsg, error)
                                        rejectReq(new Error(errorMsg))
                                    }
                                })
                            })
                        })
                        .then((result) => {
                            clearTimeout(timeoutId)
                            resolve(result)
                        })
                        .catch((error) => {
                            clearTimeout(timeoutId)
                            console.error('图片处理流程出错:', error)
                            reject(error)
                        })
                } else {
                    clearTimeout(timeoutId)
                    const errorMsg = `获取预签名URL失败: ${res.data.error || res.data.message || '未知错误'}`
                    console.error(errorMsg, res.data)
                    reject(new Error(errorMsg))
                }
            },
            fail: (error) => {
                clearTimeout(timeoutId)
                const errorMsg = `获取预签名URL失败: ${error.errMsg || '网络错误'}`
                console.error(errorMsg, error)
                reject(new Error(errorMsg))
            }
        })
    })
}

/**
 * 上传图片到COS
 * @param {string} imagePath - 本地图片路径
 * @param {string} presignedUrl - 预签名URL
 * @param {string} fileKey - 文件键
 * @param {Function} onProgress - 进度回调
 * @returns {Promise}
 */
function uploadToCos(imagePath, presignedUrl, fileKey, onProgress) {
    return new Promise((resolve, reject) => {
        console.log('步骤2: 上传到COS...', {
            fileKey: fileKey,
            imagePath: imagePath.substring(0, 50) + '...',
            presignedUrl: presignedUrl.substring(0, 100) + '...'
        })

        // 上传文件使用较长的超时时间（上传可能较慢，但不超过全局超时）
        const uploadTimeout = 20000 // 20秒上传超时（全局30秒超时，留10秒给处理）

        let uploadTimeoutId = null

        // 设置上传超时保护
        uploadTimeoutId = setTimeout(() => {
            console.error('上传图片超时')
            reject(new Error('上传图片超时，请检查网络连接'))
        }, uploadTimeout)

        // COS PUT预签名URL需要 use wx.request 而不是 wx.uploadFile
        // 因为 wx.uploadFile 使用 POST multipart/form-data，而预签名URL是 PUT 方法
        // 先读取文件为 base64
        wx.getFileSystemManager().readFile({
            filePath: imagePath,
            encoding: 'base64',
            success: (readRes) => {
                // 将base64转换为ArrayBuffer
                const base64Data = readRes.data
                const arrayBuffer = wx.base64ToArrayBuffer(base64Data)

                console.log('文件读取成功，开始上传到COS，文件大小:', arrayBuffer.byteLength)

                // 使用 wx.request 发送 PUT 请求
                wx.request({
                    url: presignedUrl,
                    method: 'PUT',
                    data: arrayBuffer,
                    header: {
                        // 不设置Content-Type，让COS自动检测
                        // 预签名URL已经包含了所有签名信息
                    },
                    timeout: uploadTimeout,
                    success: (res) => {
                        clearTimeout(uploadTimeoutId)
                        console.log('上传到COS响应:', {
                            statusCode: res.statusCode,
                            dataLength: res.data ? res.data.length : 0
                        })

                        // COS PUT操作成功返回200或204
                        if (res.statusCode === 200 || res.statusCode === 204) {
                            console.log('上传到COS成功')
                            resolve()
                        } else {
                            // 解析XML错误响应
                            let errorDetail = '上传失败'
                            let errorData = res.data
                            if (typeof errorData === 'string' && errorData.indexOf('<Error>') !== -1) {
                                try {
                                    // 简单提取XML中的错误信息
                                    const codeMatch = errorData.match(/<Code>(.*?)<\/Code>/)
                                    const messageMatch = errorData.match(/<Message>(.*?)<\/Message>/)
                                    if (codeMatch) errorDetail += `: ${codeMatch[1]}`
                                    if (messageMatch) errorDetail += ` - ${messageMatch[1]}`
                                } catch (e) {
                                    console.error('解析错误响应失败:', e)
                                }
                            }
                            const errorMsg = `上传到COS失败: HTTP ${res.statusCode} - ${errorDetail}`
                            console.error(errorMsg, {
                                statusCode: res.statusCode,
                                data: typeof errorData === 'string' ? errorData.substring(0, 300) : errorData
                            })
                            reject(new Error(errorMsg))
                        }
                    },
                    fail: (error) => {
                        clearTimeout(uploadTimeoutId)
                        // 检查是否是域名白名单错误
                        if (error.errMsg && error.errMsg.indexOf('url not in domain list') !== -1) {
                            console.error('COS上传失败：域名不在白名单中:', error)
                            reject(new Error('COS域名配置问题：无法直接上传到腾讯云COS，请联系技术支持配置域名白名单或使用服务器中转接口'))
                        } else if (error.errMsg && (error.errMsg.indexOf('timeout') !== -1 || error.errMsg.indexOf('超时') !== -1)) {
                            console.error('上传图片超时:', error)
                            reject(new Error('上传图片超时，请检查网络连接'))
                        } else {
                            const errorMsg = `上传到COS失败: ${error.errMsg || '网络错误'}`
                            console.error(errorMsg, error)
                            reject(new Error(errorMsg))
                        }
                    }
                })
            },
            fail: (readError) => {
                clearTimeout(uploadTimeoutId)
                console.error('读取文件失败:', readError)
                reject(new Error(`读取图片文件失败: ${readError.errMsg || '未知错误'}`))
            }
        })
    })
}

/**
 * 简化版API调用（推荐使用）
 * @param {string} imagePath - 本地图片路径
 * @returns {Promise}
 */
function enhanceImageSimple(imagePath) {
    return enhanceImage(imagePath, (progress) => {
        console.log(`处理进度: ${progress}%`)
    })
}

module.exports = {
    enhanceImage,
    enhanceImageSimple
}

