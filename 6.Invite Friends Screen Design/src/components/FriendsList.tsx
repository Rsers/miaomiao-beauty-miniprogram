import { ImageWithFallback } from './figma/ImageWithFallback'
import { Button } from './ui/button'
import { Crown, Gift } from 'lucide-react'

const friends = [
  {
    id: 1,
    name: '小雨',
    avatar: 'https://images.unsplash.com/photo-1651346158507-a2810590687f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwYmVhdXRpZnVsfGVufDF8fHx8MTc1ODg3NDgwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVip: false,
    status: 'online'
  },
  {
    id: 2,
    name: '美美',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhbiUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODc0ODA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVip: true,
    status: 'online'
  },
  {
    id: 3,
    name: '甜甜',
    avatar: 'https://images.unsplash.com/photo-1651346158507-a2810590687f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwYXZhdGFyJTIwYmVhdXRpZnVsfGVufDF8fHx8MTc1ODg3NDgwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    isVip: false,
    status: 'offline'
  }
]

export function FriendsList() {
  return (
    <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-800 font-medium">选择好友赠送VIP</h3>
        <span className="text-gray-500 text-sm">3/{friends.length}</span>
      </div>
      
      <div className="space-y-3">
        {friends.map((friend) => (
          <div key={friend.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ImageWithFallback 
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {friend.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                )}
                {friend.isVip && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-800 font-medium">{friend.name}</p>
                <p className="text-gray-500 text-sm">
                  {friend.isVip ? 'VIP会员' : '普通用户'}
                </p>
              </div>
            </div>
            
            <Button 
              size="sm" 
              className={`${
                friend.isVip 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
              }`}
              disabled={friend.isVip}
            >
              {friend.isVip ? '已是VIP' : '转赠'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}