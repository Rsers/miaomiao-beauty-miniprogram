# 微信支付API调用指南

## 概述

本文档详细说明前端（微信小程序）如何调用微信支付相关的API接口，包括完整的代码示例和最佳实践。

## API接口列表

### 1. 微信登录认证
- **接口**: `POST /api/wechat/auth/openid`
- **功能**: 通过微信登录code获取用户openid
- **用途**: 用户身份认证，获取支付所需的openid

### 2. 创建支付订单
- **接口**: `POST /api/wechat/pay/create`
- **功能**: 创建微信支付订单
- **用途**: 生成支付参数，调用微信支付

### 3. 查询支付状态
- **接口**: `GET /api/wechat/pay/query/{out_trade_no}`
- **功能**: 查询订单支付状态
- **用途**: 确认支付结果

### 4. 获取用户订单
- **接口**: `GET /api/wechat/pay/orders/{openid}`
- **功能**: 获取用户的所有订单
- **用途**: 订单历史查询

### 5. 支付统计
- **接口**: `GET /api/wechat/pay/stats`
- **功能**: 获取支付统计信息
- **用途**: 管理员查看支付数据

## 完整调用流程

### 第一步：用户登录获取openid

```javascript
// 在页面加载时获取用户openid
Page({
  data: {
    openid: '',
    userInfo: null
  },

  onLoad: function() {
    this.getUserOpenid();
  },

  // 获取用户openid
  getUserOpenid: function() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 调用后端接口获取openid
          wx.request({
            url: 'https://www.gongjuxiang.work/api/wechat/auth/openid',
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: (authRes) => {
              if (authRes.data.success) {
                const openid = authRes.data.data.openid;
                this.setData({
                  openid: openid
                });
                // 保存到本地存储
                wx.setStorageSync('openid', openid);
                console.log('获取openid成功:', openid);
              } else {
                wx.showToast({
                  title: '登录失败',
                  icon: 'error'
                });
              }
            },
            fail: (err) => {
              console.error('获取openid失败:', err);
              wx.showToast({
                title: '网络错误',
                icon: 'error'
              });
            }
          });
        }
      }
    });
  }
});
```

### 第二步：创建支付订单

```javascript
// 创建支付订单
createPaymentOrder: function() {
  const openid = this.data.openid || wx.getStorageSync('openid');
  
  if (!openid) {
    wx.showToast({
      title: '请先登录',
      icon: 'error'
    });
    return;
  }

  wx.showLoading({
    title: '创建订单中...'
  });

  wx.request({
    url: 'https://www.gongjuxiang.work/api/wechat/pay/create',
    method: 'POST',
    header: {
      'Content-Type': 'application/json'
    },
    data: {
      openid: openid,
      total_fee: 100,  // 金额（分），这里表示1元
      body: '图片增强服务',
      attach: 'user_payment_' + Date.now()
    },
    success: (res) => {
      wx.hideLoading();
      
      if (res.data.success) {
        console.log('订单创建成功:', res.data.data);
        // 调用微信支付
        this.callWeChatPay(res.data.data.pay_params);
      } else {
        wx.showToast({
          title: res.data.error,
          icon: 'error'
        });
      }
    },
    fail: (err) => {
      wx.hideLoading();
      console.error('创建订单失败:', err);
      wx.showToast({
        title: '网络错误',
        icon: 'error'
      });
    }
  });
}
```

### 第三步：调用微信支付

```javascript
// 调用微信支付
callWeChatPay: function(payParams) {
  wx.requestPayment({
    timeStamp: payParams.timeStamp,
    nonceStr: payParams.nonceStr,
    package: payParams.package,
    signType: payParams.signType,
    paySign: payParams.paySign,
    success: (res) => {
      console.log('支付成功:', res);
      wx.showToast({
        title: '支付成功',
        icon: 'success'
      });
      
      // 支付成功后的处理
      this.onPaymentSuccess();
    },
    fail: (res) => {
      console.log('支付失败:', res);
      
      if (res.errMsg.includes('cancel')) {
        wx.showToast({
          title: '支付已取消',
          icon: 'none'
        });
      } else {
        wx.showToast({
          title: '支付失败',
          icon: 'error'
        });
      }
    }
  });
}
```

### 第四步：支付成功处理

```javascript
// 支付成功后的处理
onPaymentSuccess: function() {
  // 可以跳转到成功页面
  wx.navigateTo({
    url: '/pages/payment-success/payment-success'
  });
  
  // 或者刷新当前页面状态
  this.refreshPageData();
}
```

## 订单查询功能

### 查询特定订单状态

