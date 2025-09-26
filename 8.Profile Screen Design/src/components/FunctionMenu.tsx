import { Camera, Heart, Gift, Users, Sparkles, Palette, Music, Share2 } from 'lucide-react';

export function FunctionMenu() {
  const menuItems = [
    { icon: Camera, label: '美颜相机', color: 'bg-pink-100 text-pink-600' },
    { icon: Sparkles, label: '猫咪滤镜', color: 'bg-purple-100 text-purple-600' },
    { icon: Palette, label: '美妆工具', color: 'bg-orange-100 text-orange-600' },
    { icon: Music, label: '音乐相册', color: 'bg-blue-100 text-blue-600' },
    { icon: Heart, label: '我的收藏', color: 'bg-red-100 text-red-600' },
    { icon: Share2, label: '分享作品', color: 'bg-green-100 text-green-600' },
    { icon: Gift, label: '每日签到', color: 'bg-yellow-100 text-yellow-600' },
    { icon: Users, label: '邀请好友', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-pink-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">功能菜单</h3>
      
      <div className="grid grid-cols-4 gap-4">
        {menuItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-600 leading-tight">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}