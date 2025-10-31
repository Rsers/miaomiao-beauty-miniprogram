import React, { useState, useEffect } from 'react';
import { Crown, Clock, Zap } from 'lucide-react';
import { Button } from './ui/button';

export function PurchaseButton() {
  const [timeLeft, setTimeLeft] = useState(3543); // seconds
  const [remainingUses, setRemainingUses] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 shadow-lg border border-orange-200">
      {/* Header with urgency */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-orange-500" />
          <span className="text-lg font-medium text-gray-800">VIP特权</span>
        </div>
        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs animate-pulse">
          限时优惠
        </div>
      </div>

      {/* Remaining uses warning */}
      <div className="bg-gradient-to-r from-red-400 to-orange-500 rounded-2xl p-4 mb-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">免费次数即将用完</p>
            <p className="text-xl font-bold">仅剩 {remainingUses} 次</p>
          </div>
          <div className="text-3xl animate-bounce">
            ⚠️
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-orange-500" />
        <span className="text-sm text-gray-600">优惠倒计时:</span>
        <span className="text-lg font-mono font-bold text-red-500">{formatTime(timeLeft)}</span>
      </div>

      {/* Price comparison */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 line-through">原价: ¥99</span>
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">7折</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-red-500">¥69</span>
          <span className="text-sm text-gray-500">/月</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">无限次数 + 专属滤镜</p>
      </div>

      {/* Purchase button */}
      <Button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-2xl py-4 shadow-lg transform hover:scale-105 transition-transform">
        <Zap className="w-5 h-5 mr-2" />
        立即购买VIP (限时7折)
      </Button>

      {/* Cat paw decoration */}
      <div className="flex justify-center mt-2 opacity-60">
        <span className="text-orange-300">🐾</span>
      </div>
    </div>
  );
}