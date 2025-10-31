// 邀请好友页面逻辑

Page({
    data: {
        // VIP名额数量
        vipQuota: 3,

        // 已选择的好友数量
        selectedCount: 0,

        // 猫咪礼品图片
        catGiftImage: 'https://images.unsplash.com/photo-1555595925-69049e7b7682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwZ2lmdCUyMGNhcmQlMjBsdXh1cnl8ZW58MXx8fHwxNzU4ODc0ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',

        // 邀请码
        inviteCode: 'MEOW2024',

        // 好友列表
        friendsList: [
            {
                id: 1,
                name: '小雨',
                avatar: 'https://images.unsplash.com/photo-1651346158507-a2810590687f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwYmVhdXRpZnVsfGVufDF8fHwxNzU4ODc0ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                isVip: false,
                status: 'online'
            },
            {
                id: 2,
                name: '美美',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODc0ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                isVip: true,
                status: 'online'
            },
            {
                id: 3,
                name: '甜甜',
                avatar: 'https://images.unsplash.com/photo-1651346158507-a2810590687f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwYmVhdXRpZnVsfGVufDF8fHwxNzU4ODc0ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                isVip: false,
                status: 'offline'
            }
        ],

        // 奖励阶梯
        rewardLadder: [
            {
                id: 1,
                title: '邀请1位好友',
                reward: '专属滤镜包',
                icon: '⭐',
                completed: true,
                current: false
            },
            {
                id: 2,
                title: '邀请3位好友',
                reward: '限定猫咪贴纸',
                icon: '🎁',
                completed: true,
                current: false
            },
            {
                id: 3,
                title: '邀请5位好友',
                reward: '高级美颜功能',
                icon: '🏆',
                completed: false,
                current: true
            },
            {
                id: 4,
                title: '邀请10位好友',
                reward: '终身VIP会员',
                icon: '👑',
                completed: false,
                current: false
            }
        ],

        // 成就徽章
        achievements: [
            {
                id: 1,
                title: '邀请达人',
                description: '成功邀请5位好友',
                icon: '👥',
                unlocked: true,
                progress: '5/5'
            },
            {
                id: 2,
                title: '人气王',
                description: '获得100个赞',
                icon: '💖',
                unlocked: true,
                progress: '100/100'
            },
            {
                id: 3,
                title: '美颜专家',
                description: '使用高级滤镜30次',
                icon: '✨',
                unlocked: false,
                progress: '23/30'
            },
            {
                id: 4,
                title: '社交之星',
                description: '分享作品50次',
                icon: '🏆',
                unlocked: false,
                progress: '12/50'
            }
        ]
    },

    onLoad() {
        console.log('邀请好友页面加载');
        this.calculateProgress();
    },

    onShow() {
        console.log('邀请好友页面显示');
        this.calculateProgress();
    },

    // 计算进度
    calculateProgress() {
        const completedRewards = this.data.rewardLadder.filter(r => r.completed).length;
        const rewardProgress = (completedRewards / this.data.rewardLadder.length) * 100;
        const unlockedAchievements = this.data.achievements.filter(a => a.unlocked).length;

        this.setData({
            completedRewards,
            rewardProgress,
            unlockedAchievements
        });
    },

    // 返回上一页
    navigateBack() {
        wx.navigateBack({
            fail: () => {
                wx.redirectTo({ url: '/pages/home/home' });
            }
        });
    },

    // 转赠VIP
    transferVip(e: any) {
        const friendId = e.currentTarget.dataset.friendId;
        const friend = this.data.friendsList.find(f => f.id === friendId);

        if (!friend || friend.isVip) return;

        wx.showModal({
            title: '转赠VIP',
            content: `确定要将VIP转赠给"${friend.name}"吗？`,
            showCancel: true,
            cancelText: '取消',
            confirmText: '确定',
            success: (res) => {
                if (res.confirm) {
                    console.log('转赠VIP给:', friend.name);
                    wx.showToast({
                        title: '转赠成功',
                        icon: 'success'
                    });

                    // 更新VIP名额
                    this.setData({
                        vipQuota: this.data.vipQuota - 1
                    });
                }
            }
        });
    },

    // 分享到微信好友
    shareToWeChat() {
        console.log('分享到微信好友');
        wx.showToast({
            title: '分享功能待实现',
            icon: 'none'
        });
    },

    // 分享到朋友圈
    shareToMoments() {
        console.log('分享到朋友圈');
        wx.showToast({
            title: '分享功能待实现',
            icon: 'none'
        });
    },

    // 复制邀请链接
    copyInviteLink() {
        const inviteText = `🎁 快来加入喵喵美颜，一起变美吧！\n邀请码：${this.data.inviteCode}`;

        wx.setClipboardData({
            data: inviteText,
            success: () => {
                wx.showToast({
                    title: '邀请链接已复制',
                    icon: 'success',
                    duration: 2000
                });
                console.log('邀请链接复制成功:', inviteText);
            },
            fail: (err) => {
                console.error('复制邀请链接失败:', err);
                wx.showToast({
                    title: '复制失败',
                    icon: 'error'
                });
            }
        });
    },

    // 立即邀请好友
    inviteFriends() {
        console.log('立即邀请好友');

        wx.showActionSheet({
            itemList: ['分享到微信好友', '分享到朋友圈', '复制邀请链接'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        this.shareToWeChat();
                        break;
                    case 1:
                        this.shareToMoments();
                        break;
                    case 2:
                        this.copyInviteLink();
                        break;
                }
            },
            fail: (err) => {
                console.error('显示分享选项失败:', err);
            }
        });
    }
});
