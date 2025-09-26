// 积分商城页面逻辑

Page({
  data: {
    // 用户积分
    userPoints: 2580,
    
    // 用户VIP等级
    userVipLevel: 3,
    
    // 购物车数量
    cartCount: 2,
    
    // 剩余时间
    remainingTime: '2天13小时',
    
    // 当前选中的分类
    activeCategory: 'skincare',
    
    // 商品分类
    categories: [
      { id: 'skincare', name: '护肤', emoji: '🧴' },
      { id: 'makeup', name: '彩妆', emoji: '💄' },
      { id: 'tools', name: '工具', emoji: '🪞' },
      { id: 'limited', name: '限定', emoji: '⭐' },
      { id: 'accessories', name: '配饰', emoji: '🎀' }
    ],
    
    // 商品列表
    products: [
      {
        id: '1',
        name: '喵咪水润面膜 🐱',
        description: '深层补水，让肌肤如小猫般柔软',
        points: 180,
        originalPrice: 89,
        image: 'https://images.unsplash.com/photo-1642177116193-c93e662f0924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwc2tpbmNhcmUlMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg4NzU4NTJ8MA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: true,
        rating: 4.8,
        soldCount: 2341,
        category: 'skincare'
      },
      {
        id: '2',
        name: '猫咪眼影盘 ✨',
        description: '12色猫咪主题，打造迷人猫眼妆',
        points: 350,
        originalPrice: 168,
        image: 'https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBjb3NtZXRpY3MlMjBtYWtldXB8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: false,
        rating: 4.9,
        soldCount: 1829,
        category: 'makeup'
      },
      {
        id: '3',
        name: '粉色猫爪护手霜 🐾',
        description: '可爱猫爪造型，滋润双手',
        points: 120,
        originalPrice: 58,
        image: 'https://images.unsplash.com/photo-1652500965593-58e2b71d3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY2F0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: false,
        rating: 4.7,
        soldCount: 3567,
        category: 'accessories'
      },
      {
        id: '4',
        name: '猫咪精华液礼盒 🎁',
        description: '三瓶装精华，全效护肤套装',
        points: 580,
        originalPrice: 299,
        image: 'https://images.unsplash.com/photo-1625141976586-ff3f03d2f4d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTg4NzU4NTN8MA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: true,
        rating: 4.9,
        soldCount: 967,
        category: 'skincare'
      },
      {
        id: '5',
        name: '猫面膜限定版 😸',
        description: '可爱猫咪图案，深层清洁毛孔',
        points: 200,
        originalPrice: 98,
        image: 'https://images.unsplash.com/photo-1658273842927-8563a8f5a052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBmYWNlJTIwbWFzayUyMGJlYXV0eXxlbnwxfHx8fDE3NTg4NzU4NTZ8MA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: true,
        rating: 4.8,
        soldCount: 1456,
        category: 'skincare'
      },
      {
        id: '6',
        name: '猫咪唇釉套装 💋',
        description: '六色猫咪系列，持久显色',
        points: 280,
        originalPrice: 138,
        image: 'https://images.unsplash.com/photo-1630573133526-8d090e0269af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwbHV4dXJ5JTIwY29zbWV0aWNzfGVufDF8fHx8MTc1ODg3NTg1Nnww&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: false,
        rating: 4.6,
        soldCount: 2134,
        category: 'makeup'
      },
      {
        id: '7',
        name: '猫咪化妆镜 🪞',
        description: 'LED补光，高清镜面',
        points: 450,
        originalPrice: 218,
        image: 'https://images.unsplash.com/photo-1652500965593-58e2b71d3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY2F0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: false,
        rating: 4.5,
        soldCount: 876,
        category: 'tools'
      },
      {
        id: '8',
        name: '猫耳发箍限定 🎀',
        description: '可爱猫耳造型，拍照必备',
        points: 88,
        originalPrice: 38,
        image: 'https://images.unsplash.com/photo-1652500965593-58e2b71d3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5rJTIwY2F0JTIwYWNjZXNzb3JpZXN8ZW58MXx8fHwxNzU4ODc1ODUzfDA&ixlib=rb-4.1.0&q=80&w=400',
        isLimited: true,
        rating: 4.9,
        soldCount: 4567,
        category: 'accessories'
      }
    ]
  },

  onLoad() {
    console.log('积分商城页面加载');
    this.filterProducts();
  },

  onShow() {
    console.log('积分商城页面显示');
    this.filterProducts();
  },

  // 过滤商品
  filterProducts() {
    const { activeCategory, products } = this.data;
    let filteredProducts;
    
    if (activeCategory === 'limited') {
      // 限定分类显示所有限定商品
      filteredProducts = products.filter(product => product.isLimited);
    } else {
      // 其他分类按category过滤
      filteredProducts = products.filter(product => product.category === activeCategory);
    }
    
    this.setData({ filteredProducts });
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/home/home' });
      }
    });
  },

  // 切换分类
  switchCategory(e: any) {
    const category = e.currentTarget.dataset.category;
    console.log('切换分类:', category);
    
    this.setData({
      activeCategory: category
    }, () => {
      this.filterProducts();
    });
  },

  // 兑换商品
  exchangeProduct(e: any) {
    const productId = e.currentTarget.dataset.productId;
    const product = this.data.products.find(p => p.id === productId);
    
    if (!product) return;
    
    // 检查积分是否足够
    if (this.data.userPoints < product.points) {
      wx.showModal({
        title: '积分不足',
        content: `兑换"${product.name}"需要${product.points}积分，您当前有${this.data.userPoints}积分`,
        showCancel: false,
        confirmText: '知道了'
      });
      return;
    }
    
    wx.showModal({
      title: '确认兑换',
      content: `确定要用${product.points}积分兑换"${product.name}"吗？`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定兑换',
      success: (res) => {
        if (res.confirm) {
          console.log('兑换商品:', product.name);
          
          // 扣除积分
          const newPoints = this.data.userPoints - product.points;
          const newCartCount = this.data.cartCount + 1;
          
          this.setData({
            userPoints: newPoints,
            cartCount: newCartCount
          });
          
          wx.showToast({
            title: '兑换成功',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },

  // 搜索功能
  onSearch() {
    console.log('搜索功能');
    wx.showToast({
      title: '搜索功能待实现',
      icon: 'none'
    });
  },

  // 查看购物车
  viewCart() {
    console.log('查看购物车');
    wx.showToast({
      title: '购物车功能待实现',
      icon: 'none'
    });
  },

  // 查看积分详情
  viewPointsDetail() {
    console.log('查看积分详情');
    wx.showToast({
      title: '积分详情待实现',
      icon: 'none'
    });
  },

  // 查看礼品功能
  viewGifts() {
    console.log('查看礼品功能');
    wx.showToast({
      title: '礼品功能待实现',
      icon: 'none'
    });
  }
});
