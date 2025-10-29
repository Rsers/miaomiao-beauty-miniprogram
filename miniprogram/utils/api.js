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
        // 步骤1: 获取预签名URL
        console.log('步骤1: 获取预签名URL...')

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
                if (res.data.success) {
                    const { presigned_url, file_key } = res.data
                    console.log('预签名URL获取成功:', file_key)

                    // 步骤2: 上传图片到COS
                    uploadToCos(imagePath, presigned_url, file_key, onProgress)
                        .then(() => {
                            // 步骤3: 通知处理图片
                            console.log('步骤3: 通知处理图片...')

                            return wx.request({
                                url: `${config.baseURL}/api/v1/enhance-by-key`,
                                method: 'POST',
                                data: {
                                    file_key: file_key,
                                    tile_size: 400,
                                    quality_level: 'high',
                                    user_id: 'wx_user_' + Date.now()
                                },
                                timeout: config.timeout
                            })
                        })
                        .then((enhanceRes) => {
                            if (enhanceRes.data.success) {
                                console.log('图片处理成功:', enhanceRes.data)
                                resolve(enhanceRes.data)
                            } else {
                                reject(new Error(`图片处理失败: ${enhanceRes.data.error}`))
                            }
                        })
                        .catch(reject)
                } else {
                    reject(new Error(`获取预签名URL失败: ${res.data.error}`))
                }
            },
            fail: reject
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
        console.log('步骤2: 上传到COS...')

        wx.uploadFile({
            url: presignedUrl,
            filePath: imagePath,
            name: 'file',
            header: {
                'Content-Type': 'image/jpeg',
                'x-cos-acl': 'public-read' // 设置公开读取权限
            },
            success: (res) => {
                if (res.statusCode === 200) {
                    console.log('上传到COS成功')
                    resolve()
                } else {
                    reject(new Error(`上传到COS失败: ${res.statusCode}`))
                }
            },
            fail: reject
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

