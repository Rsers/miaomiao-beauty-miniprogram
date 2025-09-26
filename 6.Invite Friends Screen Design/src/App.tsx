import { ArrowLeft, Settings } from 'lucide-react'
import { VipTransferCard } from './components/VipTransferCard'
import { FriendsList } from './components/FriendsList'
import { RewardLadder } from './components/RewardLadder'
import { SocialSharing } from './components/SocialSharing'
import { AchievementTracker } from './components/AchievementTracker'
import { Button } from './components/ui/button'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-violet-100">
      {/* Mobile container */}
      <div className="max-w-[375px] mx-auto min-h-screen bg-gradient-to-br from-pink-200/50 via-purple-100/50 to-violet-200/50">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 pt-12 pb-6 px-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-white text-xl font-medium">邀请好友</h1>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <Settings className="w-6 h-6" />
            </Button>
          </div>
          
          {/* Cat mascot area */}
          <div className="text-center text-white mb-4">
            <div className="text-4xl mb-2">🐱</div>
            <p className="text-white/90 text-sm">
              分享喵喵美颜，一起变美吧！
            </p>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-4 py-6 space-y-6">
          {/* VIP Transfer Card */}
          <VipTransferCard />
          
          {/* Friends List */}
          <FriendsList />
          
          {/* Reward Ladder */}
          <RewardLadder />
          
          {/* Social Sharing */}
          <SocialSharing />
          
          {/* Achievement Tracker */}
          <AchievementTracker />
        </div>
        
        {/* Bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[375px] mx-auto bg-white p-4 border-t border-gray-200">
          <Button className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-violet-700 text-white hover:from-pink-600 hover:via-purple-700 hover:to-violet-800 h-12 rounded-xl">
            立即邀请好友
          </Button>
        </div>
      </div>
    </div>
  )
}