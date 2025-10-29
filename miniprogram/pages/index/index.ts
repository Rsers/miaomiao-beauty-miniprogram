// index.ts - Figma UI + Real Backend API
const app = getApp<IAppOption>()
const { enhanceImageSimple } = require('../../utils/api')
const { handleApiError, checkNetworkStatus } = require('../../utils/errorHandler')

const API_CONFIG = {
  BASE_URL: 'https://www.gongjuxiang.work',
  ENDPOINTS: {
    ENHANCE: '/api/v1/enhance',
    STATUS: '/api/v1/status',
    DOWNLOAD: '/api/v1/download',
    PRESIGNED_URL: '/api/v1/upload/presigned-url',
    ENHANCE_BY_KEY: '/api/v1/enhance-by-key'
  }
}

Component({
  data: {
    sliderPosition: 50,
    selectedFile: null as any,
    isProcessing: false,
    progress: 0,
    showResult: false,
    compareMode: 'side-by-side',
    comparisonImages: [] as any[],
    features: [
      { icon: '✨', title: '完全免费', desc: '无需付费' },
      { icon: '🔒', title: '不存照片', desc: '保护隐私' },
      { icon: '⚡', title: '用完即走', desc: '无需注册' }
    ],
    processTime: 0,
    retryCount: 0,
    maxRetries: 3
  },

  progressTimer: null as any,

  methods: {
    formatFileSize(bytes: number): string {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    // 清理URL，移除可能的@前缀和其他异常字符
    cleanUrl(url: string): string {
      if (!url) return url

      // 移除开头的@符号
      let cleanUrl = url.replace(/^@/, '')

      // 确保URL格式正确
      if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
        console.warn('URL格式异常:', url, '清理后:', cleanUrl)
      }

      return cleanUrl
    },

    // 测试API连接
    testApiConnection() {
      wx.showLoading({ title: '测试连接中...' })

      // 测试预签名URL端点
      wx.request({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRESIGNED_URL}`,
        method: 'POST',
        data: {
          user_id: 'test_user',
          file_type: 'image/jpeg',
          file_size: 0,
          filename: 'test.jpg'
        },
        timeout: 10000,
        success: (res) => {
          wx.hideLoading()
          console.log('API连接测试响应:', res)

          if (res.statusCode === 200 && res.data.success) {
            wx.showModal({
              title: '连接测试',
              content: 'API服务器连接正常，预签名URL功能可用',
              showCancel: false
            })
          } else {
            wx.showModal({
              title: '连接测试',
              content: `API服务器响应异常: ${res.statusCode}`,
              showCancel: false
            })
          }
        },
        fail: (error) => {
          wx.hideLoading()
          console.error('API连接测试失败:', error)
          wx.showModal({
            title: '连接测试',
            content: '无法连接到API服务器，请检查网络连接',
            showCancel: false
          })
        }
      })
    },

    // 智能重试机制
    retryWithBackoff(error: any, retryCount: number = 0) {
      const maxRetries = this.data.maxRetries
      const baseDelay = 1000 // 1秒基础延迟
      const delay = baseDelay * Math.pow(2, retryCount) // 指数退避

      if (retryCount >= maxRetries) {
        console.log('达到最大重试次数，停止重试')
        this.handleError('多次重试失败，请稍后再试')
        return
      }

      console.log(`第${retryCount + 1}次重试，延迟${delay}ms`)

      wx.showToast({
        title: `重试中... (${retryCount + 1}/${maxRetries})`,
        icon: 'loading',
        duration: delay
      })

      setTimeout(() => {
        this.setData({ retryCount: retryCount + 1 })
        this.startProcessing()
      }, delay)
    },

    // 检查网络状态
    checkNetworkStatus() {
      return new Promise((resolve, reject) => {
        wx.getNetworkType({
          success: (res) => {
            console.log('网络状态:', res.networkType)
            if (res.networkType === 'none') {
              reject(new Error('网络连接不可用'))
            } else {
              resolve(res.networkType)
            }
          },
          fail: (error) => {
            console.error('获取网络状态失败:', error)
            reject(error)
          }
        })
      })
    },

    chooseImage() {
      wx.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const file = res.tempFilePaths[0]

          wx.getFileInfo({
            filePath: file,
            success: (info) => {
              this.setData({
                selectedFile: {
                  preview: file,
                  name: file.split('/').pop(),
                  size: this.formatFileSize(info.size)
                },
                showResult: false,
                progress: 0
              })
            }
          })
        }
      })
    },

    handleStartProcessing() {
      if (!this.data.selectedFile) return

      // 检查网络状态
      checkNetworkStatus()
        .then((networkType) => {
          if (networkType === '2g') {
            wx.showModal({
              title: '网络较慢',
              content: '当前网络较慢，处理可能需要更长时间，是否继续？',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  this.startProcessingWithNewAPI()
                }
              }
            })
            return
          }

          this.startProcessingWithNewAPI()
        })
        .catch((error) => {
          this.handleError(error.message || '无法获取网络状态，请检查网络连接')
        })
    },

    // 使用新的API流程处理图片
    async startProcessingWithNewAPI() {
      const startTime = Date.now()

      this.setData({
        isProcessing: true,
        progress: 0
      })

      this.startProgressAnimation()

      try {
        // 显示处理进度
        wx.showLoading({
          title: '正在处理图片...',
          mask: true
        })

        const result = await enhanceImageSimple(this.data.selectedFile.preview)

        // 处理成功
        this.handleComplete(result.cdn_url, startTime)

        wx.hideLoading()
        wx.showToast({
          title: '处理成功！',
          icon: 'success'
        })

        console.log('处理结果:', result)

      } catch (error) {
        console.error('新API处理失败，尝试备用方法:', error)

        // 如果新API失败，尝试使用原有的直接上传方法
        if (error.errMsg && error.errMsg.indexOf('url not in domain list') !== -1) {
          console.log('域名配置问题，使用备用上传方法')
          this.startProcessing() // 使用原有的上传方法
        } else {
          wx.hideLoading()
          handleApiError(error)

          this.setData({
            isProcessing: false,
            progress: 0
          })
        }
      }
    },

    startProcessing() {
      const startTime = Date.now()

      this.setData({
        isProcessing: true,
        progress: 0
      })

      this.startProgressAnimation()

      wx.uploadFile({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ENHANCE}`,
        filePath: this.data.selectedFile.preview,
        name: 'file',
        timeout: 60000, // 上传超时60秒
        success: (res) => {
          console.log('上传响应:', res)
          try {
            // 检查响应状态码
            if (res.statusCode !== 200) {
              // 针对不同的状态码提供不同的错误信息
              let errorMsg = ''
              if (res.statusCode === 500) {
                errorMsg = '服务器内部错误，请稍后重试'
              } else if (res.statusCode === 503) {
                errorMsg = '服务暂时不可用，请稍后重试'
              } else if (res.statusCode === 413) {
                errorMsg = '图片文件过大，请选择较小的图片'
              } else if (res.statusCode === 415) {
                errorMsg = '不支持的图片格式，请选择JPG或PNG格式'
              } else {
                errorMsg = `服务器错误: ${res.statusCode}`
              }
              throw new Error(errorMsg)
            }

            // 检查响应数据
            if (!res.data) {
              throw new Error('服务器返回空数据')
            }

            const data = JSON.parse(res.data)
            console.log('解析后的数据:', data)

            if (data.task_id) {
              this.pollTaskStatus(data.task_id, startTime)
            } else if (data.success && data.enhanced_image_url) {
              // 清理URL，移除可能的@前缀
              const cleanUrl = this.cleanUrl(data.enhanced_image_url)
              console.log('清理后的图片URL:', cleanUrl)
              this.handleComplete(cleanUrl, startTime)
            } else {
              const errorMsg = data.message || data.error || '处理失败'
              console.error('API返回错误:', errorMsg, data)
              throw new Error(errorMsg)
            }
          } catch (error) {
            console.error('处理失败:', error)
            console.error('原始响应:', res)

            // 根据错误类型提供不同的处理建议
            let userMessage = error.message || '处理失败，请重试'
            if (res.statusCode === 500) {
              userMessage = '服务器暂时繁忙，请稍后重试。如果问题持续，请联系技术支持。'

              // 对于500错误，尝试自动重试
              if (this.data.retryCount < this.data.maxRetries) {
                console.log('检测到500错误，尝试自动重试')
                this.retryWithBackoff(error, this.data.retryCount)
                return
              }
            }

            this.handleError(userMessage)
          }
        },
        fail: (error) => {
          console.error('上传失败:', error)

          const isTimeoutError = error.errMsg && (
            error.errMsg.indexOf('timeout') !== -1 ||
            error.errMsg.indexOf('request:fail timeout') !== -1
          )

          if (isTimeoutError) {
            this.handleError('上传超时，请检查网络连接后重试')
          } else if (error.errMsg && error.errMsg.indexOf('fail') !== -1) {
            this.handleError('上传失败，请检查网络连接')
          } else {
            this.handleError('网络连接失败，请检查网络后重试')
          }
        }
      })
    },

    startProgressAnimation() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
      }

      this.progressTimer = setInterval(() => {
        if (!this.data.isProcessing) {
          clearInterval(this.progressTimer)
          this.progressTimer = null
          return
        }

        const newProgress = this.data.progress + Math.random() * 3 + 1

        if (newProgress >= 90) {
          clearInterval(this.progressTimer)
          this.progressTimer = null
          this.setData({ progress: 90 })
        } else {
          this.setData({ progress: newProgress })
        }
      }, 100)

      // 添加超时提示
      setTimeout(() => {
        if (this.data.isProcessing && this.data.progress < 50) {
          wx.showToast({
            title: '处理时间较长，请耐心等待',
            icon: 'none',
            duration: 3000
          })
        }
      }, 30000) // 30秒后提示
    },

    pollTaskStatus(taskId: string, startTime: number) {
      const maxAttempts = 30 // 减少最大尝试次数
      const maxWaitTime = 5 * 60 * 1000 // 最大等待5分钟
      let attempts = 0
      let pollInterval = 3000 // 初始3秒间隔
      let consecutiveTimeouts = 0 // 连续超时次数

      const poll = () => {
        attempts++
        const elapsedTime = Date.now() - startTime
        const requestStartTime = Date.now()

        console.log(`轮询任务状态，第${attempts}次，任务ID: ${taskId}，已等待: ${Math.round(elapsedTime / 1000)}秒`)

        // 检查是否超过最大等待时间
        if (elapsedTime > maxWaitTime) {
          this.handleError('处理时间过长，请重试或联系技术支持')
          return
        }

        wx.request({
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATUS}/${taskId}`,
          method: 'GET',
          timeout: 10000, // 设置10秒超时，状态查询应该更快
          success: (res: any) => {
            console.log('状态查询响应:', res)

            if (res.statusCode === 408) {
              consecutiveTimeouts++
              // 请求超时，增加轮询间隔
              pollInterval = Math.min(pollInterval * 1.5, 10000) // 最大10秒
              console.log(`请求超时，连续超时${consecutiveTimeouts}次，增加轮询间隔到: ${pollInterval}ms`)

              // 显示超时提示
              if (consecutiveTimeouts === 1) {
                wx.showToast({
                  title: '服务器响应较慢，正在重试...',
                  icon: 'none',
                  duration: 2000
                })
              } else if (consecutiveTimeouts >= 3) {
                wx.showToast({
                  title: '服务器持续超时，请稍后重试',
                  icon: 'none',
                  duration: 3000
                })
              }

              if (attempts < maxAttempts && consecutiveTimeouts < 5) {
                setTimeout(poll, pollInterval)
              } else {
                this.handleError('服务器响应超时，请重试')
              }
              return
            } else {
              // 重置连续超时计数
              consecutiveTimeouts = 0
            }

            if (res.statusCode !== 200) {
              this.handleError(`状态查询失败: ${res.statusCode}`)
              return
            }

            const data = res.data

            if (data.status === 'completed' && data.result_url) {
              // 清理URL，移除可能的@前缀
              const cleanUrl = this.cleanUrl(data.result_url)
              console.log('清理后的结果URL:', cleanUrl)
              this.downloadResult(taskId, startTime)
            } else if (data.status === 'failed') {
              const errorMsg = data.error || data.message || '任务处理失败'
              this.handleError(errorMsg)
            } else if (data.status === 'processing') {
              // 动态调整轮询间隔
              if (attempts < 10) {
                pollInterval = 3000 // 前10次3秒间隔
              } else if (attempts < 20) {
                pollInterval = 5000 // 10-20次5秒间隔
              } else {
                pollInterval = 8000 // 20次后8秒间隔
              }

              if (attempts < maxAttempts) {
                setTimeout(poll, pollInterval)
              } else {
                this.handleError('处理超时，请重试')
              }
            } else {
              console.log('未知状态:', data.status)
              if (attempts < maxAttempts) {
                setTimeout(poll, pollInterval)
              } else {
                this.handleError('处理超时，请重试')
              }
            }
          },
          fail: (error) => {
            console.error('状态查询失败:', error)

            // 根据错误类型决定是否重试
            const isTimeoutError = error.errMsg && (
              error.errMsg.indexOf('timeout') !== -1 ||
              error.errMsg.indexOf('request:fail timeout') !== -1
            )

            if (isTimeoutError) {
              consecutiveTimeouts++
              console.log(`请求超时，连续超时${consecutiveTimeouts}次，尝试增加轮询间隔`)
              pollInterval = Math.min(pollInterval * 1.5, 10000)

              // 显示超时提示
              if (consecutiveTimeouts === 1) {
                wx.showToast({
                  title: '网络超时，正在重试...',
                  icon: 'none',
                  duration: 2000
                })
              } else if (consecutiveTimeouts >= 3) {
                wx.showToast({
                  title: '网络持续超时，请检查网络',
                  icon: 'none',
                  duration: 3000
                })

                // 检查网络状态
                this.checkNetworkStatus().catch((networkError) => {
                  console.error('网络状态检查失败:', networkError)
                  wx.showModal({
                    title: '网络连接异常',
                    content: '检测到网络连接问题，请检查网络设置后重试',
                    showCancel: false
                  })
                })
              }

              if (attempts < maxAttempts && consecutiveTimeouts < 5) {
                setTimeout(poll, pollInterval)
              } else {
                this.handleError('网络连接超时，请检查网络后重试')
              }
            } else {
              this.handleError('网络连接失败，请重试')
            }
          }
        })
      }

      poll()
    },

    downloadResult(taskId: string, startTime: number) {
      this.setData({ progress: 95 })
      console.log('开始下载结果，任务ID:', taskId)

      wx.request({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOWNLOAD}/${taskId}`,
        method: 'GET',
        responseType: 'arraybuffer',
        timeout: 30000, // 下载超时30秒
        success: (res: any) => {
          console.log('下载响应状态:', res.statusCode)

          if (res.statusCode === 408) {
            this.handleError('下载超时，请重试')
            return
          }

          if (res.statusCode !== 200) {
            this.handleError(`下载失败: ${res.statusCode}`)
            return
          }

          if (!res.data || res.data.byteLength === 0) {
            this.handleError('下载的文件为空')
            return
          }

          const fs = wx.getFileSystemManager()
          const filePath = `${wx.env.USER_DATA_PATH}/enhanced_${taskId}.jpg`

          fs.writeFile({
            filePath,
            data: res.data,
            success: () => {
              console.log('文件保存成功:', filePath)
              this.handleComplete(filePath, startTime)
            },
            fail: (error) => {
              console.error('文件保存失败:', error)
              this.handleError('保存文件失败，请重试')
            }
          })
        },
        fail: (error) => {
          console.error('下载请求失败:', error)

          const isTimeoutError = error.errMsg && (
            error.errMsg.indexOf('timeout') !== -1 ||
            error.errMsg.indexOf('request:fail timeout') !== -1
          )

          if (isTimeoutError) {
            this.handleError('下载超时，请重试')
          } else {
            this.handleError('下载失败，请检查网络连接')
          }
        }
      })
    },

    handleComplete(enhancedPath: string, startTime: number) {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }

      const processTime = Math.round((Date.now() - startTime) / 1000)

      // 清理URL，移除可能的@前缀
      const cleanUrl = this.cleanUrl(enhancedPath)

      this.setData({
        isProcessing: false,
        progress: 100,
        showResult: true,
        processTime,
        comparisonImages: [
          { label: '原图', src: this.data.selectedFile.preview, desc: '修复前', enhanced: false },
          { label: '修复后', src: cleanUrl, desc: '清晰度提升', enhanced: true }
        ]
      })

      wx.showToast({ title: '修复完成', icon: 'success' })

      setTimeout(() => {
        wx.pageScrollTo({ selector: '.result-section', duration: 300 })
      }, 300)
    },

    handleError(msg = '处理失败') {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }

      this.setData({
        isProcessing: false,
        progress: 0
      })

      // 根据错误类型显示不同的对话框
      const isServerError = msg.indexOf('服务器') !== -1 || msg.indexOf('500') !== -1 || msg.indexOf('503') !== -1

      if (isServerError) {
        wx.showModal({
          title: '服务器暂时繁忙',
          content: `${msg}\n\n建议：\n• 等待几分钟后重试\n• 检查网络连接\n• 如问题持续，请联系技术支持`,
          showCancel: true,
          cancelText: '重试',
          confirmText: '确定',
          success: (res) => {
            if (res.cancel) {
              // 用户选择重试
              setTimeout(() => {
                this.handleStartProcessing()
              }, 2000) // 延迟2秒重试
            }
          }
        })
      } else {
        wx.showModal({
          title: '处理失败',
          content: msg,
          showCancel: true,
          cancelText: '重试',
          confirmText: '确定',
          success: (res) => {
            if (res.cancel) {
              // 用户选择重试
              this.handleTryAgain()
            }
          }
        })
      }
    },

    handleSaveImage() {
      if (!this.data.comparisonImages[1]) return

      wx.saveImageToPhotosAlbum({
        filePath: this.data.comparisonImages[1].src,
        success: () => wx.showToast({ title: '保存成功', icon: 'success' }),
        fail: (err) => {
          if (err.errMsg.indexOf('auth deny') !== -1) {
            wx.showModal({
              title: '需要相册权限',
              content: '请在设置中允许访问相册',
              success: (res) => {
                if (res.confirm) wx.openSetting()
              }
            })
          } else {
            wx.showToast({ title: '保存失败', icon: 'error' })
          }
        }
      })
    },

    handleShare() {
      wx.showModal({
        title: '分享图片',
        content: '请先保存图片到相册，然后使用微信分享',
        confirmText: '保存图片',
        success: (res) => {
          if (res.confirm) this.handleSaveImage()
        }
      })
    },

    openFullscreen(e: any) {
      const { src } = e.currentTarget.dataset
      wx.previewImage({
        urls: this.data.comparisonImages.map((img: any) => img.src),
        current: src
      })
    },

    handleTryAgain() {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }

      this.setData({
        selectedFile: null,
        showResult: false,
        progress: 0,
        isProcessing: false,
        comparisonImages: [],
        processTime: 0,
        sliderPosition: 50,
        retryCount: 0 // 重置重试计数
      })

      wx.pageScrollTo({ scrollTop: 0, duration: 300 })
    },

    setCompareMode(e: any) {
      this.setData({
        compareMode: e.currentTarget.dataset.mode,
        sliderPosition: 50  // 重置滑块位置
      })
    },

    // 滑动对比功能
    handleSliderMove(e: any) {
      if (!this.data.selectedFile) return

      const touch = e.touches[0]
      const query = wx.createSelectorQuery().in(this)

      query.select('.slider-container').boundingClientRect((rect: any) => {
        if (!rect) return

        const x = touch.clientX - rect.left
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

        this.setData({
          sliderPosition: percentage
        })
      }).exec()
    },

    handleSliderEnd() {
      // 可选：滑动结束后的处理
    },

    openTerms() {
      wx.navigateTo({ url: '/pages/terms/terms' })
    },

    openPrivacy() {
      wx.navigateTo({ url: '/pages/privacy/privacy' })
    },

    onShareAppMessage() {
      return {
        title: '喵喵美颜 - 让模糊照片变清晰',
        path: '/pages/index/index'
      }
    },

    onShareTimeline() {
      return {
        title: '喵喵美颜 - 让模糊照片变清晰'
      }
    }
  },

  detached() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer)
      this.progressTimer = null
    }
  }
})
