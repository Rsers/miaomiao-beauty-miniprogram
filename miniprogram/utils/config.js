// utils/config.js
const config = {
    // API基础URL
    baseURL: 'https://www.gongjuxiang.work',

    // 超时时间（毫秒）
    timeout: 60000, // ✅ 改为60秒（大图片/GPU繁忙时需要更多时间）

    // 全局处理超时（毫秒）
    globalTimeout: 60000, // ✅ 改为60秒全局超时保护

    // 请求头
    headers: {
        'Content-Type': 'application/json'
    }
}

module.exports = config

