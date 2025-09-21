// webview.ts
Page({
    data: {
        webUrl: 'https://www.gongjuxiang.work',
        isLoading: true,
        hasError: false
    },

    onLoad(options: any) {
        console.log('webview页面加载', options)
        // 设置加载状态
        this.setData({
            isLoading: true,
            hasError: false
        })
    },

    onMessage(e: any) {
        console.log('收到web-view消息:', e.detail.data)
    },

    onError(e: any) {
        console.error('web-view加载错误:', e)
        this.setData({
            isLoading: false,
            hasError: true
        })

        wx.showToast({
            title: '页面加载失败',
            icon: 'error',
            duration: 2000
        })
    },

    onLoad(e: any) {
        console.log('web-view加载完成:', e)
        this.setData({
            isLoading: false,
            hasError: false
        })
    },

    // 重新加载
    retryLoad() {
        this.setData({
            isLoading: true,
            hasError: false
        })

        // 重新设置URL触发重新加载
        const currentUrl = this.data.webUrl
        this.setData({
            webUrl: ''
        })

        setTimeout(() => {
            this.setData({
                webUrl: currentUrl
            })
        }, 100)
    },

    // 返回上一页
    goBack() {
        wx.navigateBack({
            delta: 1
        })
    },

    // 跳转到小程序版
    goToAppVersion() {
        wx.redirectTo({
            url: '/pages/index/index'
        })
    }
})


