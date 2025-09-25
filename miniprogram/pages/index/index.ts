// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

// 微信官方默认头像URL
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

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
    // 用户信息
    avatarUrl: defaultAvatarUrl,
    nickName: '',
    
    // 图片处理
    selectedImage: '',
    fileName: '',
    fileSize: '',
    enhancedImage: '',
    isProcessing: false,
    progress: 0, // 添加进度数据
    originalImageSize: '', // 原图尺寸
    enhancedImageSize: '', // 增强图尺寸
    originalFileSize: '', // 原图文件大小
    enhancedFileSize: '', // 增强图文件大小
    
    // 用户状态
    remainingCount: 3, // 剩余次数
    userLevel: 'free', // 用户等级：free, basic, premium, unlimited
    userLevelText: '免费用户', // 用户等级文本
  },

  lifetimes: {
    attached() {
      // 组件加载时读取用户信息
      this.loadUserInfo();
      this.loadUserStatus();
    }
  },

  pageLifetimes: {
    show() {
      // 页面显示时读取用户信息
      this.loadUserInfo();
      this.loadUserStatus();
    }
  },

  methods: {
    // 加载用户信息
    loadUserInfo() {
      try {
        const savedAvatar = wx.getStorageSync('userAvatar');
        const savedNickname = wx.getStorageSync('userNickname');
        
        if (savedAvatar) {
          this.setData({
            avatarUrl: savedAvatar
          });
        }
        
        if (savedNickname) {
          this.setData({
            nickName: savedNickname
          });
        }
        
        console.log('加载用户信息:', { avatarUrl: savedAvatar, nickName: savedNickname });
      } catch (error) {
        console.error('加载用户信息失败:', error);
      }
    },
    // 选择头像
    onChooseAvatar(e: any) {
      console.log('选择头像:', e.detail);
      const { avatarUrl } = e.detail;
      this.setData({
        avatarUrl: avatarUrl
      });
      
      // 保存头像到本地存储
      wx.setStorageSync('userAvatar', avatarUrl);
      
      wx.showToast({
        title: '头像设置成功',
        icon: 'success',
        duration: 1500
      });
    },

    // 昵称输入
    onNicknameInput(e: any) {
      const nickName = e.detail.value;
      this.setData({
        nickName: nickName
      });
      
      // 保存昵称到本地存储
      wx.setStorageSync('userNickname', nickName);
    },

    // 加载用户状态
    loadUserStatus() {
      try {
        const savedCount = wx.getStorageSync('remainingCount');
        const savedLevel = wx.getStorageSync('userLevel');
        const savedLevelText = wx.getStorageSync('userLevelText');
        
        if (savedCount !== undefined) {
          this.setData({
            remainingCount: savedCount
          });
        }
        
        if (savedLevel && savedLevelText) {
          this.setData({
            userLevel: savedLevel,
            userLevelText: savedLevelText
          });
        }
        
        console.log('加载用户状态:', { 
          remainingCount: savedCount, 
          userLevel: savedLevel,
          userLevelText: savedLevelText 
        });
      } catch (error) {
        console.error('加载用户状态失败:', error);
      }
    },

    // 选择套餐
    selectPackage(e: any) {
      const { type, amount } = e.currentTarget.dataset;
      
      const packageInfo = {
        basic: {
          name: '基础包',
          amount: 9.9,
          count: 10,
          features: ['10次增强机会', '高清图片输出', '快速处理']
        },
        premium: {
          name: '高级包', 
          amount: 29.9,
          count: 100,
          features: ['100次增强机会', '超高清输出', '批量处理', '优先处理']
        },
        unlimited: {
          name: '无限包',
          amount: 99.9,
          count: -1, // -1表示无限
          features: ['无限次使用', '最高质量输出', '批量处理', '专属客服']
        }
      };
      
      const info = packageInfo[type];
      
      // 显示套餐详情弹窗
      wx.showModal({
        title: `确认购买 ${info.name}`,
        content: `价格：¥${info.amount}\n包含：${info.features.join('、')}`,
        confirmText: '立即购买',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.showPaymentInfo(type, info);
          }
        }
      });
    },

    // 显示支付信息（暂时只显示信息，不实际支付）
    showPaymentInfo(type: string, info: any) {
      wx.showModal({
        title: '支付功能开发中',
        content: `您选择了${info.name}，价格¥${info.amount}\n\n支付功能正在开发中，敬请期待！`,
        showCancel: false,
        confirmText: '知道了',
        success: () => {
          // 这里将来会调用实际的支付接口
          console.log('用户选择套餐:', { type, info });
        }
      });
    },

    // 获取用户OpenID（调试用）
    getUserOpenId() {
      wx.showLoading({
        title: '获取中...'
      });

      // 1. 先获取微信登录code
      wx.login({
        success: (loginRes) => {
          console.log('微信登录code:', loginRes.code);
          
          // 2. 调用后端接口换取openid
          wx.request({
            url: `${API_CONFIG.BASE_URL}/api/v1/user/openid`,
            method: 'POST',
            data: {
              code: loginRes.code
            },
            success: (res) => {
              wx.hideLoading();
              console.log('获取openid响应:', res);
              
              if (res.data && res.data.openid) {
                const openid = res.data.openid;
                
                // 显示openid并支持复制
                wx.showModal({
                  title: '用户OpenID',
                  content: openid,
                  showCancel: true,
                  cancelText: '关闭',
                  confirmText: '复制',
                  success: (modalRes) => {
                    if (modalRes.confirm) {
                      // 复制到剪贴板
                      wx.setClipboardData({
                        data: openid,
                        success: () => {
                          wx.showToast({
                            title: '已复制到剪贴板',
                            icon: 'success'
                          });
                        },
                        fail: () => {
                          wx.showToast({
                            title: '复制失败',
                            icon: 'error'
                          });
                        }
                      });
                    }
                  }
                });
              } else {
                wx.showToast({
                  title: '获取OpenID失败',
                  icon: 'error'
                });
              }
            },
            fail: (err) => {
              wx.hideLoading();
              console.error('获取openid失败:', err);
              
              // 如果后端接口不可用，显示code供调试
              wx.showModal({
                title: '调试信息',
                content: `后端接口不可用\n\n微信登录code: ${loginRes.code}\n\n请用此code在后端换取openid`,
                showCancel: true,
                cancelText: '关闭',
                confirmText: '复制Code',
                success: (modalRes) => {
                  if (modalRes.confirm) {
                    wx.setClipboardData({
                      data: loginRes.code,
                      success: () => {
                        wx.showToast({
                          title: 'Code已复制',
                          icon: 'success'
                        });
                      }
                    });
                  }
                }
              });
            }
          });
        },
        fail: (err) => {
          wx.hideLoading();
          console.error('微信登录失败:', err);
          wx.showToast({
            title: '登录失败',
            icon: 'error'
          });
        }
      });
    },

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
          this.getImageSize(tempFilePath, (imageSize: string) => {
            this.setData({
              selectedImage: tempFilePath,
              fileName: `图片_${Date.now()}`,
              fileSize: formatSize,
              enhancedImage: '', // 清除之前的结果
              progress: 0, // 重置进度
              originalImageSize: imageSize,
              enhancedImageSize: '', // 清除增强图尺寸
              originalFileSize: formatSize, // 保存原图文件大小
              enhancedFileSize: '' // 清除增强图文件大小
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

    // 获取文件大小
    getFileSize(filePath: string, callback: (size: string) => void) {
      wx.getFileInfo({
        filePath: filePath,
        success: (res) => {
          const formatSize = this.formatFileSize(res.size)
          callback(formatSize)
        },
        fail: (err) => {
          console.error('获取文件大小失败:', err)
          callback('未知大小')
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
              // 获取增强图尺寸和文件大小
              this.getImageSize(data.enhanced_image_url, (imageSize: string) => {
                this.setData({
                  enhancedImageSize: imageSize
                })
              })
              this.getFileSize(data.enhanced_image_url, (fileSize: string) => {
                this.setData({
                  enhancedFileSize: fileSize
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
    pollTaskStatus(taskId: string) {
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
            const data = res.data as any

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
    downloadResult(taskId: string) {
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
            data: res.data as ArrayBuffer,
            success: () => {
              this.setData({
                enhancedImage: filePath,
                isProcessing: false,
                progress: 100
              })
              // 获取增强图尺寸和文件大小
              this.getImageSize(filePath, (imageSize: string) => {
                this.setData({
                  enhancedImageSize: imageSize
                })
              })
              this.getFileSize(filePath, (fileSize: string) => {
                this.setData({
                  enhancedFileSize: fileSize
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

    // 分享图片到微信
    shareImage() {
      if (!this.data.enhancedImage) {
        wx.showToast({
          title: '没有可分享的图片',
          icon: 'error'
        })
        return
      }

      wx.showActionSheet({
        itemList: ['分享到微信好友', '分享到朋友圈', '保存到相册'],
        success: (res) => {
          switch (res.tapIndex) {
            case 0:
              // 分享到微信好友
              this.shareToWeChat()
              break
            case 1:
              // 分享到朋友圈
              this.shareToMoments()
              break
            case 2:
              // 保存到相册
              this.downloadImage()
              break
          }
        },
        fail: () => {
          console.log('用户取消分享')
        }
      })
    },

    // 分享到微信好友
    shareToWeChat() {
      wx.showToast({
        title: '请使用右上角分享按钮',
        icon: 'none',
        duration: 2000
      })
    },

    // 分享到朋友圈
    shareToMoments() {
      wx.showToast({
        title: '请使用右上角分享按钮',
        icon: 'none',
        duration: 2000
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

    // 打开服务条款
    openTerms() {
      wx.navigateTo({
        url: '/pages/terms/terms',
        fail: (err) => {
          console.error('打开服务条款失败:', err)
          wx.showToast({
            title: '打开失败',
            icon: 'error'
          })
        }
      })
    },

    // 打开隐私政策
    openPrivacy() {
      wx.navigateTo({
        url: '/pages/privacy/privacy',
        fail: (err) => {
          console.error('打开隐私政策失败:', err)
          wx.showToast({
            title: '打开失败',
            icon: 'error'
          })
        }
      })
    },

    // 分享配置
    onShareAppMessage() {
      return {
        title: '喵喵美颜 - AI图片增强神器',
        desc: '让每一张照片都变得更加清晰，支持智能增强、批量处理',
        path: '/pages/index/index',
        imageUrl: this.data.enhancedImage || '/喵喵美颜-logo.png'
      }
    },

    // 分享到朋友圈
    onShareTimeline() {
      return {
        title: '喵喵美颜 - AI图片增强神器',
        query: '',
        imageUrl: this.data.enhancedImage || '/喵喵美颜-logo.png'
      }
    }

  }
})