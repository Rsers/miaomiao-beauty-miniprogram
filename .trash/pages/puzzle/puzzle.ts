// 拼图协作页面逻辑
Page({
  data: {
    puzzleProgress: 67,
    isCompleted: false,
    
    // 拼图块数据
    puzzlePieces: [
      { id: 1, image: 'https://images.unsplash.com/photo-1589560535651-d2c358ae0641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcHV6emxlfGVufDF8fHx8MTc1ODgyNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小美' },
      { id: 2, image: 'https://images.unsplash.com/photo-1622641269217-954d3163a1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9yYWJsZSUyMGtpdHRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzU4ODI0OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小红' },
      { id: 3, image: 'https://images.unsplash.com/photo-1655992109610-297d3e6eb42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小丽' },
      { id: 4, image: 'https://images.unsplash.com/photo-1589560535651-d2c358ae0641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcHV6emxlfGVufDF8fHx8MTc1ODgyNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小美' },
      { id: 5, image: 'https://images.unsplash.com/photo-1622641269217-954d3163a1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9yYWJsZSUyMGtpdHRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHx8MTc1ODgyNDkzNnww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小红' },
      { id: 6, image: 'https://images.unsplash.com/photo-1655992109610-297d3e6eb42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: '小丽' },
      { id: 7, image: 'https://images.unsplash.com/photo-1589560535651-d2c358ae0641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcHV6emxlfGVufDF8fHx8MTc1ODgyNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: false, isCurrentlyBeingSolved: true },
      { id: 8, image: 'https://images.unsplash.com/photo-1622641269217-954d3163a1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9yYWJsZSUyMGtpdHRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHx8MTc1ODgyNDkzNnww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: false, isCurrentlyBeingSolved: false },
      { id: 9, image: 'https://images.unsplash.com/photo-1655992109610-297d3e6eb42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080', isCompleted: false, isCurrentlyBeingSolved: false }
    ],
    
    // 团队成员数据
    teamMembers: [
      {
        id: '1',
        name: '小美',
        avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'solving',
        statusText: '拼图中',
        piecesCompleted: 2
      },
      {
        id: '2',
        name: '小红',
        avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'online',
        statusText: '在线',
        piecesCompleted: 2
      },
      {
        id: '3',
        name: '小丽',
        avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'online',
        statusText: '在线',
        piecesCompleted: 2
      },
      {
        id: '4',
        name: '小雯',
        avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
        status: 'offline',
        statusText: '离线',
        piecesCompleted: 0,
        isInvited: true
      }
    ]
  },

  onLoad() {
    console.log('拼图协作页面加载');
    this.updateCompletionStatus();
  },

  onShow() {
    console.log('拼图协作页面显示');
  },

  onReady() {
    console.log('拼图协作页面渲染完成');
  },

  onUnload() {
    console.log('拼图协作页面卸载');
  },

  // 返回按钮
  goBack() {
    wx.navigateBack({
      success: () => {
        console.log('返回上一页');
      },
      fail: () => {
        // 如果无法返回，跳转到首页
        wx.redirectTo({
          url: '/pages/home/home'
        });
      }
    });
  },

  // 更多按钮
  onMoreTap() {
    console.log('更多按钮点击');
    wx.showActionSheet({
      itemList: ['拼图设置', '团队管理', '历史记录', '帮助'],
      success: (res) => {
        const actions = ['拼图设置', '团队管理', '历史记录', '帮助'];
        wx.showToast({
          title: `${actions[res.tapIndex]}功能开发中`,
          icon: 'none'
        });
      }
    });
  },

  // 拼图块点击
  onPuzzlePieceTap(e: any) {
    const piece = e.currentTarget.dataset.piece;
    console.log('点击拼图块:', piece);
    
    if (piece.isCompleted) {
      wx.showToast({
        title: `此块由${piece.solvedBy}完成`,
        icon: 'none'
      });
    } else if (piece.isCurrentlyBeingSolved) {
      wx.showToast({
        title: '此块正在拼图中',
        icon: 'none'
      });
    } else {
      // 开始拼图
      wx.showModal({
        title: '开始拼图',
        content: '确定要开始拼这块拼图吗？',
        confirmText: '开始拼图',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.startPuzzlePiece(piece.id);
          }
        }
      });
    }
  },

  // 开始拼图块
  startPuzzlePiece(pieceId: number) {
    console.log('开始拼图块:', pieceId);
    
    wx.showLoading({
      title: '拼图中...'
    });
    
    // 模拟拼图过程
    setTimeout(() => {
      wx.hideLoading();
      
      // 更新拼图状态
      const pieces = this.data.puzzlePieces;
      const pieceIndex = pieces.findIndex(p => p.id === pieceId);
      
      if (pieceIndex !== -1) {
        pieces[pieceIndex].isCompleted = true;
        pieces[pieceIndex].isCurrentlyBeingSolved = false;
        pieces[pieceIndex].solvedBy = '我';
        
        this.setData({
          puzzlePieces: pieces
        });
        
        // 更新进度
        this.updateProgress();
        
        wx.showToast({
          title: '拼图完成！',
          icon: 'success'
        });
      }
    }, 2000);
  },

  // 更新进度
  updateProgress() {
    const pieces = this.data.puzzlePieces;
    const completedCount = pieces.filter(p => p.isCompleted).length;
    const totalCount = pieces.length;
    const progress = Math.round((completedCount / totalCount) * 100);
    
    this.setData({
      puzzleProgress: progress
    });
    
    this.updateCompletionStatus();
  },

  // 更新完成状态
  updateCompletionStatus() {
    const isCompleted = this.data.puzzleProgress === 100;
    this.setData({
      isCompleted: isCompleted
    });
    
    if (isCompleted) {
      wx.showToast({
        title: '🎉 拼图完成！',
        icon: 'success',
        duration: 2000
      });
    }
  },

  // 团队成员点击
  onMemberTap(e: any) {
    const member = e.currentTarget.dataset.member;
    console.log('点击团队成员:', member);
    
    if (member.isInvited) {
      wx.showToast({
        title: '邀请已发送',
        icon: 'none'
      });
    } else {
      wx.showModal({
        title: '团队成员',
        content: `${member.name} - ${member.statusText}`,
        confirmText: '发送消息',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '发送消息功能开发中',
              icon: 'none'
            });
          }
        }
      });
    }
  },

  // 邀请好友
  onInviteFriends() {
    console.log('邀请好友');
    
    wx.showModal({
      title: '邀请好友',
      content: '是否邀请更多好友一起拼图？',
      confirmText: '邀请',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 显示分享菜单
          wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
          });
          
          wx.showToast({
            title: '邀请链接已复制',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享到微信
  onShareToWeChat() {
    console.log('分享到微信');
    
    if (!this.data.isCompleted) {
      wx.showToast({
        title: '请先完成拼图',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '分享到微信',
      content: '是否分享拼图成果到微信朋友圈？',
      confirmText: '分享',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '分享成功！',
            icon: 'success'
          });
        }
      }
    });
  },

  // 导出视频
  onExportVideo() {
    console.log('导出视频');
    
    if (!this.data.isCompleted) {
      wx.showToast({
        title: '请先完成拼图',
        icon: 'none'
      });
      return;
    }
    
    wx.showModal({
      title: '导出视频',
      content: '是否导出拼图动画视频？',
      confirmText: '导出',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '生成视频中...'
          });
          
          // 模拟视频生成
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '视频已保存到相册',
              icon: 'success'
            });
          }, 3000);
        }
      }
    });
  },

  // 演示完成拼图
  onCompletePuzzle() {
    console.log('演示完成拼图');
    
    wx.showModal({
      title: '演示完成',
      content: '是否演示完成整个拼图？',
      confirmText: '演示',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          wx.showLoading({
            title: '演示中...'
          });
          
          // 模拟完成过程
          setTimeout(() => {
            const pieces = this.data.puzzlePieces;
            pieces.forEach(piece => {
              if (!piece.isCompleted) {
                piece.isCompleted = true;
                piece.isCurrentlyBeingSolved = false;
                piece.solvedBy = '演示';
              }
            });
            
            this.setData({
              puzzlePieces: pieces,
              puzzleProgress: 100
            });
            
            this.updateCompletionStatus();
            
            wx.hideLoading();
            wx.showToast({
              title: '🎉 拼图完成！',
              icon: 'success',
              duration: 2000
            });
          }, 2000);
        }
      }
    });
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '喵喵拼图 - 和闺蜜一起拼图吧！',
      path: '/pages/puzzle/puzzle',
      imageUrl: '' // 可以设置分享图片
    };
  },

  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '和闺蜜一起完成了可爱的猫咪拼图！',
      imageUrl: '' // 可以设置分享图片
    };
  }
});