```javascript
// 查询订单支付状态
queryOrderStatus: function(outTradeNo) {
  wx.request({
    url: `https://www.gongjuxiang.work/api/wechat/pay/query/${outTradeNo}`,
    method: 'GET',
    success: (res) => {
      if (res.data.success) {
        const orderData = res.data.data;
        console.log('订单状态:', orderData.trade_state);
        
        // 根据状态更新UI
        switch(orderData.trade_state) {
          case 'SUCCESS':
            console.log('订单支付成功');
            break;
          case 'NOTPAY':
            console.log('订单未支付');
            break;
          case 'CLOSED':
            console.log('订单已关闭');
            break;
          default:
            console.log('订单状态:', orderData.trade_state);
        }
      } else {
        wx.showToast({
          title: res.data.error,
          icon: 'error'
        });
      }
    },
    fail: (err) => {
      console.error('查询订单失败:', err);
    }
  });
}
```

### 获取用户订单列表

```javascript
// 获取用户订单列表
getUserOrders: function() {
  const openid = this.data.openid || wx.getStorageSync('openid');
  
  if (!openid) {
    wx.showToast({
      title: '请先登录',
      icon: 'error'
    });
    return;
  }

  wx.request({
    url: `https://www.gongjuxiang.work/api/wechat/pay/orders/${openid}`,
    method: 'GET',
    success: (res) => {
      if (res.data.success) {
        const orders = res.data.data;
        console.log('用户订单列表:', orders);
        
        // 更新页面数据
        this.setData({
          orders: orders
        });
        
        // 显示订单列表
        this.displayOrders(orders);
      } else {
        wx.showToast({
          title: res.data.error,
          icon: 'error'
        });
      }
    },
    fail: (err) => {
      console.error('获取订单列表失败:', err);
    }
  });
}

// 显示订单列表
displayOrders: function(orders) {
  if (orders.length === 0) {
    wx.showToast({
      title: '暂无订单',
      icon: 'none'
    });
    return;
  }
  
  orders.forEach(order => {
    console.log(`订单: ${order.out_trade_no}`);
    console.log(`金额: ${order.total_fee}分`);
    console.log(`状态: ${order.status}`);
    console.log(`创建时间: ${order.create_time}`);
  });
}
```

## 完整的支付页面示例

```javascript
// pages/payment/payment.js
Page({
  data: {
    openid: '',
    amount: 100,  // 默认1元
    description: '图片增强服务',
    orders: []
  },

  onLoad: function(options) {
    // 获取传入的参数
    if (options.amount) {
      this.setData({
        amount: parseInt(options.amount)
      });
    }
    
    // 获取用户openid
    this.getUserOpenid();
  },

  // 获取用户openid
  getUserOpenid: function() {
    const cachedOpenid = wx.getStorageSync('openid');
    if (cachedOpenid) {
      this.setData({
        openid: cachedOpenid
      });
      return;
    }

    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: 'https://www.gongjuxiang.work/api/wechat/auth/openid',
            method: 'POST',
            header: {
              'Content-Type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: (authRes) => {
              if (authRes.data.success) {
                const openid = authRes.data.data.openid;
                this.setData({
                  openid: openid
                });
                wx.setStorageSync('openid', openid);
              }
            }
          });
        }
      }
    });
  },

  // 发起支付
  startPayment: function() {
    if (!this.data.openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      });
      return;
    }

    wx.showLoading({
      title: '创建订单中...'
    });

    wx.request({
      url: 'https://www.gongjuxiang.work/api/wechat/pay/create',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        openid: this.data.openid,
        total_fee: this.data.amount,
        body: this.data.description,
        attach: 'payment_page_' + Date.now()
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.data.success) {
          // 调用微信支付
          wx.requestPayment({
            timeStamp: res.data.data.pay_params.timeStamp,
            nonceStr: res.data.data.pay_params.nonceStr,
            package: res.data.data.pay_params.package,
            signType: res.data.data.pay_params.signType,
            paySign: res.data.data.pay_params.paySign,
            success: () => {
              wx.showToast({
                title: '支付成功',
                icon: 'success'
              });
              
              // 跳转到成功页面
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            },
            fail: (err) => {
              console.log('支付失败:', err);
              if (err.errMsg.includes('cancel')) {
                wx.showToast({
                  title: '支付已取消',
                  icon: 'none'
                });
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'error'
                });
              }
            }
          });
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'error'
          });
        }
      },
      fail: () => {
        wx.hideLoading();
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        });
      }
    });
  },

  // 查看订单历史
  viewOrderHistory: function() {
    wx.navigateTo({
      url: '/pages/order-history/order-history'
    });
  }
});
```

## 订单历史页面示例

```javascript
// pages/order-history/order-history.js
Page({
  data: {
    orders: [],
    loading: true
  },

  onLoad: function() {
    this.loadOrders();
  },

  // 加载订单列表
  loadOrders: function() {
    const openid = wx.getStorageSync('openid');
    
    if (!openid) {
      wx.showToast({
        title: '请先登录',
        icon: 'error'
      });
      wx.navigateBack();
      return;
    }

    wx.request({
      url: `https://www.gongjuxiang.work/api/wechat/pay/orders/${openid}`,
      method: 'GET',
      success: (res) => {
        this.setData({
          loading: false
        });
        
        if (res.data.success) {
          this.setData({
            orders: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.error,
            icon: 'error'
          });
        }
      },
      fail: () => {
        this.setData({
          loading: false
        });
        wx.showToast({
          title: '网络错误',
          icon: 'error'
        });
      }
    });
  },

  // 刷新订单列表
  refreshOrders: function() {
    this.setData({
      loading: true
    });
    this.loadOrders();
  }
});
```

## 对应的WXML页面结构

### 支付页面 (payment.wxml)

```xml
<view class="payment-container">
  <view class="payment-info">
    <text class="title">{{description}}</text>
    <text class="amount">¥{{amount / 100}}</text>
  </view>
  
  <button class="pay-button" bindtap="startPayment">
    立即支付
  </button>
  
  <button class="history-button" bindtap="viewOrderHistory">
    查看订单历史
  </button>
