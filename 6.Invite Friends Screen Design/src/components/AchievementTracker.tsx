import { Badge, Trophy, Users, Heart, Sparkles } from 'lucide-react'

const achievements = [
  {
    id: 1,
    title: '邀请达人',
    description: '成功邀请5位好友',
    icon: Users,
    unlocked: true,
    progress: '5/5'
  },
  {
    id: 2,
    title: '人气王',
    description: '获得100个赞',
    icon: Heart,
    unlocked: true,
    progress: '100/100'
  },
  {
    id: 3,
    title: '美颜专家',
    description: '使用高级滤镜30次',
    icon: Sparkles,
    unlocked: false,
    progress: '23/30'
  },
  {
    id: 4,
    title: '社交之星',
    description: '分享作品50次',
    icon: Trophy,
    unlocked: false,
    progress: '12/50'
  }
]

export function AchievementTracker() {
  const unlockedCount = achievements.filter(a => a.unlocked).length

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Badge className="w-5 h-5 text-purple-600" />
          <h3 className="text-gray-800 font-medium">成就徽章</h3>
        </div>
        <span className="text-purple-600 text-sm font-medium">
          {unlockedCount}/{achievements.length}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon
          return (
            <div 
              key={achievement.id}
              className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                achievement.unlocked
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              <h4 className={`text-sm font-medium mb-1 ${
                achievement.unlocked ? 'text-purple-700' : 'text-gray-600'
              }`}>
                {achievement.title}
              </h4>
              
              <p className="text-xs text-gray-500 mb-2">
                {achievement.description}
              </p>
              
              <div className={`text-xs font-medium ${
                achievement.unlocked ? 'text-purple-600' : 'text-gray-500'
              }`}>
                {achievement.progress}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}