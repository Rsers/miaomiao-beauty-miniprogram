import React, { useState } from 'react';
import { Users, Puzzle, Share2, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function CollaborationArea() {
  const [activeUsers] = useState([
    { id: 1, name: '小猫咪', avatar: '🐱', status: 'online' },
    { id: 2, name: '粉粉猪', avatar: '🐷', status: 'editing' },
    { id: 3, name: '紫宝宝', avatar: '💜', status: 'online' },
  ]);

  const puzzlePieces = [
    { id: 1, color: 'from-pink-300 to-pink-400', completed: true },
    { id: 2, color: 'from-purple-300 to-purple-400', completed: true },
    { id: 3, color: 'from-blue-300 to-blue-400', completed: false },
    { id: 4, color: 'from-green-300 to-green-400', completed: false },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Puzzle className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-medium text-gray-800">智能拼图协作</h3>
        <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs">
          新功能
        </div>
      </div>

      {/* Active Users */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">在线用户 ({activeUsers.length})</span>
        </div>
        <div className="flex gap-2">
          {activeUsers.map((user) => (
            <div key={user.id} className="relative">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border-2 border-purple-200">
                <span className="text-lg">{user.avatar}</span>
              </div>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                user.status === 'online' ? 'bg-green-400' : 'bg-orange-400'
              }`}></div>
            </div>
          ))}
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-400">+</span>
          </div>
        </div>
      </div>

      {/* Puzzle Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">拼图进度</span>
          <span className="text-sm text-purple-500">50%</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {puzzlePieces.map((piece) => (
            <div
              key={piece.id}
              className={`aspect-square rounded-lg transition-all ${
                piece.completed
                  ? `bg-gradient-to-br ${piece.color} shadow-md`
                  : 'bg-gray-200 border-2 border-dashed border-gray-300'
              } flex items-center justify-center`}
            >
              {piece.completed ? (
                <Heart className="w-4 h-4 text-white" />
              ) : (
                <span className="text-gray-400 text-xs">?</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Actions */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full bg-white/60 hover:bg-white/80 border-purple-200 text-purple-700 rounded-2xl"
        >
          <Share2 className="w-4 h-4 mr-2" />
          邀请好友协作
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-white/60 hover:bg-white/80 border-purple-200 text-purple-700 rounded-2xl"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          实时聊天
        </Button>
      </div>

      {/* Cat paw decoration */}
      <div className="flex justify-center mt-3 opacity-50">
        <span className="text-purple-300 animate-pulse">🐾</span>
      </div>
    </div>
  );
}