# 微信小程序API调用指南

## 📋 概述

本文档详细说明如何在微信小程序中调用图片增强API，实现完整的预签名URL流程。

## 🔧 基础配置

### 1. 小程序后台配置

在微信小程序后台的"开发" → "开发管理" → "开发设置" → "服务器域名"中添加：

```
request合法域名：
https://www.gongjuxiang.work

uploadFile合法域名：
https://www.gongjuxiang.work
https://photoenhancei-bj-1259206939.cos.ap-beijing.myqcloud.com
```

### 2. 配置文件

```javascript
// utils/config.js
const config = {
  // API基础URL
  baseURL: 'https://www.gongjuxiang.work',
  
  // 超时时间（毫秒）
  timeout: 300000, // 5分钟
  
  // 请求头
  headers: {
    'Content-Type': 'application/json'
  }
}

module.exports = config
```

## 🚀 API调用封装

### 1. 主要API调用函数

```javascript
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
```

## 📱 页面实现

### 1. 页面逻辑

```javascript
// pages/enhance/enhance.js
const { enhanceImageSimple } = require('../../utils/api')

Page({
  data: {
    imageUrl: '',
    enhancedImageUrl: '',
    processing: false,
    progress: 0,
    errorMessage: ''
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imageUrl: res.tempFilePaths[0],
          enhancedImageUrl: '',
          errorMessage: ''
        })
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
        wx.showToast({
          title: '选择图片失败',
          icon: 'none'
        })
      }
    })
  },

  // 处理图片
  async processImage() {
    if (!this.data.imageUrl) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      })
      return
    }

    this.setData({ 
      processing: true,
      errorMessage: ''
    })

    try {
      // 显示处理进度
      wx.showLoading({
        title: '正在处理图片...',
        mask: true
      })

      const result = await enhanceImageSimple(this.data.imageUrl)

      // 处理成功
      this.setData({
        enhancedImageUrl: result.cdn_url,
        processing: false
      })

      wx.hideLoading()
      wx.showToast({
        title: '处理成功！',
        icon: 'success'
      })

      console.log('处理结果:', result)

    } catch (error) {
      console.error('处理失败:', error)
      
      this.setData({ 
        processing: false,
        errorMessage: error.message
      })
      
      wx.hideLoading()
      
      wx.showModal({
        title: '处理失败',
        content: error.message || '网络错误，请重试',
        showCancel: false
      })
    }
  },

  // 预览图片
  previewImage(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({
      urls: [url],
      current: url
    })
  },

  // 保存图片到相册
  saveToAlbum(e) {
    const url = e.currentTarget.dataset.url
    
    wx.downloadFile({
      url: url,
      success: (res) => {
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success: () => {
              wx.showToast({
                title: '保存成功',
                icon: 'success'
              })
            },
            fail: () => {
              wx.showToast({
                title: '保存失败',
                icon: 'none'
              })
            }
          })
        }
      },
      fail: () => {
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
      }
    })
  }
})
```

### 2. 页面模板

```xml
<!-- pages/enhance/enhance.wxml -->
<view class="container">
  <!-- 标题 -->
  <view class="header">
    <text class="title">AI图片增强</text>
    <text class="subtitle">一键提升图片质量</text>
  </view>

  <!-- 图片选择区域 -->
  <view class="upload-section">
    <view class="upload-btn" bindtap="chooseImage">
      <image wx:if="{{imageUrl}}" src="{{imageUrl}}" class="preview-image"></image>
      <view wx:else class="upload-placeholder">
        <image src="/images/upload-icon.png" class="upload-icon"></image>
        <text class="upload-text">点击选择图片</text>
        <text class="upload-tip">支持JPG、PNG格式</text>
      </view>
    </view>
  </view>

  <!-- 处理按钮 -->
  <view class="action-section">
    <button 
      class="process-btn {{processing ? 'disabled' : ''}}" 
      bindtap="processImage"
      disabled="{{processing}}"
    >
      <text wx:if="{{processing}}">处理中...</text>
      <text wx:else>开始处理</text>
    </button>
  </view>

  <!-- 处理结果 -->
  <view wx:if="{{enhancedImageUrl}}" class="result-section">
    <view class="result-header">
      <text class="section-title">处理结果</text>
      <view class="result-actions">
        <button class="action-btn preview-btn" bindtap="previewImage" data-url="{{enhancedImageUrl}}">
          预览
        </button>
        <button class="action-btn save-btn" bindtap="saveToAlbum" data-url="{{enhancedImageUrl}}">
          保存
        </button>
      </view>
    </view>
    
    <image 
      src="{{enhancedImageUrl}}" 
      class="result-image"
      mode="aspectFit"
    ></image>
  </view>

  <!-- 错误信息 -->
  <view wx:if="{{errorMessage}}" class="error-section">
    <text class="error-text">{{errorMessage}}</text>
  </view>

  <!-- 使用说明 -->
  <view class="help-section">
    <text class="help-title">使用说明：</text>
    <text class="help-item">1. 点击上方区域选择要处理的图片</text>
    <text class="help-item">2. 点击"开始处理"按钮进行AI增强</text>
    <text class="help-item">3. 处理完成后可预览或保存到相册</text>
    <text class="help-item">4. 处理时间约10-30秒，请耐心等待</text>
  </view>
</view>
```

