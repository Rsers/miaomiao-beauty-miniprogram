import { Gift, Crown, Star, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VipGiftCards() {
  const giftCards = [
    {
      id: 1,
      title: 'VIP月卡',
      subtitle: '可转赠好友',
      value: '88元',
      originalPrice: '128元',
      features: ['高级滤镜', '专属贴纸', '无限使用'],
      icon: Crown,
      gradient: 'from-purple-400 to-pink-400',
      available: 2
    },
    {
      id: 2,
      title: 'VIP年卡',
      subtitle: '超值大礼包',
      value: '888元',
      originalPrice: '1288元',
      features: ['全功能解锁', '独家内容', '优先客服'],
      icon: Star,
      gradient: 'from-yellow-400 to-orange-400',
      available: 1
    }
  ];

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <Gift className="w-5 h-5 text-pink-500" />
        <h3 className="text-pink-600">VIP礼品卡</h3>
        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">可转赠</span>
      </div>
      
      <div className="space-y-3">
        {giftCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-gray-900">{card.title}</h4>
                    <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full">
                      x{card.available}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{card.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg text-pink-600">{card.value}</span>
                    <span className="text-xs text-gray-400 line-through">{card.originalPrice}</span>
                  </div>
                </div>
              </div>
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs px-4"
              >
                转赠
              </Button>
            </div>
            
            <div className="flex gap-2 mt-3">
              {card.features.map((feature, index) => (
                <span key={index} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}