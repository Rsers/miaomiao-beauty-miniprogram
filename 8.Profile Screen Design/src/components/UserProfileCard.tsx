import { ImageWithFallback } from './figma/ImageWithFallback';
import { Crown, Star } from 'lucide-react';

export function UserProfileCard() {
  return (
    <div className="relative bg-gradient-to-br from-pink-400 via-pink-500 to-purple-600 rounded-3xl p-6 mb-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      
      <div className="relative z-10 flex items-center space-x-4">
        {/* Cat-themed avatar frame */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 p-1 shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1710997740246-75b30937dd6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU4ODAxMzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="用户头像"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* VIP crown */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 shadow-md">
            <Crown className="w-4 h-4 text-yellow-800" />
          </div>
        </div>
        
        <div className="flex-1 text-white">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-medium">小猫咪</h2>
            <div className="bg-yellow-400 px-2 py-1 rounded-full">
              <span className="text-yellow-800 text-xs font-medium">VIP</span>
            </div>
          </div>
          <p className="text-pink-100 text-sm mt-1">猫咪美颜达人 · ID: 888888</p>
          <div className="flex items-center space-x-1 mt-2">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-pink-100 text-sm ml-2">猫咪五星用户</span>
          </div>
        </div>
      </div>
    </div>
  );
}