### 3. 样式文件

```css
/* pages/enhance/enhance.wxss */
.container {
  padding: 30rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 40rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  display: block;
}

.subtitle {
  font-size: 28rpx;
  color: #666;
  margin-top: 10rpx;
  display: block;
}

.upload-section {
  margin-bottom: 40rpx;
}

.upload-btn {
  width: 100%;
  height: 400rpx;
  border: 3rpx dashed #007aff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  position: relative;
}

.preview-image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx;
}

.upload-placeholder {
  text-align: center;
  color: #007aff;
}

.upload-icon {
  width: 80rpx;
  height: 80rpx;
  margin-bottom: 20rpx;
  opacity: 0.6;
}

.upload-text {
  font-size: 32rpx;
  font-weight: bold;
  display: block;
  margin-bottom: 10rpx;
}

.upload-tip {
  font-size: 24rpx;
  color: #999;
  display: block;
}

.action-section {
  margin-bottom: 40rpx;
}

.process-btn {
  width: 100%;
  height: 88rpx;
  background: linear-gradient(135deg, #007aff, #5856d6);
  color: white;
  border-radius: 44rpx;
  font-size: 32rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.process-btn.disabled {
  background: #ccc;
}

.result-section {
  background-color: white;
  border-radius: 20rpx;
  padding: 30rpx;
  margin-bottom: 30rpx;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.result-actions {
  display: flex;
  gap: 20rpx;
}

.action-btn {
  padding: 10rpx 20rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  border: none;
}

.preview-btn {
  background-color: #f0f0f0;
  color: #333;
}

.save-btn {
  background-color: #007aff;
  color: white;
}

.result-image {
  width: 100%;
  max-height: 600rpx;
  border-radius: 15rpx;
}

.error-section {
  background-color: #fff2f0;
  border: 1rpx solid #ffccc7;
  border-radius: 10rpx;
  padding: 20rpx;
  margin-bottom: 30rpx;
}

.error-text {
  color: #ff4d4f;
  font-size: 28rpx;
}

.help-section {
  background-color: white;
  border-radius: 20rpx;
  padding: 30rpx;
}

.help-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.help-item {
  font-size: 28rpx;
  color: #666;
  line-height: 1.6;
  display: block;
  margin-bottom: 10rpx;
}
```

## 🔧 错误处理

### 1. 错误处理工具

```javascript
// utils/errorHandler.js

/**
 * 处理API错误
 * @param {Error} error - 错误对象
 */
function handleApiError(error) {
  console.error('API错误:', error)
  
  let message = '处理失败，请重试'
  
  if (error.message) {
    if (error.message.includes('网络')) {
      message = '网络连接失败，请检查网络设置'
    } else if (error.message.includes('超时')) {
      message = '处理超时，图片可能过大，请重试'
    } else if (error.message.includes('权限')) {
      message = '权限不足，请联系管理员'
    } else if (error.message.includes('CORS')) {
      message = '跨域问题，请检查域名配置'
    } else if (error.message.includes('500')) {
      message = '服务器错误，请稍后重试'
    } else {
      message = error.message
    }
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
```

## 📊 API响应格式

### 1. 预签名URL响应

```json
{
  "success": true,
  "presigned_url": "https://photoenhancei-bj-1259206939.cos.ap-beijing.myqcloud.com/uploads/session_xxx/xxx.jpg?q-sign-algorithm=sha1&...",
  "file_key": "uploads/session_1759608121937_izwexf/f0356e020e6b4d33862fdc497190dae3.jpg"
}
```

### 2. 图片处理响应

```json
{
  "success": true,
  "cdn_url": "https://cdn.gongjuxiang.work/processed/b9e3f031-07dc-49fe-afbe-13aa4cd79099_6984b742.jpg",
  "task_id": "b9e3f031-07dc-49fe-afbe-13aa4cd79099",
  "download_time": 0.5,
  "processing_time": 12.99,
  "upload_time": 0.8,
  "total_time": 14.29
}
```

## ⚠️ 注意事项

### 1. 域名配置
- 确保在小程序后台配置了所有必要的域名
- 包括API域名和COS域名

### 2. 超时设置
- 图片处理可能需要较长时间（10-30秒）
- 建议设置5分钟超时时间

### 3. 文件大小限制
- 建议图片大小不超过10MB
- 过大的图片可能导致处理超时

### 4. 错误处理
- 完善的错误处理和用户提示
- 网络状态检查和重试机制

### 5. 用户体验
- 显示处理进度
- 提供预览和保存功能
- 清晰的使用说明

## 🚀 快速开始

1. **复制代码**：将上述代码复制到对应的小程序文件中
2. **配置域名**：在小程序后台配置必要的域名
3. **测试功能**：选择图片并测试处理功能
4. **优化体验**：根据实际需求调整UI和交互

## 📞 技术支持

如果遇到问题，请检查：
1. 网络连接是否正常
2. 域名配置是否正确
3. 图片格式和大小是否符合要求
4. 控制台是否有错误信息

---

**版本**: v1.0  
**更新时间**: 2025-10-05  
**维护者**: PhotoEnhanceAI团队
