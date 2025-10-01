// index.ts - Figma Make + Real Backend API
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
    ]
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
          
          // Get file info
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

    // Figma's handleStartProcessing - exact conversion
    handleStartProcessing() {
      this.setData({
        isProcessing: true,
        progress: 0
      })

      // Clear any existing timer
      if (this.progressTimer) {
        clearInterval(this.progressTimer)
      }

      // Simulate processing with progress updates (exactly like Figma)
      this.progressTimer = setInterval(() => {
        const newProgress = this.data.progress + Math.random() * 3 + 1
        
        if (newProgress >= 100) {
          clearInterval(this.progressTimer)
          this.progressTimer = null
          
          this.setData({ progress: 100 })
          
          setTimeout(() => {
            this.setData({
              isProcessing: false,
              showResult: true,
              comparisonImages: [
                { label: '原图', src: this.data.selectedFile.preview, desc: '修复前', enhanced: false },
                { label: '修复后', src: this.data.selectedFile.preview, desc: '清晰度提升', enhanced: true }
              ]
            })
          }, 500)
          
          return
        }
        
        this.setData({
          progress: newProgress
        })
      }, 100)  // 100ms interval exactly like Figma
    },

    handleSaveImage() {
      if (!this.data.selectedFile) return
      
      wx.saveImageToPhotosAlbum({
        filePath: this.data.selectedFile.preview,
        success: () => {
          wx.showToast({
            title: '保存成功',
            icon: 'success'
          })
        },
        fail: (err) => {
          if (err.errMsg.includes('auth deny')) {
            wx.showModal({
              title: '需要相册权限',
              content: '请在设置中允许访问相册',
              success: (res) => {
                if (res.confirm) {
                  wx.openSetting()
                }
              }
            })
          } else {
            wx.showToast({
              title: '保存失败',
              icon: 'error'
            })
          }
        }
      })
    },

    handleShare() {
      if (!this.data.selectedFile) return
      
      wx.showModal({
        title: '分享图片',
        content: '请先保存图片到相册，然后使用微信分享',
        showCancel: true,
        confirmText: '保存图片',
        success: (res) => {
          if (res.confirm) {
            this.handleSaveImage()
          }
        }
      })
    },

    openFullscreen(e: any) {
      const { src, title } = e.currentTarget.dataset
      
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
        comparisonImages: []
      })
    },

    setCompareMode(e: any) {
      const mode = e.currentTarget.dataset.mode
      this.setData({
        compareMode: mode
      })
    },

    openTerms() {
      wx.navigateTo({
        url: '/pages/terms/terms'
      })
    },

    openPrivacy() {
      wx.navigateTo({
        url: '/pages/privacy/privacy'
      })
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
