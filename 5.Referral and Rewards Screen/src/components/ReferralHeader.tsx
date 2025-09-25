import { ImageWithFallback } from './figma/ImageWithFallback';
import { Crown, Sparkles } from 'lucide-react';

export function ReferralHeader() {
  return (
    <div className="relative bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 p-6 rounded-b-3xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
      
      {/* Header content */}
      <div className="relative z-10 text-center text-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Crown className="w-6 h-6 text-yellow-300" />
          <h1 className="text-xl">喵喵美颜</h1>
          <Crown className="w-6 h-6 text-yellow-300" />
        </div>
        <p className="text-pink-100 mb-4">邀请好友，共享美丽</p>
        
        {/* Total earnings */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-pink-100">累计收益</span>
          </div>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl text-yellow-300">¥</span>
            <span className="text-4xl">2,888</span>
            <span className="text-lg text-pink-100">.88</span>
          </div>
        </div>
        
        {/* Cat mascot */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1716045168176-15d310a01dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhjdXRlJTIwcGluayUyMGNhdCUyMGNhcnRvb24lMjBpbGx1c3RyYXRpb258ZW58MXx8fHwxNzU4ODI1MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cat mascot"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}