import { Crown, Gem, Award, Star } from 'lucide-react';

export function MembershipCard() {
  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-pink-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-800">会员等级</h3>
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full">
          <span className="text-white text-sm font-medium">至尊VIP</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
          <Crown className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-gray-800 font-medium">至尊猫咪会员</p>
          <p className="text-gray-500 text-sm">享受专属特权和服务</p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">会员经验值</span>
          <span className="text-pink-500 font-medium">8,500 / 10,000</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{width: '85%'}}></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">还需1,500经验值升级到钻石会员</p>
      </div>
      
      {/* Cat badges */}
      <div className="grid grid-cols-4 gap-3">
        <div className="text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center mb-1">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-xs text-gray-600">美颜猫</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center mb-1">
            <Gem className="w-5 h-5 text-pink-500" />
          </div>
          <p className="text-xs text-gray-600">钻石猫</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center mb-1">
            <Crown className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-xs text-gray-600">皇冠猫</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-1">
            <Award className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-xs text-gray-600">荣誉猫</p>
        </div>
      </div>
    </div>
  );
}