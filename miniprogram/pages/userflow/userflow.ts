// 用户流程图页面逻辑

Page({
    data: {
        // 病毒式增长指标
        viralIndicators: [
            { id: '1', emoji: '❤️', count: '2.3K', label: '点赞' },
            { id: '2', emoji: '📤', count: '856', label: '分享' },
            { id: '3', emoji: '👥', count: '1.2K', label: '新用户' },
            { id: '4', emoji: '⭐', count: '4.8', label: '评分' }
        ],

        // 流程步骤
        flowSteps: [
            {
                id: 1,
                title: '发现应用',
                subtitle: '通过好友邀请',
                description: '朋友分享邀请链接',
                emoji: '👥',
                colorClass: 'color-pink',
                mobile: true
            },
            {
                id: 2,
                title: '完成拼图',
                subtitle: '与好友协作',
                description: '多人合作完成美颜拼图',
                emoji: '🧩',
                colorClass: 'color-purple',
                mobile: true
            },
            {
                id: 3,
                title: '分享动画',
                subtitle: '展示作品成果',
                description: '生成专属美颜动画',
                emoji: '📤',
                colorClass: 'color-blue',
                mobile: true
            },
            {
                id: 4,
                title: '邀请好友',
                subtitle: 'VIP权限转让',
                description: '获得VIP邀请特权',
                emoji: '👑',
                colorClass: 'color-green',
                mobile: false
            },
            {
                id: 5,
                title: '获得奖励',
                subtitle: '积分与徽章',
                description: '累积积分兑换奖品',
                emoji: '🏆',
                colorClass: 'color-orange',
                mobile: false
            },
            {
                id: 6,
                title: '活跃推广者',
                subtitle: '成为品牌大使',
                description: '持续推广获得收益',
                emoji: '📈',
                colorClass: 'color-red',
                mobile: false
            }
        ]
    },

    onLoad() {
        console.log('用户流程图页面加载');
        this.loadFlowData();
    },

    onShow() {
        console.log('用户流程图页面显示');
        this.loadFlowData();
    },

    // 加载流程数据
    loadFlowData() {
        // 这里可以从服务器获取最新的流程数据
        const flowData = wx.getStorageSync('userFlowData');
        if (flowData) {
            this.setData({
                viralIndicators: flowData.viralIndicators || this.data.viralIndicators,
                flowSteps: flowData.flowSteps || this.data.flowSteps
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

    // 分享流程
    shareFlow() {
        wx.showActionSheet({
            itemList: ['分享给好友', '分享到朋友圈', '复制链接'],
            success: (res) => {
                switch (res.tapIndex) {
                    case 0:
                        this.shareToFriend();
                        break;
                    case 1:
                        this.shareToTimeline();
                        break;
                    case 2:
                        this.copyLink();
                        break;
                }
            }
        });
    },

    // 分享给好友
    shareToFriend() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage']
        });
    },

    // 分享到朋友圈
    shareToTimeline() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareTimeline']
        });
    },

    // 复制链接
    copyLink() {
        wx.setClipboardData({
            data: 'https://miaomiaomeiyan.com/userflow',
            success: () => {
                wx.showToast({
                    title: '链接已复制',
                    icon: 'success'
                });
            }
        });
    },

    // 开始体验流程
    startFlow() {
        wx.showModal({
            title: '开始体验',
            content: '您想从哪个步骤开始体验用户流程？',
            showCancel: true,
            cancelText: '取消',
            confirmText: '开始体验',
            success: (res) => {
                if (res.confirm) {
                    this.showFlowSteps();
                }
            }
        });
    },

    // 显示流程步骤选择
    showFlowSteps() {
        const stepNames = this.data.flowSteps.map(step => step.title);

        wx.showActionSheet({
            itemList: stepNames,
            success: (res) => {
                const selectedStep = this.data.flowSteps[res.tapIndex];
                this.navigateToStep(selectedStep);
            }
        });
    },

    // 导航到指定步骤
    navigateToStep(step: any) {
        console.log('导航到步骤:', step.title);

        switch (step.id) {
            case 1:
                // 发现应用 - 跳转到邀请页面
                wx.navigateTo({ url: '/pages/invite/invite' });
                break;
            case 2:
                // 完成拼图 - 跳转到拼图页面
                wx.navigateTo({ url: '/pages/puzzle/puzzle' });
                break;
            case 3:
                // 分享动画 - 跳转到相机页面
                wx.navigateTo({ url: '/pages/camera/camera' });
                break;
            case 4:
                // 邀请好友 - 跳转到邀请页面
                wx.navigateTo({ url: '/pages/invite/invite' });
                break;
            case 5:
                // 获得奖励 - 跳转到积分商城
                wx.navigateTo({ url: '/pages/mall/mall' });
                break;
            case 6:
                // 活跃推广者 - 跳转到推荐奖励页面
                wx.navigateTo({ url: '/pages/referral/referral' });
                break;
            default:
                wx.showToast({
                    title: '功能开发中',
                    icon: 'none'
                });
        }
    },

    // 了解更多
    learnMore() {
        wx.showModal({
            title: '关于用户流程',
            content: '喵喵美颜通过社交裂变机制实现用户增长：\n\n1. 朋友邀请带来新用户\n2. 协作拼图增强互动\n3. 分享传播扩大影响\n4. VIP特权激励邀请\n5. 积分奖励促进活跃\n6. 持续推广获得收益\n\n这种机制让用户既是消费者也是推广者！',
            showCancel: false,
            confirmText: '知道了'
        });
    },

    // 步骤卡片点击
    onStepTap(e: any) {
        const stepId = e.currentTarget.dataset.stepId;
        const step = this.data.flowSteps.find(s => s.id === stepId);

        if (step) {
            wx.showModal({
                title: step.title,
                content: `${step.subtitle}\n\n${step.description}\n\n是否要体验这个步骤？`,
                showCancel: true,
                cancelText: '取消',
                confirmText: '体验',
                success: (res) => {
                    if (res.confirm) {
                        this.navigateToStep(step);
                    }
                }
            });
        }
    },

    // 指标卡片点击
    onMetricTap(e: any) {
        const metricId = e.currentTarget.dataset.metricId;
        const metric = this.data.viralIndicators.find(m => m.id === metricId);

        if (metric) {
            wx.showModal({
                title: metric.label,
                content: `当前${metric.label}数量：${metric.count}\n\n这个指标反映了用户对喵喵美颜的喜爱程度和参与度。`,
                showCancel: false,
                confirmText: '知道了'
            });
        }
    },

    // 页面分享
    onShareAppMessage() {
        return {
            title: '喵喵美颜 - 用户流程图',
            path: '/pages/userflow/userflow',
            imageUrl: '/images/userflow-share.jpg'
        };
    },

    // 分享到朋友圈
    onShareTimeline() {
        return {
            title: '喵喵美颜 - 社交裂变机制流程图',
            imageUrl: '/images/userflow-share.jpg'
        };
    },

    // 页面滚动事件
    onPageScroll(e: any) {
        // 可以在这里添加滚动时的动画效果
        const scrollTop = e.scrollTop;
        console.log('页面滚动:', scrollTop);
    },

    // 下拉刷新
    onPullDownRefresh() {
        console.log('下拉刷新');

        // 重新加载数据
        this.loadFlowData();

        // 停止下拉刷新
        wx.stopPullDownRefresh();

        wx.showToast({
            title: '刷新成功',
            icon: 'success',
            duration: 1500
        });
    }
});
