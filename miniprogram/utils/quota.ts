/**
 * 额度管理工具（纯前端控制）
 * 
 * 规则：
 * - 每日基础额度：20 次
 * - 超过 20 次：友好提示，不强制阻止
 * - 分享奖励：分享者和被分享者各 +10 次
 * - 每日 0 点自动重置
 */

interface QuotaData {
  date: string;      // 日期标识
  used: number;      // 已使用次数
  bonus: number;     // 额外获得次数
}

class QuotaManager {
  private STORAGE_KEY = 'quota_data';
  private BASE_QUOTA = 20;  // 基础额度

  /**
   * 获取今日额度数据
   */
  private getTodayData(): QuotaData {
    const today = this.getToday();
    const stored = wx.getStorageSync(this.STORAGE_KEY);

    // 如果是新的一天或没有数据，初始化
    if (!stored || stored.date !== today) {
      const newData: QuotaData = {
        date: today,
        used: 0,
        bonus: 0
      };
      wx.setStorageSync(this.STORAGE_KEY, newData);
      return newData;
    }

    return stored;
  }

  /**
   * 获取今日日期标识（YYYY-MM-DD）
   */
  private getToday(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * 使用一次额度
   * @returns true=继续使用, false=提示用户
   */
  useQuota(): boolean {
    const data = this.getTodayData();
    const remainingBefore = this.getRemaining(); // 使用前的剩余额度

    // 记录使用次数
    data.used++;
    wx.setStorageSync(this.STORAGE_KEY, data);

    // 如果使用前剩余额度 <= 10，每次都提示（提醒用户分享）
    if (remainingBefore <= 10) {
      return false;
    }

    // 如果刚好用完基础额度（used 刚好等于 20），也提示
    if (data.used === this.BASE_QUOTA) {
      return false;
    }

    return true;
  }

  /**
   * 分享奖励（给分享者）
   * 每次分享立即 +10 次
   */
  shareReward(): void {
    const data = this.getTodayData();
    data.bonus += 10;
    wx.setStorageSync(this.STORAGE_KEY, data);
    console.log('分享奖励：+10 次额度');
  }

  /**
   * 被分享奖励（给被分享者）
   * 通过分享进入 +10 次
   */
  inviteReward(): void {
    const data = this.getTodayData();
    data.bonus += 10;
    wx.setStorageSync(this.STORAGE_KEY, data);
    console.log('邀请奖励：+10 次额度');
  }

  /**
   * 获取剩余额度
   */
  getRemaining(): number {
    const data = this.getTodayData();
    return this.BASE_QUOTA + data.bonus - data.used;
  }

  /**
   * 获取已使用次数
   */
  getUsed(): number {
    const data = this.getTodayData();
    return data.used;
  }

  /**
   * 获取总额度（基础 + 奖励）
   */
  getTotal(): number {
    const data = this.getTodayData();
    return this.BASE_QUOTA + data.bonus;
  }

  /**
   * 获取额外获得的额度
   */
  getBonus(): number {
    const data = this.getTodayData();
    return data.bonus;
  }

  /**
   * 撤销一次使用（处理失败时调用）
   */
  refundQuota(): void {
    const data = this.getTodayData();
    if (data.used > 0) {
      data.used--;
      wx.setStorageSync(this.STORAGE_KEY, data);
      console.log('退还额度：-1 次使用');
    }
  }
}

// 导出单例
export default new QuotaManager();

