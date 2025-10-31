import { Share2, MessageCircle, Users, Copy } from 'lucide-react'
import { Button } from './ui/button'

const socialOptions = [
  {
    id: 'wechat',
    name: '微信好友',
    icon: MessageCircle,
    color: 'bg-green-500 hover:bg-green-600'
  },
  {
    id: 'moments',
    name: '朋友圈',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  {
    id: 'copy',
    name: '复制链接',
    icon: Copy,
    color: 'bg-gray-500 hover:bg-gray-600'
  }
]

export function SocialSharing() {
  return (
    <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Share2 className="w-5 h-5 text-purple-600" />
        <h3 className="text-gray-800 font-medium">分享邀请链接</h3>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4 border border-purple-100">
        <p className="text-gray-700 text-sm mb-2">
          🎁 快来加入喵喵美颜，一起变美吧！
        </p>
        <p className="text-purple-600 text-sm font-medium">
          邀请码：MEOW2024
        </p>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {socialOptions.map((option) => {
          const IconComponent = option.icon
          return (
            <Button
              key={option.id}
              variant="outline"
              className={`flex flex-col items-center space-y-2 p-4 h-auto ${option.color} text-white border-none hover:scale-105 transition-transform`}
            >
              <IconComponent className="w-6 h-6" />
              <span className="text-xs">{option.name}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}