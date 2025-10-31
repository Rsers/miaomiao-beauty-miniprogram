// utils/errorHandler.js

/**
 * 处理API错误
 * @param {Error} error - 错误对象
 */
function handleApiError(error) {
    console.error('API错误:', error)

    let message = '处理失败，请重试'

    if (error.message) {
        if (error.message.indexOf('网络') !== -1) {
            message = '网络连接失败，请检查网络设置'
        } else if (error.message.indexOf('超时') !== -1) {
            message = '处理超时，图片可能过大，请重试'
        } else if (error.message.indexOf('权限') !== -1) {
            message = '权限不足，请联系管理员'
        } else if (error.message.indexOf('CORS') !== -1) {
            message = '跨域问题，请检查域名配置'
        } else if (error.message.indexOf('500') !== -1) {
            message = '服务器错误，请稍后重试'
        } else if (error.message.indexOf('url not in domain list') !== -1) {
            message = '域名配置问题，请联系技术支持'
        } else {
            message = error.message
        }
    }

    // 检查errMsg中的域名配置错误
    if (error.errMsg && error.errMsg.indexOf('url not in domain list') !== -1) {
        message = '域名配置问题，请联系技术支持配置COS域名'
    }

    wx.showModal({
        title: '处理失败',
        content: message,
        showCancel: false,
        confirmText: '确定'
    })
}

/**
 * 网络状态检查
 */
function checkNetworkStatus() {
    return new Promise((resolve, reject) => {
        wx.getNetworkType({
            success: (res) => {
                if (res.networkType === 'none') {
                    reject(new Error('网络连接不可用'))
                } else {
                    resolve(res.networkType)
                }
            },
            fail: () => {
                reject(new Error('无法获取网络状态'))
            }
        })
    })
}

module.exports = {
    handleApiError,
    checkNetworkStatus
}
