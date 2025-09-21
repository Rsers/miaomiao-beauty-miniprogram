// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

// API配置
const API_CONFIG = {
  BASE_URL: 'https://www.gongjuxiang.work',
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
    progress: 0, // 添加进度数据
    originalImageSize: '', // 原图尺寸
    enhancedImageSize: '', // 增强图尺寸
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

          // 获取图片尺寸信息
          this.getImageSize(tempFilePath, (imageSize) => {
            this.setData({
              selectedImage: tempFilePath,
              fileName: `图片_${Date.now()}`,
              fileSize: formatSize,
              enhancedImage: '', // 清除之前的结果
              progress: 0, // 重置进度
              originalImageSize: imageSize,
              enhancedImageSize: '' // 清除增强图尺寸
            })
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

    // 获取图片尺寸
    getImageSize(filePath: string, callback: (size: string) => void) {
      wx.getImageInfo({
        src: filePath,
        success: (res) => {
          const { width, height } = res
          const size = `${width} × ${height}`
          callback(size)
        },
        fail: (err) => {
          console.error('获取图片尺寸失败:', err)
          callback('未知尺寸')
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

      this.setData({ 
        isProcessing: true,
        progress: 5 // 开始处理，设置初始进度
      })

      // 上传图片到服务器进行处理
      wx.uploadFile({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ENHANCE}`,
        filePath: this.data.selectedImage,
        name: 'file',
        success: (res) => {
          try {
            const data = JSON.parse(res.data)
            if (data.task_id) {
              // 异步处理，开始轮询状态
              this.setData({ progress: 15 }) // 上传完成
              this.pollTaskStatus(data.task_id)
            } else if (data.success && data.enhanced_image_url) {
              // 同步处理完成
              this.setData({
                enhancedImage: data.enhanced_image_url,
                isProcessing: false,
                progress: 100
              })
              // 获取增强图尺寸
              this.getImageSize(data.enhanced_image_url, (imageSize) => {
                this.setData({
                  enhancedImageSize: imageSize
                })
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
            this.setData({ 
              isProcessing: false,
              progress: 0
            })
          }
        },
        fail: (err) => {
          console.error('上传失败:', err)
          wx.showToast({
            title: '网络错误，请重试',
            icon: 'error'
          })
          this.setData({ 
            isProcessing: false,
            progress: 0
          })
        }
      })
    },

    // 轮询任务状态
    pollTaskStatus(taskId) {
      const maxAttempts = 60 // 最大轮询次数
      const interval = 5000   // 轮询间隔5秒
      let attempts = 0

      const poll = () => {
        attempts++
        
        // 计算进度百分比
        const baseProgress = 15 // 上传完成的基础进度
        const processingProgress = Math.min(85, baseProgress + (attempts * 1.2)) // 每次轮询增加1.2%
        
        this.setData({ progress: Math.floor(processingProgress) })
        
        wx.request({
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATUS}/${taskId}`,
          method: 'GET',
          success: (res) => {
            const data = res.data
            
            if (data.status === 'completed') {
              // 处理完成，下载结果
              this.setData({ progress: 90 })
              this.downloadResult(taskId)
            } else if (data.status === 'failed') {
              // 处理失败
              this.setData({ 
                isProcessing: false,
                progress: 0
              })
              wx.showToast({
                title: '处理失败',
                icon: 'error'
              })
            } else if (data.status === 'processing' || data.status === 'queued') {
              // 继续轮询
              if (attempts < maxAttempts) {
                setTimeout(poll, interval)
              } else {
                this.setData({ 
                  isProcessing: false,
                  progress: 0
                })
                wx.showToast({
                  title: '处理超时',
                  icon: 'error'
                })
              }
            }
          },
          fail: (error) => {
            this.setData({ 
              isProcessing: false,
              progress: 0
            })
            wx.showToast({
              title: '查询失败',
              icon: 'error'
            })
            console.error('查询状态失败:', error)
          }
        })
      }

      poll()
    },

    // 下载处理结果
    downloadResult(taskId) {
      wx.request({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOWNLOAD}/${taskId}`,
        method: 'GET',
        responseType: 'arraybuffer',
        success: (res) => {
          // 将ArrayBuffer转换为临时文件
          const fs = wx.getFileSystemManager()
          const filePath = `${wx.env.USER_DATA_PATH}/enhanced_${taskId}.jpg`
          
          fs.writeFile({
            filePath: filePath,
            data: res.data,
            success: () => {
              this.setData({
                enhancedImage: filePath,
                isProcessing: false,
                progress: 100
              })
              // 获取增强图尺寸
              this.getImageSize(filePath, (imageSize) => {
                this.setData({
                  enhancedImageSize: imageSize
                })
              })
              wx.showToast({
                title: '图片增强完成',
                icon: 'success'
              })
            },
            fail: (error) => {
              this.setData({ 
                isProcessing: false,
                progress: 0
              })
              wx.showToast({
                title: '保存失败',
                icon: 'error'
              })
              console.error('保存失败:', error)
            }
          })
        },
        fail: (error) => {
          this.setData({ 
            isProcessing: false,
            progress: 0
          })
          wx.showToast({
            title: '下载失败',
            icon: 'error'
          })
          console.error('下载失败:', error)
        }
      })
    },

    // 预览原图（支持左右滑动切换）
    previewOriginalImage() {
      if (!this.data.selectedImage) {
        wx.showToast({
          title: '没有可预览的图片',
          icon: 'error'
        })
        return
      }

      // 构建图片数组，支持左右滑动
      const imageUrls = []
      if (this.data.selectedImage) {
        imageUrls.push(this.data.selectedImage)
      }
      if (this.data.enhancedImage) {
        imageUrls.push(this.data.enhancedImage)
      }

      wx.previewImage({
        current: this.data.selectedImage, // 当前显示原图
        urls: imageUrls, // 支持左右滑动的图片数组
        success: () => {
          console.log('预览原图成功，支持左右滑动切换')
        },
        fail: (err) => {
          console.error('预览原图失败:', err)
          wx.showToast({
            title: '预览失败',
            icon: 'error'
          })
        }
      })
    },

    // 预览增强后的图片（支持左右滑动切换）
    previewEnhancedImage() {
      if (!this.data.enhancedImage) {
        wx.showToast({
          title: '没有可预览的图片',
          icon: 'error'
        })
        return
      }

      // 构建图片数组，支持左右滑动
      const imageUrls = []
      if (this.data.selectedImage) {
        imageUrls.push(this.data.selectedImage)
      }
      if (this.data.enhancedImage) {
        imageUrls.push(this.data.enhancedImage)
      }

      wx.previewImage({
        current: this.data.enhancedImage, // 当前显示增强图
        urls: imageUrls, // 支持左右滑动的图片数组
        success: () => {
          console.log('预览增强图片成功，支持左右滑动切换')
        },
        fail: (err) => {
          console.error('预览增强图片失败:', err)
          wx.showToast({
            title: '预览失败',
            icon: 'error'
          })
        }
      })
    },

    // 保存增强后的图片到相册
    downloadImage() {
      if (!this.data.enhancedImage) {
        wx.showToast({
          title: '没有可保存的图片',
          icon: 'error'
        })
        return
      }

      wx.showLoading({
        title: '保存中...'
      })

      // 检查是否是本地文件路径
      if (this.data.enhancedImage.startsWith('http')) {
        // 如果是网络URL，使用downloadFile
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
      } else {
        // 如果是本地文件路径，直接保存
        wx.saveImageToPhotosAlbum({
          filePath: this.data.enhancedImage,
          success: () => {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: (err) => {
            wx.hideLoading()
            console.error('保存失败:', err)
            wx.showToast({
              title: '保存失败',
              icon: 'error'
            })
          }
        })
      }
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