import React from 'react';
import { Share2, Heart, MessageCircle, BookmarkPlus, Download, Users } from 'lucide-react';
import { Button } from './ui/button';

export function SocialSharing() {
  const socialActions = [
    { 
      id: 'wechat', 
      name: '微信', 
      icon: '💬', 
      color: 'from-green-400 to-green-500',
      count: '1.2k'
    },
    { 
      id: 'weibo', 
      name: '微博', 
      icon: '📱', 
      color: 'from-red-400 to-red-500',
      count: '856'
    },
    { 
      id: 'douyin', 
      name: '抖音', 
      icon: '🎵', 
      color: 'from-black to-gray-800',
      count: '2.3k'
    },
    { 
      id: 'xiaohongshu', 
      name: '小红书', 
      icon: '📝', 
      color: 'from-red-400 to-pink-500',
      count: '678'
    },
  ];

  const quickActions = [
    { icon: Heart, label: '点赞', count: '3.2k', active: false },
    { icon: MessageCircle, label: '评论', count: '156', active: false },
    { icon: BookmarkPlus, label: '收藏', count: '892', active: true },
    { icon: Download, label: '保存', count: '', active: false },
  ];

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Share2 className="w-5 h-5 text-pink-500" />
        <h3 className="text-lg font-medium text-gray-800">社交分享</h3>
        <div className="bg-gradient-to-r from-rose-400 to-pink-500 text-white px-2 py-1 rounded-full text-xs">
          热门
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 p-3 rounded-2xl transition-all hover:scale-105 ${
              action.active 
                ? 'bg-gradient-to-br from-pink-200 to-rose-200 shadow-md' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
          >
            <action.icon className={`w-5 h-5 ${action.active ? 'text-pink-600' : 'text-gray-600'}`} />
            <span className="text-xs text-gray-600">{action.label}</span>
            {action.count && (
              <span className="text-xs text-gray-500">{action.count}</span>
            )}
          </button>
        ))}
      </div>

      {/* Social Platforms */}
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600 mb-2">分享到平台</p>
        {socialActions.map((platform) => (
          <button
            key={platform.id}
            className="w-full flex items-center gap-3 p-3 bg-white/60 hover:bg-white/80 rounded-2xl transition-all hover:scale-102"
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${platform.color} rounded-full flex items-center justify-center text-white shadow-sm`}>
              <span className="text-lg">{platform.icon}</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-800">{platform.name}</p>
              <p className="text-xs text-gray-500">{platform.count} 次分享</p>
            </div>
            <Share2 className="w-4 h-4 text-gray-400" />
          </button>
        ))}
      </div>

      {/* Share to Group */}
      <Button className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white rounded-2xl py-3 shadow-lg">
        <Users className="w-4 h-4 mr-2" />
        分享到猫咪群组
      </Button>

      {/* Trending hashtags */}
      <div className="mt-4 p-3 bg-white/60 rounded-2xl">
        <p className="text-xs text-gray-600 mb-2">热门话题</p>
        <div className="flex flex-wrap gap-2">
          {['#猫咪美颜', '#AI换脸', '#美颜相机', '#可爱自拍'].map((tag) => (
            <span 
              key={tag}
              className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-600 px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}