// privacy.ts
Component({
    data: {
        // 页面数据
    },

    methods: {
        // 同意隐私政策
        agreePrivacy() {
            wx.showModal({
                title: '确认同意',
                content: '您确定同意隐私政策吗？',
                success: (res) => {
                    if (res.confirm) {
                        // 保存用户同意状态
                        wx.setStorageSync('privacyAgreed', true)
                        wx.setStorageSync('privacyAgreedTime', Date.now())

                        wx.showToast({
                            title: '已同意隐私政策',
                            icon: 'success'
                        })

                        // 返回上一页
                        setTimeout(() => {
                            wx.navigateBack()
                        }, 1500)
                    }
                }
            })
        },

        // 返回
        goBack() {
            wx.navigateBack()
        }
    },

    // 页面加载
    onLoad() {
        // 检查是否已同意条款
        const privacyAgreed = wx.getStorageSync('privacyAgreed')
        if (privacyAgreed) {
            wx.showToast({
                title: '您已同意隐私政策',
                icon: 'success'
            })
        }
    }
})
