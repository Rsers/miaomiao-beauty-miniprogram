// 启动页面逻辑
Page({
  data: {
    showContent: false,
    loadingText: '正在启动美颜魔法...',
    loadingTexts: [
      '正在启动美颜魔法...',
      '准备喵喵变身...',
      '加载美颜滤镜...',
      '初始化AI引擎...'
    ],
    currentTextIndex: 0
  },

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
    // 模拟不同的加载阶段
    const loadingSteps = [
      { delay: 1000, text: '正在启动美颜魔法...' },
      { delay: 2000, text: '准备喵喵变身...' },
      { delay: 3000, text: '加载美颜滤镜...' },
      { delay: 4000, text: '初始化AI引擎...' },
      { delay: 5000, text: '准备就绪！' }
    ];

    let currentStep = 0;

    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        this.setData({
          loadingText: step.text
        });
        currentStep++;
      } else {
        clearInterval(stepInterval);
        // 加载完成，跳转到主页
        this.navigateToMain();
      }
    }, 1000);

    // 存储定时器ID
    this.loadingStepInterval = stepInterval;
  },

  // 跳转到主页
  navigateToMain() {
    console.log('启动完成，跳转到主页');
    
    // 清理定时器
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearInterval(this.loadingStepInterval);
    }

    // 延迟跳转，让用户看到"准备就绪！"
    setTimeout(() => {
      // 如果是从主页跳转过来的，直接返回
      if (this.isFromMainPage) {
        wx.navigateBack({
          success: () => {
            console.log('返回到主页');
          },
          fail: () => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }
        });
      } else {
        // 正常启动流程，跳转到主页
        wx.switchTab({
          url: '/pages/index/index',
          success: () => {
            console.log('成功跳转到主页');
          },
          fail: (err) => {
            console.error('跳转失败:', err);
            // 如果switchTab失败，尝试使用redirectTo
            wx.redirectTo({
              url: '/pages/index/index'
            });
          }
        });
      }
    }, 1000);
  },

  // 页面卸载时清理定时器
  onUnload() {
    console.log('启动页面卸载');
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearInterval(this.loadingStepInterval);
    }
  },

  // 页面隐藏时清理定时器
  onHide() {
    console.log('启动页面隐藏');
    if (this.loadingTextInterval) {
      clearInterval(this.loadingTextInterval);
    }
    if (this.loadingStepInterval) {
      clearInterval(this.loadingStepInterval);
    }
  },

  // 用户点击跳过启动页面
  onSkipSplash() {
    console.log('用户跳过启动页面');
    this.navigateToMain();
  }
});
