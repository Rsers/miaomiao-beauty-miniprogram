// terms.ts
Component({
    data: {
        // 页面数据
    },

    methods: {
        // 同意服务条款
        agreeTerms() {
            wx.showModal({
                title: '确认同意',
                content: '您确定同意服务条款吗？',
                success: (res) => {
                    if (res.confirm) {
                        // 保存用户同意状态
                        wx.setStorageSync('termsAgreed', true)
                        wx.setStorageSync('termsAgreedTime', Date.now())

                        wx.showToast({
                            title: '已同意服务条款',
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

        // 不同意服务条款
        disagreeTerms() {
            wx.showModal({
                title: '提示',
                content: '不同意服务条款将无法使用本服务，确定要退出吗？',
                success: (res) => {
                    if (res.confirm) {
                        // 返回上一页
                        wx.navigateBack()
                    }
                }
            })
        }
    },

    // 页面加载
    onLoad() {
        // 检查是否已同意条款
        const termsAgreed = wx.getStorageSync('termsAgreed')
        if (termsAgreed) {
            wx.showToast({
                title: '您已同意服务条款',
                icon: 'success'
            })
        }
    }
})
