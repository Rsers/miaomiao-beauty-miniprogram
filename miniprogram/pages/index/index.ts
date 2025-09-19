// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

// API配置
const API_CONFIG = {
  BASE_URL: 'http://139.186.166.51:8000',
  ENDPOINTS: {
    ENHANCE: '/api/v1/enhance',
    STATUS: '/api/v1/status',
    DOWNLOAD: '/api/v1/download'
  }
}

Component({
  data: {
    selectedImage: '',
    fileName: '',
    fileSize: '',
    enhancedImage: '',
    isProcessing: false,
  },
  methods: {
    // 选择图片
    chooseImage() {
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        sizeType: ['original', 'compressed'],
        success: (res) => {
          const tempFilePath = res.tempFiles[0].tempFilePath
          const size = res.tempFiles[0].size

          // 格式化文件大小
          const formatSize = this.formatFileSize(size)

          this.setData({
            selectedImage: tempFilePath,
            fileName: `图片_${Date.now()}`,
            fileSize: formatSize,
            enhancedImage: '' // 清除之前的结果
          })
        },
        fail: (err) => {
          console.error('选择图片失败:', err)
          wx.showToast({
            title: '选择图片失败',
            icon: 'error'
          })
        }
      })
    },

    // 增强图片
    enhanceImage() {
      if (!this.data.selectedImage) {
        wx.showToast({
          title: '请先选择图片',
          icon: 'error'
        })
        return
      }

      this.setData({ isProcessing: true })

      // 上传图片到服务器进行处理
      wx.uploadFile({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ENHANCE}`,
        filePath: this.data.selectedImage,
        name: 'image',
        success: (res) => {
          try {
            const data = JSON.parse(res.data)
            if (data.success && data.enhanced_image_url) {
              this.setData({
                enhancedImage: data.enhanced_image_url,
                isProcessing: false
              })
              wx.showToast({
                title: '图片增强完成',
                icon: 'success'
              })
            } else {
              throw new Error(data.message || '处理失败')
            }
          } catch (error) {
            console.error('处理响应解析失败:', error)
            wx.showToast({
              title: '处理失败，请重试',
              icon: 'error'
            })
            this.setData({ isProcessing: false })
          }
        },
        fail: (err) => {
          console.error('上传失败:', err)
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'error'
          })
          this.setData({ isProcessing: false })
        }
      })
    },

    // 下载增强后的图片
    downloadImage() {
      if (!this.data.enhancedImage) {
        wx.showToast({
          title: '没有可下载的图片',
          icon: 'error'
        })
        return
      }

      wx.showLoading({
        title: '下载中...'
      })

      wx.downloadFile({
        url: this.data.enhancedImage,
        success: (res) => {
          wx.hideLoading()
          if (res.statusCode === 200) {
            // 保存到相册
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
                  icon: 'error'
                })
              }
            })
          } else {
            wx.showToast({
              title: '下载失败',
              icon: 'error'
            })
          }
        },
        fail: (err) => {
          wx.hideLoading()
          console.error('下载失败:', err)
          wx.showToast({
            title: '下载失败',
            icon: 'error'
          })
        }
      })
    },

    // 格式化文件大小
    formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },
  },
})
