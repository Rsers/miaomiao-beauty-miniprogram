import { Coins, UserPlus, Trophy, TrendingUp } from 'lucide-react';

export function StatsCard() {
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-pink-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">我的数据</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Points */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Coins className="w-4 h-4 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-yellow-800 mb-1">2,580</p>
          <p className="text-yellow-700 text-sm">猫币余额</p>
        </div>
        
        {/* Invites */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-pink-600" />
          </div>
          <p className="text-2xl font-bold text-pink-800 mb-1">12</p>
          <p className="text-pink-700 text-sm">邀请好友</p>
        </div>
        
        {/* Achievements */}
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-800 mb-1">28</p>
          <p className="text-purple-700 text-sm">成就徽章</p>
        </div>
        
        {/* Level */}
        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">85</span>
            </div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-800 mb-1">Lv.85</p>
          <p className="text-green-700 text-sm">当前等级</p>
        </div>
      </div>
    </div>
  );
}