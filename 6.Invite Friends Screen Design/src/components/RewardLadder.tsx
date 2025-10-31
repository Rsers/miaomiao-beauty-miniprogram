import { Gift, Star, Trophy, Crown } from 'lucide-react'
import { Progress } from './ui/progress'

const rewards = [
  {
    id: 1,
    title: '邀请1位好友',
    reward: '专属滤镜包',
    icon: Star,
    completed: true,
    current: true
  },
  {
    id: 2,
    title: '邀请3位好友',
    reward: '限定猫咪贴纸',
    icon: Gift,
    completed: true,
    current: false
  },
  {
    id: 3,
    title: '邀请5位好友',
    reward: '高级美颜功能',
    icon: Trophy,
    completed: false,
    current: false
  },
  {
    id: 4,
    title: '邀请10位好友',
    reward: '终身VIP会员',
    icon: Crown,
    completed: false,
    current: false
  }
]

export function RewardLadder() {
  const completedCount = rewards.filter(r => r.completed).length
  const progress = (completedCount / rewards.length) * 100

  return (
    <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-800 font-medium">邀请奖励阶梯</h3>
          <span className="text-purple-600 text-sm font-medium">
            {completedCount}/{rewards.length}
          </span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>
      
      <div className="space-y-3">
        {rewards.map((reward, index) => {
          const IconComponent = reward.icon
          return (
            <div 
              key={reward.id} 
              className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-200 ${
                reward.completed 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                  : reward.current
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                reward.completed 
                  ? 'bg-green-500 text-white' 
                  : reward.current
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <div className="flex-1">
                <p className={`font-medium ${
                  reward.completed ? 'text-green-700' : 'text-gray-800'
                }`}>
                  {reward.title}
                </p>
                <p className={`text-sm ${
                  reward.completed ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {reward.reward}
                </p>
              </div>
              
              {reward.completed && (
                <div className="text-green-500">
                  <Star className="w-5 h-5 fill-current" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}