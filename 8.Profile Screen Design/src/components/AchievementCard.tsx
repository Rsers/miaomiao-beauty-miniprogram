import { Trophy, Star, Heart, Crown, Gem, Award } from 'lucide-react';

export function AchievementCard() {
  const achievements = [
    { icon: Crown, label: '美颜女王', description: '连续30天使用美颜功能', color: 'text-yellow-500 bg-yellow-100', earned: true },
    { icon: Star, label: '每日之星', description: '获得100个赞', color: 'text-blue-500 bg-blue-100', earned: true },
    { icon: Heart, label: '人气猫咪', description: '获得1000个喜欢', color: 'text-red-500 bg-red-100', earned: true },
    { icon: Gem, label: '钻石达人', description: '购买钻石会员', color: 'text-purple-500 bg-purple-100', earned: false },
    { icon: Trophy, label: '分享达人', description: '分享作品超过50次', color: 'text-orange-500 bg-orange-100', earned: true },
    { icon: Award, label: '创作先锋', description: '原创作品超过100个', color: 'text-green-500 bg-green-100', earned: false },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-pink-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">成就展示</h3>
        <div className="flex items-center space-x-1">
          <Trophy className="w-4 h-4 text-yellow-500" />
          <span className="text-sm text-gray-600">28/50</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, index) => (
          <div key={index} className={`text-center p-3 rounded-xl border-2 ${
            achievement.earned 
              ? 'border-pink-200 bg-pink-50' 
              : 'border-gray-200 bg-gray-50 opacity-60'
          }`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 mx-auto ${achievement.color}`}>
              <achievement.icon className="w-5 h-5" />
            </div>
            <p className={`text-xs font-medium mb-1 ${
              achievement.earned ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {achievement.label}
            </p>
            <p className={`text-xs leading-tight ${
              achievement.earned ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {achievement.description}
            </p>
            {achievement.earned && (
              <div className="mt-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
        <p className="text-sm text-center text-gray-700">
          再获得 <span className="text-pink-600 font-medium">22个成就</span> 即可解锁专属头像框
        </p>
      </div>
    </div>
  );
}