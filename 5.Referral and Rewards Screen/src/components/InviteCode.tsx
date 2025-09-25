import { Copy, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

export function InviteCode() {
  const inviteCode = "MEOW8888";
  
  const copyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    toast.success('邀请码已复制到剪贴板');
  };
  
  const shareCode = () => {
    if (navigator.share) {
      navigator.share({
        title: '喵喵美颜邀请码',
        text: `快来使用我的邀请码 ${inviteCode} 加入喵喵美颜，一起变美！`,
      });
    } else {
      toast.success('分享功能启动中...');
    }
  };

  return (
    <div className="mx-4 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
        <div className="text-center mb-4">
          <h3 className="text-pink-600 mb-2">我的专属邀请码</h3>
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl p-4 mb-4">
            <div className="text-3xl tracking-wider text-pink-600 mb-2">{inviteCode}</div>
            <p className="text-sm text-gray-600">分享给好友，双方都能获得奖励</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            onClick={copyCode}
            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
          >
            <Copy className="w-4 h-4 mr-2" />
            复制邀请码
          </Button>
          <Button 
            onClick={shareCode}
            variant="outline" 
            className="flex-1 border-pink-300 text-pink-600 hover:bg-pink-50"
          >
            <Share2 className="w-4 h-4 mr-2" />
            立即分享
          </Button>
        </div>
      </div>
    </div>
  );
}