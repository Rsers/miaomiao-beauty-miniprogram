import { Gift, Crown } from "lucide-react";

export function PointsHeader() {
  return (
    <div className="flex items-center justify-between p-4 bg-white/20 backdrop-blur-sm rounded-2xl mx-4 mt-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center">
          <Crown className="w-5 h-5 text-pink-600" />
        </div>
        <div>
          <p className="text-white/80 text-sm">我的积分</p>
          <p className="text-white font-bold text-lg">2,580</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <p className="text-white text-sm">VIP 3</p>
        </div>
        <button className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
          <Gift className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}