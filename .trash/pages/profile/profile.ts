// 个人资料页面逻辑

Page({
    data: {
        // 用户信息
        userInfo: {
            nickname: '小猫咪',
            avatar: 'https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODAxMzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            title: '猫咪美颜达人',
            userId: '888888',
            rating: '猫咪五星用户'
        },

        // 会员信息
        membershipInfo: {
            level: '至尊VIP',
            name: '至尊猫咪会员',
            description: '享受专属特权和服务',
            currentExp: 8500,
            maxExp: 10000,
            progressPercent: 85,
            nextLevelTip: '还需1,500经验值升级到钻石会员'
        },

        // 猫咪徽章
        badges: [
            { id: '1', name: '美颜猫', emoji: '⭐', colorClass: 'bg-yellow-100' },
            { id: '2', name: '钻石猫', emoji: '💎', colorClass: 'bg-pink-100' },
            { id: '3', name: '皇冠猫', emoji: '👑', colorClass: 'bg-purple-100' },
            { id: '4', name: '荣誉猫', emoji: '🏆', colorClass: 'bg-orange-100' }
        ],

        // 统计数据
        stats: {
            points: 2580,
            invites: 12,
            achievements: 28,
            level: 85
        },

        // 功能菜单
        menuItems: [
            { id: 'camera', label: '美颜相机', emoji: '📷', colorClass: 'bg-pink-100' },
            { id: 'filters', label: '猫咪滤镜', emoji: '✨', colorClass: 'bg-purple-100' },
            { id: 'makeup', label: '美妆工具', emoji: '💄', colorClass: 'bg-orange-100' },
            { id: 'music', label: '音乐相册', emoji: '🎵', colorClass: 'bg-blue-100' },
            { id: 'favorites', label: '我的收藏', emoji: '❤️', colorClass: 'bg-red-100' },
            { id: 'share', label: '分享作品', emoji: '📤', colorClass: 'bg-green-100' },
            { id: 'checkin', label: '每日签到', emoji: '🎁', colorClass: 'bg-yellow-100' },
            { id: 'invite', label: '邀请好友', emoji: '👥', colorClass: 'bg-indigo-100' }
        ],

        // 设置菜单
        settingsItems: [
            { id: 'profile', label: '个人资料', emoji: '👤', colorClass: 'bg-blue-100' },
            { id: 'notification', label: '消息通知', emoji: '🔔', colorClass: 'bg-green-100' },
            { id: 'privacy', label: '隐私设置', emoji: '🛡️', colorClass: 'bg-purple-100' },
            { id: 'feedback', label: '意见反馈', emoji: '💬', colorClass: 'bg-orange-100' },
            { id: 'help', label: '帮助中心', emoji: '❓', colorClass: 'bg-pink-100' }
        ]
    },

    onLoad() {
        console.log('个人资料页面加载');
        this.loadUserData();
    },

    onShow() {
        console.log('个人资料页面显示');
        this.loadUserData();
    },

    // 加载用户数据
    loadUserData() {
        // 这里可以从本地存储或服务器获取用户数据
        const userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                'userInfo.nickname': userInfo.nickname || '小猫咪',
                'userInfo.avatar': userInfo.avatar || this.data.userInfo.avatar,
                'userInfo.title': userInfo.title || '猫咪美颜达人',
                'userInfo.userId': userInfo.userId || '888888'
            });
        }

        // 加载统计数据
        this.loadStats();
    },

    // 加载统计数据
    loadStats() {
        // 这里可以从服务器获取最新的统计数据
        const stats = wx.getStorageSync('userStats');
        if (stats) {
            this.setData({
                stats: {
                    points: stats.points || 2580,
                    invites: stats.invites || 12,
                    achievements: stats.achievements || 28,
                    level: stats.level || 85
                }
            });
        }
    },

    // 返回上一页
    navigateBack() {
        wx.navigateBack({
            fail: () => {
                wx.redirectTo({ url: '/pages/home/home' });
            }
        });
    },

    // 功能菜单点击
    onMenuTap(e: any) {
        const menuId = e.currentTarget.dataset.menu;
        console.log('点击功能菜单:', menuId);

        switch (menuId) {
            case 'camera':
                wx.navigateTo({ url: '/pages/camera/camera' });
                break;
            case 'filters':
                wx.showToast({
                    title: '猫咪滤镜功能开发中',
                    icon: 'none'
                });
                break;
            case 'makeup':
                wx.showToast({
                    title: '美妆工具功能开发中',
                    icon: 'none'
                });
                break;
            case 'music':
                wx.showToast({
                    title: '音乐相册功能开发中',
                    icon: 'none'
                });
                break;
            case 'favorites':
                wx.showToast({
                    title: '我的收藏功能开发中',
                    icon: 'none'
                });
                break;
            case 'share':
                this.shareProfile();
                break;
            case 'checkin':
                this.dailyCheckin();
                break;
            case 'invite':
                wx.navigateTo({ url: '/pages/invite/invite' });
                break;
            default:
                wx.showToast({
                    title: '功能开发中',
                    icon: 'none'
                });
        }
    },

    // 设置菜单点击
    onSettingTap(e: any) {
        const settingId = e.currentTarget.dataset.setting;
        console.log('点击设置菜单:', settingId);

        switch (settingId) {
            case 'profile':
                this.editProfile();
                break;
            case 'notification':
                wx.showToast({
                    title: '消息通知设置功能开发中',
                    icon: 'none'
                });
                break;
            case 'privacy':
                wx.showToast({
                    title: '隐私设置功能开发中',
                    icon: 'none'
                });
                break;
            case 'feedback':
                this.showFeedback();
                break;
            case 'help':
                wx.showToast({
                    title: '帮助中心功能开发中',
                    icon: 'none'
                });
                break;
            default:
                wx.showToast({
                    title: '功能开发中',
                    icon: 'none'
                });
        }
    },

    // 编辑个人资料
    editProfile() {
        wx.showModal({
            title: '编辑个人资料',
            content: '是否要编辑个人资料？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '编辑',
            success: (res) => {
                if (res.confirm) {
                    wx.showToast({
                        title: '编辑功能开发中',
                        icon: 'none'
                    });
                }
            }
        });
    },

    // 分享个人资料
    shareProfile() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
    },

    // 每日签到
    dailyCheckin() {
        const today = new Date().toDateString();
        const lastCheckin = wx.getStorageSync('lastCheckin');

        if (lastCheckin === today) {
            wx.showToast({
                title: '今日已签到',
                icon: 'none'
            });
            return;
        }

        wx.showModal({
            title: '每日签到',
            content: '签到可获得10猫币，是否立即签到？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '签到',
            success: (res) => {
                if (res.confirm) {
                    // 更新签到状态
                    wx.setStorageSync('lastCheckin', today);

                    // 增加猫币
                    const currentPoints = this.data.stats.points;
                    const newPoints = currentPoints + 10;

                    this.setData({
                        'stats.points': newPoints
                    });

                    // 保存到本地存储
                    wx.setStorageSync('userStats', {
                        ...this.data.stats,
                        points: newPoints
                    });

                    wx.showToast({
                        title: '签到成功！获得10猫币',
                        icon: 'success',
                        duration: 2000
                    });
                }
            }
        });
    },

    // 显示意见反馈
    showFeedback() {
        wx.showModal({
            title: '意见反馈',
            content: '感谢您的反馈！我们会认真考虑您的建议。',
            showCancel: false,
            confirmText: '知道了'
        });
    },

    // 退出登录
    onLogout() {
        wx.showModal({
            title: '退出登录',
            content: '确定要退出登录吗？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '退出',
            confirmColor: '#dc2626',
            success: (res) => {
                if (res.confirm) {
                    // 清除用户数据
                    wx.removeStorageSync('userInfo');
                    wx.removeStorageSync('userStats');
                    wx.removeStorageSync('lastCheckin');

                    wx.showToast({
                        title: '已退出登录',
                        icon: 'success',
                        duration: 1500
                    });

                    // 跳转到登录页面或首页
                    setTimeout(() => {
                        wx.redirectTo({ url: '/pages/index/index' });
                    }, 1500);
                }
            }
        });
    },

    // 页面分享
    onShareAppMessage() {
        return {
            title: '喵喵美颜 - 个人中心',
            path: '/pages/profile/profile',
            imageUrl: this.data.userInfo.avatar
        };
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '喵喵美颜 - 个人中心',
            imageUrl: this.data.userInfo.avatar
        };
    }
});
