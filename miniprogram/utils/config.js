// utils/config.js
const config = {
    // API基础URL
    baseURL: 'https://www.gongjuxiang.work',

    // 超时时间（毫秒）
    timeout: 30000, // 30秒（处理一张图片需要7秒，30秒足够）

    // 全局处理超时（毫秒）
    globalTimeout: 30000, // 30秒全局超时保护

    // 请求头
    headers: {
        'Content-Type': 'application/json'
    }
}

module.exports = config

