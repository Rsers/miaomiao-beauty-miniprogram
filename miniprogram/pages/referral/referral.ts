// 推荐奖励页面逻辑

Page({
  data: {
    // 猫咪吉祥物图片
    catMascotImage: 'https://images.unsplash.com/photo-1716045168176-15d310a01dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjdXRlJTIwcGluayUyMGNhdCUyMGNhcnRvb24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzU4ODI1MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    
    // 邀请码
    inviteCode: 'MEOW8888',
    
    // VIP礼品卡数据
    giftCards: [
      {
        id: 1,
        title: 'VIP月卡',
        subtitle: '可转赠好友',
        value: '88元',
        originalPrice: '128元',
        features: ['高级滤镜', '专属贴纸', '无限使用'],
        icon: '👑',
        gradientClass: 'purple-gradient',
        available: 2
      },
      {
        id: 2,
        title: 'VIP年卡',
        subtitle: '超值大礼包',
        value: '888元',
        originalPrice: '1288元',
        features: ['全功能解锁', '独家内容', '优先客服'],
        icon: '⭐',
        gradientClass: 'yellow-gradient',
        available: 1
      }
    ],
    
    // 奖励等级数据
    rewardTiers: [
      {
        id: 1,
        icon: '👥',
        title: '注册奖励',
        description: '好友完成注册即可获得',
        reward: '¥8',
        colorClass: 'blue',
        completed: 8,
        total: 12,
        progress: 67,
        isAchieved: false
      },
      {
        id: 2,
        icon: '💳',
        title: '首次付费',
        description: '好友首次购买VIP会员',
        reward: '¥88',
        colorClass: 'green',
        completed: 5,
        total: 8,
        progress: 63,
        isAchieved: false
      },
      {
        id: 3,
        icon: '📈',
        title: '推广达人',
        description: '成功邀请10人可获得',
        reward: '¥188',
        colorClass: 'purple',
        completed: 1,
        total: 1,
        progress: 100,
        isAchieved: true
      }
    ],
    
    // 用户评价数据
    testimonials: [
      {
        id: 1,
        name: '小美喵',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
        text: '通过邀请朋友已经赚了2000多元！',
        earnings: '¥2,156',
        stars: [1, 2, 3, 4, 5]
      },
      {
        id: 2,
        name: '美颜达人',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
        text: '朋友们都很喜欢这个APP，推广很容易',
        earnings: '¥1,888',
        stars: [1, 2, 3, 4, 5]
      }
    ],
    
    // 成就统计数据
    achievements: [
      {
        icon: '⭐',
        value: '98%',
        label: '5星好评'
      },
      {
        icon: '💖',
        value: '99%',
        label: '用户满意度'
      },
      {
        icon: '📈',
        value: '95%',
        label: '推荐率'
      }
    ]
  },

  onLoad() {
    console.log('推荐奖励页面加载');
  },

  onShow() {
    console.log('推荐奖励页面显示');
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack({
      fail: () => {
        wx.redirectTo({ url: '/pages/home/home' });
      }
    });
  },

  // 复制邀请码
  copyInviteCode() {
    const { inviteCode } = this.data;
    
    wx.setClipboardData({
      data: inviteCode,
      success: () => {
        wx.showToast({
          title: '邀请码已复制',
          icon: 'success',
          duration: 2000
        });
        console.log('邀请码复制成功:', inviteCode);
      },
      fail: (err) => {
        console.error('复制邀请码失败:', err);
        wx.showToast({
          title: '复制失败',
          icon: 'error'
        });
      }
    });
  },

  // 分享邀请码
  shareInviteCode() {
    const { inviteCode } = this.data;
    
    // 在微信小程序中，分享功能由右上角菜单或button的open-type="share"触发
    // 这里显示分享提示
    wx.showModal({
      title: '分享邀请码',
      content: `邀请码：${inviteCode}\n\n快来使用我的邀请码加入喵喵美颜，一起变美！`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '复制',
      success: (res) => {
        if (res.confirm) {
          this.copyInviteCode();
        }
      }
    });
  },

  // 转赠礼品卡
  transferGiftCard(e: any) {
    const cardId = e.currentTarget.dataset.cardId;
    const giftCard = this.data.giftCards.find(card => card.id === cardId);
    
    if (!giftCard) return;
    
    wx.showModal({
      title: '转赠礼品卡',
      content: `确定要转赠"${giftCard.title}"给好友吗？`,
      showCancel: true,
      cancelText: '取消',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          console.log('转赠礼品卡:', giftCard);
          wx.showToast({
            title: '转赠功能待实现',
            icon: 'none'
          });
        }
      }
    });
  },

  // 查看奖励详情
  viewRewardDetail(e: any) {
    const rewardId = e.currentTarget.dataset.rewardId;
    const reward = this.data.rewardTiers.find(tier => tier.id === rewardId);
    
    if (!reward) return;
    
    wx.showModal({
      title: reward.title,
      content: `${reward.description}\n\n奖励金额：${reward.reward}\n完成进度：${reward.completed}/${reward.total}`,
      showCancel: false,
      confirmText: '知道了'
    });
  },

  // 查看用户评价详情
  viewTestimonialDetail(e: any) {
    const testimonialId = e.currentTarget.dataset.testimonialId;
    const testimonial = this.data.testimonials.find(t => t.id === testimonialId);
    
    if (!testimonial) return;
    
    wx.showModal({
      title: `${testimonial.name}的评价`,
      content: testimonial.text,
      showCancel: false,
      confirmText: '知道了'
    });
  }
});
