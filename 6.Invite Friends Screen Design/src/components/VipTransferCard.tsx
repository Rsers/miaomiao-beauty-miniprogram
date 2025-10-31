import { ImageWithFallback } from './figma/ImageWithFallback'
import { Gift, Sparkles } from 'lucide-react'

export function VipTransferCard() {
  return (
    <div className="relative bg-gradient-to-br from-pink-400 via-purple-500 to-violet-600 rounded-3xl p-6 mb-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
      <div className="absolute top-4 right-4 opacity-30">
        <Sparkles className="w-8 h-8 text-white" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg font-medium">VIP转赠卡</h3>
              <p className="text-white/80 text-sm">专属特权分享</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white text-2xl font-bold">3</div>
            <div className="text-white/80 text-xs">个名额</div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-2">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1555595925-69049e7b7682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwZ2lmdCUyMGNhcmQlMjBsdXh1cnl8ZW58MXx8fHwxNzU4ODc0ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cat gift"
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
            />
          </div>
          <p className="text-white text-center text-lg font-medium mb-1">
            我有 <span className="text-yellow-200">3个</span> VIP名额
          </p>
          <p className="text-white/70 text-center text-sm">
            只能转赠，不能自用
          </p>
        </div>
      </div>
    </div>
  )
}