// 美颜相机页面逻辑
Page({
    data: {
        // 相机预览相关
        previewImage: 'https://images.unsplash.com/photo-1649654077252-a0b200197c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjYW1lcmElMjBzZWxmaWV8ZW58MXx8fHwxNzU4ODI0NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        beautyLevel: 85,
        selectedFilter: '原图',

        // 滤镜列表
        filters: [
            { name: '原图', icon: '📷' },
            { name: '猫咪眼', icon: '🐱' },
            { name: '粉粉甜', icon: '🌸' },
            { name: '梦幻紫', icon: '💜' },
            { name: '清纯系', icon: '✨' }
        ],

        // AI换脸相关
        sourceImage: '',
        targetImage: '',

        // 猫咪特效相关
        selectedCatFilter: '猫耳朵',
        filterIntensity: 85,
        catFilters: [
            {
                name: '猫耳朵',
                emoji: '🐱',
                preview: '添加可爱猫耳',
                premium: false
            },
            {
                name: '猫胡须',
                emoji: '😸',
                preview: '俏皮猫胡须',
                premium: false
            },
            {
                name: '猫眼妆',
                emoji: '😻',
                preview: '魅惑猫眼',
                premium: true
            },
            {
                name: '猫咪腮红',
                emoji: '🥰',
                preview: '粉嫩猫咪腮红',
                premium: true
            },
            {
                name: '猫爪印',
                emoji: '🐾',
                preview: '可爱爪印装饰',
                premium: false
            },
            {
                name: '猫咪头饰',
                emoji: '👑',
                preview: '皇冠猫咪',
                premium: true
            }
        ],

        // VIP购买相关
        remainingUses: 3,
        countdownTime: '00:59:03',
        countdownSeconds: 3543,

        // 协作相关
        activeUsers: [
            { avatar: '🐱', status: 'online' },
            { avatar: '🐷', status: 'editing' },
            { avatar: '💜', status: 'online' }
        ],
        puzzlePieces: [
            { completed: true },
            { completed: true },
            { completed: false },
            { completed: false }
        ],

        // 社交分享相关
        quickActions: [
            { icon: '💖', label: '点赞', count: '3.2k', active: false, type: 'like' },
            { icon: '💬', label: '评论', count: '156', active: false, type: 'comment' },
            { icon: '🔖', label: '收藏', count: '892', active: true, type: 'bookmark' },
            { icon: '💾', label: '保存', count: '', active: false, type: 'save' }
        ],
        socialPlatforms: [
            {
                id: 'wechat',
                name: '微信',
                icon: '💬',
                gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                count: '1.2k'
            },
            {
                id: 'weibo',
                name: '微博',
                icon: '📱',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                count: '856'
            },
            {
                id: 'douyin',
                name: '抖音',
                icon: '🎵',
                gradient: 'linear-gradient(135deg, #000000 0%, #374151 100%)',
                count: '2.3k'
            },
            {
                id: 'xiaohongshu',
                name: '小红书',
                icon: '📝',
                gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
                count: '678'
            }
        ],
        trendingTopics: ['#猫咪美颜', '#AI换脸', '#美颜相机', '#可爱自拍']
    },

    onLoad() {
        console.log('美颜相机页面加载');
        this.startCountdown();
    },

    onShow() {
        console.log('美颜相机页面显示');
    },

    onReady() {
        console.log('美颜相机页面渲染完成');
    },

    onUnload() {
        console.log('美颜相机页面卸载');
        // 清理定时器
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }
    },

    // 返回按钮
    goBack() {
        wx.navigateBack({
            success: () => {
                console.log('返回上一页');
            },
            fail: () => {
                // 如果无法返回，跳转到首页
                wx.redirectTo({
                    url: '/pages/home/home'
                });
            }
        });
    },

    // 设置按钮
    onSettingsTap() {
        console.log('设置按钮点击');
        wx.showActionSheet({
            itemList: ['相机设置', '美颜参数', '滤镜管理', '关于我们'],
            success: (res) => {
                const actions = ['相机设置', '美颜参数', '滤镜管理', '关于我们'];
                wx.showToast({
                    title: `${actions[res.tapIndex]}功能开发中`,
                    icon: 'none'
                });
            }
        });
    },

    // 用户按钮
    onUserTap() {
        console.log('用户按钮点击');
        wx.showActionSheet({
            itemList: ['个人资料', '我的作品', '使用记录', '退出登录'],
            success: (res) => {
                const actions = ['个人资料', '我的作品', '使用记录', '退出登录'];
                if (res.tapIndex === 3) {
                    // 退出登录
                    wx.showModal({
                        title: '确认退出',
                        content: '确定要退出登录吗？',
                        success: (modalRes) => {
                            if (modalRes.confirm) {
                                wx.clearStorageSync();
                                wx.showToast({
                                    title: '已退出登录',
                                    icon: 'success'
                                });
                            }
                        }
                    });
                } else {
                    wx.showToast({
                        title: `${actions[res.tapIndex]}功能开发中`,
                        icon: 'none'
                    });
                }
            }
        });
    },

    // 切换镜头
    switchCamera() {
        console.log('切换镜头');
        wx.showToast({
            title: '切换镜头功能开发中',
            icon: 'none'
        });
    },

    // 闪光灯
    onFlashTap() {
        console.log('闪光灯');
        wx.showToast({
            title: '闪光灯功能开发中',
            icon: 'none'
        });
    },

    // 旋转
    onRotateTap() {
        console.log('旋转');
        wx.showToast({
            title: '旋转功能开发中',
            icon: 'none'
        });
    },

    // 滤镜选择
    onFilterTap(e: any) {
        const filter = e.currentTarget.dataset.filter;
        console.log('选择滤镜:', filter);

        this.setData({
            selectedFilter: filter
        });

        wx.showToast({
            title: `已选择${filter}滤镜`,
            icon: 'success',
            duration: 1000
        });
    },

    // 上传源图片
    uploadSourceImage() {
        console.log('上传源图片');
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath;
                this.setData({
                    sourceImage: tempFilePath
                });
                wx.showToast({
                    title: '源图片上传成功',
                    icon: 'success'
                });
            },
            fail: (err) => {
                console.error('上传源图片失败:', err);
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                });
            }
        });
    },

    // 上传目标图片
    uploadTargetImage() {
        console.log('上传目标图片');
        wx.chooseMedia({
            count: 1,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                const tempFilePath = res.tempFiles[0].tempFilePath;
                this.setData({
                    targetImage: tempFilePath
                });
                wx.showToast({
                    title: '目标图片上传成功',
                    icon: 'success'
                });
            },
            fail: (err) => {
                console.error('上传目标图片失败:', err);
                wx.showToast({
                    title: '上传失败',
                    icon: 'error'
                });
            }
        });
    },

    // 开始AI换脸
    startFaceSwap() {
        console.log('开始AI换脸');

        if (!this.data.sourceImage || !this.data.targetImage) {
            wx.showToast({
                title: '请先上传两张图片',
                icon: 'none'
            });
            return;
        }

        // 检查剩余次数
        if (this.data.remainingUses <= 0) {
            wx.showModal({
                title: '次数不足',
                content: '您的免费次数已用完，是否购买VIP继续使用？',
                confirmText: '购买VIP',
                cancelText: '取消',
                success: (res) => {
                    if (res.confirm) {
                        this.onPurchaseTap();
                    }
                }
            });
            return;
        }

        wx.showLoading({
            title: 'AI换脸处理中...'
        });

        // 模拟AI处理过程
        setTimeout(() => {
            wx.hideLoading();

            // 减少使用次数
            const newUses = this.data.remainingUses - 1;
            this.setData({
                remainingUses: newUses
            });

            wx.showModal({
                title: 'AI换脸完成！',
                content: '您的AI换脸图片已生成，是否查看结果？',
                confirmText: '查看结果',
                cancelText: '继续编辑',
                success: (modalRes) => {
                    if (modalRes.confirm) {
                        // 跳转到结果页面
                        wx.navigateTo({
                            url: '/pages/index/index'
                        });
                    }
                }
            });
        }, 3000);
    },

    // 猫咪特效选择
    onCatFilterTap(e: any) {
        const filter = e.currentTarget.dataset.filter;
        console.log('选择猫咪特效:', filter);

        this.setData({
            selectedCatFilter: filter
        });

        wx.showToast({
            title: `已选择${filter}特效`,
            icon: 'success',
            duration: 1000
        });
    },

    // 开始倒计时
    startCountdown() {
        this.countdownTimer = setInterval(() => {
            let seconds = this.data.countdownSeconds;
            if (seconds > 0) {
                seconds--;
                const hours = Math.floor(seconds / 3600);
                const minutes = Math.floor((seconds % 3600) / 60);
                const secs = seconds % 60;
                const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

                this.setData({
                    countdownSeconds: seconds,
                    countdownTime: timeString
                });
            } else {
                // 倒计时结束，重置
                this.setData({
                    countdownSeconds: 3600, // 重置为1小时
                    countdownTime: '01:00:00'
                });
            }
        }, 1000);
    },

    // 购买VIP
    onPurchaseTap() {
        console.log('购买VIP');

        wx.showModal({
            title: 'VIP特权',
            content: 'VIP用户享受无限次数使用和专属滤镜，是否立即购买？',
            confirmText: '立即购买',
            cancelText: '稍后再说',
            success: (res) => {
                if (res.confirm) {
                    // 跳转到支付页面
                    wx.navigateTo({
                        url: '/pages/index/index?action=purchase'
                    });
                }
            }
        });
    },

    // 邀请协作
    inviteCollaboration() {
        console.log('邀请协作');
        wx.showModal({
            title: '邀请好友协作',
            content: '分享链接给好友，一起创作美图！',
            confirmText: '分享链接',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    wx.showShareMenu({
                        withShareTicket: true,
                        menus: ['shareAppMessage', 'shareTimeline']
                    });
                }
            }
        });
    },

    // 开始聊天
    startChat() {
        console.log('开始聊天');
        wx.showToast({
            title: '实时聊天功能开发中',
            icon: 'none'
        });
    },

    // 快速操作
    onQuickActionTap(e: any) {
        const action = e.currentTarget.dataset.action;
        console.log('快速操作:', action);

        const actions = this.data.quickActions;
        const index = actions.findIndex(item => item.type === action);

        if (index !== -1) {
            actions[index].active = !actions[index].active;
            this.setData({
                quickActions: actions
            });

            const actionNames = {
                like: '点赞',
                comment: '评论',
                bookmark: '收藏',
                save: '保存'
            };

            wx.showToast({
                title: actions[index].active ? `${actionNames[action]}成功` : `取消${actionNames[action]}`,
                icon: 'success',
                duration: 1000
            });
        }
    },

    // 社交平台分享
    onPlatformTap(e: any) {
        const platform = e.currentTarget.dataset.platform;
        console.log('分享到平台:', platform);

        const platformNames = {
            wechat: '微信',
            weibo: '微博',
            douyin: '抖音',
            xiaohongshu: '小红书'
        };

        wx.showModal({
            title: '分享确认',
            content: `是否分享到${platformNames[platform]}？`,
            confirmText: '确认分享',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    wx.showToast({
                        title: `已分享到${platformNames[platform]}`,
                        icon: 'success'
                    });
                }
            }
        });
    },

    // 分享到群组
    shareToGroup() {
        console.log('分享到群组');
        wx.showModal({
            title: '分享到猫咪群组',
            content: '是否分享到您加入的猫咪群组？',
            confirmText: '确认分享',
            cancelText: '取消',
            success: (res) => {
                if (res.confirm) {
                    wx.showToast({
                        title: '已分享到猫咪群组',
                        icon: 'success'
                    });
                }
            }
        });
    },

    // 分享给好友
    onShareAppMessage() {
        return {
            title: '喵喵美颜相机 - AI智能美颜神器',
            path: '/pages/camera/camera',
            imageUrl: '' // 可以设置分享图片
        };
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '喵喵美颜相机 - 让每张照片都美美哒！',
            imageUrl: '' // 可以设置分享图片
        };
    }
});
