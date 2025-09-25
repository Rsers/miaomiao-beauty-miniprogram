// 新首页逻辑
Page({
    data: {
        // 问候语
        greeting: '早上好，小美女！',
        greetingSubtitle: '今天也要变得更美丽呢 ✨',

        // 功能列表
        functionList: [
            {
                icon: '✨',
                label: '智能美颜',
                gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                type: 'smart_beautify'
            },
            {
                icon: '💖',
                label: '瘦脸塑形',
                gradient: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
                type: 'face_slim'
            },
            {
                icon: '🎨',
                label: '美妆试色',
                gradient: 'linear-gradient(135deg, #f97316 0%, #ec4899 100%)',
                type: 'makeup_try'
            },
            {
                icon: '🖼️',
                label: '风格滤镜',
                gradient: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
                type: 'style_filter'
            },
            {
                icon: '⭐',
                label: '五官调整',
                gradient: 'linear-gradient(135deg, #eab308 0%, #f97316 100%)',
                type: 'facial_adjust'
            },
            {
                icon: '⚡',
                label: '一键美颜',
                gradient: 'linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)',
                type: 'one_click'
            }
        ],

        // 签到相关
        checkinDays: 5,

        // 用户信息
        userInfo: null,
        avatarUrl: '',
        nickName: ''
    },

    onLoad() {
        console.log('新首页加载');
        this.loadUserInfo();
        this.updateGreeting();
    },

    onShow() {
        console.log('新首页显示');
        this.loadUserInfo();
    },

    onReady() {
        console.log('新首页渲染完成');
    },

    // 加载用户信息
    loadUserInfo() {
        try {
            const userInfo = wx.getStorageSync('userInfo');
            const avatarUrl = wx.getStorageSync('avatarUrl');
            const nickName = wx.getStorageSync('nickName');

            if (userInfo) {
                this.setData({
                    userInfo: userInfo,
                    avatarUrl: avatarUrl || '',
                    nickName: nickName || ''
                });

                // 更新问候语
                this.updateGreeting();
            }
        } catch (error) {
            console.error('加载用户信息失败:', error);
        }
    },

    // 更新问候语
    updateGreeting() {
        const hour = new Date().getHours();
        const nickName = this.data.nickName;

        let greeting = '';
        let greetingSubtitle = '';

        if (hour < 12) {
            greeting = nickName ? `${nickName}，早上好！` : '早上好，小美女！';
            greetingSubtitle = '今天也要变得更美丽呢 ✨';
        } else if (hour < 18) {
            greeting = nickName ? `${nickName}，下午好！` : '下午好，小美女！';
            greetingSubtitle = '午后时光，来张美美的照片吧 📸';
        } else {
            greeting = nickName ? `${nickName}，晚上好！` : '晚上好，小美女！';
            greetingSubtitle = '夜晚也要美美哒，来试试新滤镜 🌙';
        }

        this.setData({
            greeting: greeting,
            greetingSubtitle: greetingSubtitle
        });
    },

    // 开始美颜
    startBeautify() {
        console.log('开始美颜');

        // 跳转到图片处理页面
        wx.navigateTo({
            url: '/pages/index/index',
            success: () => {
                console.log('成功跳转到图片处理页面');
            },
            fail: (err) => {
                console.error('跳转失败:', err);
                wx.showToast({
                    title: '跳转失败',
                    icon: 'error'
                });
            }
        });
    },

  // 打开美颜相机
  openBeautyCamera() {
    console.log('打开美颜相机');
    
    // 跳转到美颜相机页面
    wx.navigateTo({
      url: '/pages/camera/camera',
      success: () => {
        console.log('成功跳转到美颜相机页面');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'error'
        });
      }
    });
  },

  // 打开拼图协作
  openPuzzleCollaboration() {
    console.log('打开拼图协作');
    
    // 跳转到拼图协作页面
    wx.navigateTo({
      url: '/pages/puzzle/puzzle',
      success: () => {
        console.log('成功跳转到拼图协作页面');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'error'
        });
      }
    });
  },

    // 跳转到图片处理页面（调试用）
    goToImageProcess() {
        console.log('跳转到图片处理页面');
        wx.navigateTo({
            url: '/pages/index/index',
            success: () => {
                console.log('成功跳转到图片处理页面');
            },
            fail: (err) => {
                console.error('跳转失败:', err);
                wx.showToast({
                    title: '跳转失败',
                    icon: 'error'
                });
            }
        });
    },

    // 功能卡片点击
    onFunctionTap(e: any) {
        const type = e.currentTarget.dataset.type;
        console.log('功能点击:', type);

        switch (type) {
            case 'smart_beautify':
                this.showFunctionTip('智能美颜', 'AI自动识别面部特征，智能调整美颜参数');
                break;
            case 'face_slim':
                this.showFunctionTip('瘦脸塑形', '专业瘦脸算法，自然塑形不显假');
                break;
            case 'makeup_try':
                this.showFunctionTip('美妆试色', '虚拟试妆，找到最适合你的妆容');
                break;
            case 'style_filter':
                this.showFunctionTip('风格滤镜', '多种风格滤镜，一键变换照片风格');
                break;
            case 'facial_adjust':
                this.showFunctionTip('五官调整', '精细调整五官比例，打造完美脸型');
                break;
            case 'one_click':
                this.showFunctionTip('一键美颜', '简单快捷，一键获得专业级美颜效果');
                break;
            default:
                wx.showToast({
                    title: '功能开发中',
                    icon: 'none'
                });
        }
    },

    // 显示功能提示
    showFunctionTip(title: string, desc: string) {
        wx.showModal({
            title: title,
            content: desc,
            showCancel: true,
            cancelText: '知道了',
            confirmText: '立即体验',
            success: (res) => {
                if (res.confirm) {
                    // 跳转到图片处理页面
                    this.startBeautify();
                }
            }
        });
    },

    // 拼图协作
    onCollaborationTap() {
        console.log('拼图协作');
        wx.showModal({
            title: '拼图协作',
            content: '与好友一起创作美图，分享快乐时光！\n\n功能即将上线，敬请期待！',
            showCancel: false,
            confirmText: '知道了'
        });
    },

    // 邀请好友
    onInviteTap() {
        console.log('邀请好友');
        wx.showModal({
            title: '邀请好友',
            content: '分享喵喵美颜给好友，你们都能获得500积分奖励！',
            showCancel: true,
            cancelText: '取消',
            confirmText: '立即分享',
            success: (res) => {
                if (res.confirm) {
                    // 触发分享
                    wx.showShareMenu({
                        withShareTicket: true,
                        menus: ['shareAppMessage', 'shareTimeline']
                    });
                }
            }
        });
    },

    // 签到
    onCheckinTap() {
        console.log('签到');

        // 模拟签到过程
        wx.showLoading({
            title: '签到中...'
        });

        setTimeout(() => {
            wx.hideLoading();

            // 增加签到天数
            const newDays = this.data.checkinDays + 1;
            this.setData({
                checkinDays: newDays
            });

            // 保存到本地存储
            wx.setStorageSync('checkinDays', newDays);

            wx.showToast({
                title: '签到成功！',
                icon: 'success',
                duration: 2000
            });

            // 显示签到奖励
            setTimeout(() => {
                wx.showModal({
                    title: '签到成功！',
                    content: `连续签到${newDays}天\n\n获得奖励：\n• 美颜滤镜 x1\n• 积分 +100`,
                    showCancel: false,
                    confirmText: '领取奖励'
                });
            }, 2000);

        }, 1500);
    },

    // 通知按钮点击
    onNotificationTap() {
        console.log('通知');
        wx.showModal({
            title: '通知中心',
            content: '您有3条新消息\n\n• 新滤镜上架\n• 好友邀请\n• 签到提醒',
            showCancel: false,
            confirmText: '知道了'
        });
    },

    // 用户头像点击
    onUserAvatarTap() {
        console.log('用户头像');
        wx.showActionSheet({
            itemList: ['个人资料', '设置', '帮助与反馈'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        wx.showToast({
                            title: '个人资料功能开发中',
                            icon: 'none'
                        });
                        break;
                    case 1:
                        wx.showToast({
                            title: '设置功能开发中',
                            icon: 'none'
                        });
                        break;
                    case 2:
                        wx.showToast({
                            title: '帮助与反馈功能开发中',
                            icon: 'none'
                        });
                        break;
                }
            }
        });
    },

    // 分享给好友
    onShareAppMessage() {
        return {
            title: '喵喵美颜 - AI智能美颜神器',
            path: '/pages/splash/splash',
            imageUrl: '' // 可以设置分享图片
        };
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '喵喵美颜 - 让每张照片都美美哒！',
            imageUrl: '' // 可以设置分享图片
        };
    }
});