</view>
```

### 订单历史页面 (order-history.wxml)

```xml
<view class="order-history">
  <view class="header">
    <text class="title">订单历史</text>
    <button class="refresh-btn" bindtap="refreshOrders">刷新</button>
  </view>
  
  <view class="orders-list" wx:if="{{!loading}}">
    <view class="order-item" wx:for="{{orders}}" wx:key="out_trade_no">
      <view class="order-info">
        <text class="order-no">{{item.out_trade_no}}</text>
        <text class="order-desc">{{item.body}}</text>
        <text class="order-amount">¥{{item.total_fee / 100}}</text>
      </view>
      <view class="order-status">
        <text class="status {{item.status}}">{{item.status}}</text>
        <text class="order-time">{{item.create_time}}</text>
      </view>
    </view>
  </view>
  
  <view class="loading" wx:if="{{loading}}">
    <text>加载中...</text>
  </view>
  
  <view class="empty" wx:if="{{!loading && orders.length === 0}}">
    <text>暂无订单</text>
  </view>
</view>
```

## 错误处理最佳实践

### 1. 网络错误处理

```javascript
// 统一的网络请求错误处理
handleRequestError: function(err, defaultMessage = '网络错误') {
  console.error('请求失败:', err);
  
  if (err.errMsg) {
    if (err.errMsg.includes('timeout')) {
      wx.showToast({
        title: '请求超时',
        icon: 'error'
      });
    } else if (err.errMsg.includes('fail')) {
      wx.showToast({
        title: '网络连接失败',
        icon: 'error'
      });
    } else {
      wx.showToast({
        title: defaultMessage,
        icon: 'error'
      });
    }
  } else {
    wx.showToast({
      title: defaultMessage,
      icon: 'error'
    });
  }
}
```

### 2. 支付状态处理

```javascript
// 处理支付状态
handlePaymentStatus: function(status) {
  switch(status) {
    case 'PENDING':
      return '待支付';
    case 'PAID':
      return '已支付';
    case 'CANCELLED':
      return '已取消';
    case 'FAILED':
      return '支付失败';
    case 'REFUNDED':
      return '已退款';
    default:
      return '未知状态';
  }
}
```

## 安全注意事项

1. **openid保护**: 不要在前端暴露openid，应该存储在本地
2. **HTTPS**: 生产环境必须使用HTTPS
3. **参数验证**: 前端应该验证用户输入
4. **错误信息**: 不要向用户暴露敏感的错误信息

## 测试建议

1. **开发环境**: 使用微信开发者工具进行测试
2. **真机测试**: 在真实设备上测试支付流程
3. **网络测试**: 测试不同网络环境下的表现
4. **异常测试**: 测试网络中断、支付取消等异常情况

## 常见问题

### Q: openid获取失败怎么办？
A: 检查小程序配置，确保AppID和AppSecret正确，并且code没有过期。

### Q: 支付参数错误怎么办？
A: 检查后端返回的支付参数是否完整，确保所有必要字段都存在。

### Q: 支付回调没有收到怎么办？
A: 检查回调URL是否正确配置，确保服务器可以接收微信的回调请求。

### Q: 订单状态不同步怎么办？
A: 可以主动查询订单状态，或者实现轮询机制来同步状态。

---

**注意**: 本文档基于当前API接口编写，如有更新请及时同步修改。
