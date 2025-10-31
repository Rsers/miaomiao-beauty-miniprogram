import { UserPlus, CreditCard, TrendingUp, CheckCircle } from 'lucide-react';
import { Badge } from './ui/badge';

export function RewardTiers() {
  const rewards = [
    {
      id: 1,
      icon: UserPlus,
      title: '注册奖励',
      description: '好友完成注册即可获得',
      reward: '¥8',
      color: 'bg-blue-500',
      completed: 8,
      total: 12
    },
    {
      id: 2,
      icon: CreditCard,
      title: '首次付费',
      description: '好友首次购买VIP会员',
      reward: '¥88',
      color: 'bg-green-500',
      completed: 5,
      total: 8
    },
    {
      id: 3,
      icon: TrendingUp,
      title: '推广达人',
      description: '成功邀请10人可获得',
      reward: '¥188',
      color: 'bg-purple-500',
      completed: 1,
      total: 1,
      isAchieved: true
    }
  ];

  return (
    <div className="mx-4 mt-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-pink-500" />
        <h3 className="text-pink-600">奖励等级</h3>
      </div>
      
      <div className="space-y-3">
        {rewards.map((reward) => (
          <div key={reward.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 relative overflow-hidden">
            {reward.isAchieved && (
              <div className="absolute top-0 right-0">
                <div className="bg-gradient-to-l from-yellow-400 to-yellow-500 text-white text-xs px-3 py-1 rounded-bl-xl">
                  已达成
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${reward.color} rounded-xl flex items-center justify-center`}>
                  <reward.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-gray-900">{reward.title}</h4>
                    {reward.isAchieved && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{reward.description}</p>
                  
                  {/* Progress bar */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${reward.isAchieved ? 'bg-green-500' : 'bg-pink-400'}`}
                        style={{ width: `${(reward.completed / reward.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {reward.completed}/{reward.total}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg text-pink-600">{reward.reward}</div>
                {reward.isAchieved && (
                  <Badge variant="secondary" className="text-xs mt-1 bg-green-100 text-green-600">
                    已获得
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}