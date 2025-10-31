// 启动页面逻辑
Page({
  data: {
    showContent: false,
    loadingText: '正在启动美颜魔法...',
    loadingTexts: [
      '正在启动美颜魔法...',
      '准备喵喵变身...',
      '加载美颜滤镜...',
      '初始化智能引擎...'
    ],
    currentTextIndex: 0
  },

  // TypeScript 类型声明
  isFromMainPage: false,
  loadingTextInterval: null as any,
  loadingStepInterval: null as any,

  onLoad(options: any) {
    console.log('启动页面加载', options);

    // 检查是否是从主页跳转过来的（用于演示）
    this.isFromMainPage = options.from === 'main';

    this.initSplash();
  },

  onShow() {
    console.log('启动页面显示');
  },

  onReady() {
    console.log('启动页面渲染完成');
  },

  // 初始化启动页面
  initSplash() {
    // 延迟显示内容，让动画更自然
    setTimeout(() => {
      this.setData({
        showContent: true
      });

      // 开始加载文字轮换
      this.startLoadingTextRotation();

      // 模拟加载过程
      this.simulateLoading();
    }, 300);
  },

  // 开始加载文字轮换
  startLoadingTextRotation() {
    const interval = setInterval(() => {
      const nextIndex = (this.data.currentTextIndex + 1) % this.data.loadingTexts.length;
      this.setData({
        currentTextIndex: nextIndex,
        loadingText: this.data.loadingTexts[nextIndex]
      });
    }, 1500);

    // 存储定时器ID，用于清理
    this.loadingTextInterval = interval;
  },

  // 模拟加载过程
  simulateLoading() {
    // 1秒后直接跳转
    this.loadingStepInterval = setTimeout(() => {
      // 加载完成，跳转到主页
      this.navigateToMain();
    }, 2500);
  },

  // 跳转到主页
  navigateToMain() {
    console.log('启动完成，跳转到主页');

    // 清理定时器
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearTimeout(this.loadingStepInterval);
    }

    // 直接跳转，不再延迟
    // 跳转到图片修复页
    wx.redirectTo({
      url: '/pages/index/index',
      success: () => {
        console.log('成功跳转到图片修复页');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        // 如果redirectTo失败，尝试使用navigateTo
        wx.navigateTo({
          url: '/pages/index/index'
        });
      }
    });
  },

  // 页面卸载时清理定时器
  onUnload() {
    console.log('启动页面卸载');
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearTimeout(this.loadingStepInterval);
    }
  },

  // 页面隐藏时清理定时器
  onHide() {
    console.log('启动页面隐藏');
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearTimeout(this.loadingStepInterval);
    }
  },

  // 用户点击跳过启动页面
  onSkipSplash() {
    console.log('用户跳过启动页面');
    this.navigateToMain();
  }
});
