// index.ts - Figma UI + Real Backend API
const app = getApp<IAppOption>()

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
    processTime: 0
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
        success: (res) => {
          try {
            const data = JSON.parse(res.data)
            if (data.task_id) {
              this.pollTaskStatus(data.task_id, startTime)
            } else if (data.success && data.enhanced_image_url) {
              this.handleComplete(data.enhanced_image_url, startTime)
            } else {
              throw new Error(data.message || '处理失败')
            }
          } catch (error) {
            console.error('处理失败:', error)
            this.handleError()
          }
        },
        fail: () => this.handleError()
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
    },

    pollTaskStatus(taskId: string, startTime: number) {
      const maxAttempts = 60
      let attempts = 0

      const poll = () => {
        attempts++

        wx.request({
          url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATUS}/${taskId}`,
          method: 'GET',
          success: (res: any) => {
            const data = res.data
            
            if (data.status === 'completed' && data.result_url) {
              this.downloadResult(taskId, startTime)
            } else if (data.status === 'failed') {
              this.handleError()
            } else if (attempts < maxAttempts) {
              setTimeout(poll, 5000)
            } else {
              this.handleError('处理超时')
            }
          },
          fail: () => this.handleError()
        })
      }

      poll()
    },

    downloadResult(taskId: string, startTime: number) {
      this.setData({ progress: 95 })

      wx.request({
        url: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DOWNLOAD}/${taskId}`,
        method: 'GET',
        responseType: 'arraybuffer',
        success: (res: any) => {
          const fs = wx.getFileSystemManager()
          const filePath = `${wx.env.USER_DATA_PATH}/enhanced_${taskId}.jpg`
          
          fs.writeFile({
            filePath,
            data: res.data,
            success: () => this.handleComplete(filePath, startTime),
            fail: () => this.handleError('保存失败')
          })
        },
        fail: () => this.handleError('下载失败')
      })
    },

    handleComplete(enhancedPath: string, startTime: number) {
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
        this.progressTimer = null
      }

      const processTime = Math.round((Date.now() - startTime) / 1000)

      this.setData({
        isProcessing: false,
        progress: 100,
        showResult: true,
        processTime,
        comparisonImages: [
          { label: '原图', src: this.data.selectedFile.preview, desc: '修复前', enhanced: false },
          { label: '修复后', src: enhancedPath, desc: '清晰度提升', enhanced: true }
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

      wx.showToast({ title: msg, icon: 'error' })
    },

    handleSaveImage() {
      if (!this.data.comparisonImages[1]) return

      wx.saveImageToPhotosAlbum({
        filePath: this.data.comparisonImages[1].src,
        success: () => wx.showToast({ title: '保存成功', icon: 'success' }),
        fail: (err) => {
          if (err.errMsg.includes('auth deny')) {
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
        sliderPosition: 50
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
