import React, { useState } from 'react';
import { Star, Heart, Sparkles, Crown } from 'lucide-react';

export function CatFilters() {
  const [selectedFilter, setSelectedFilter] = useState('猫耳朵');

  const catFilters = [
    { 
      id: 1, 
      name: '猫耳朵', 
      emoji: '🐱', 
      preview: '添加可爱猫耳',
      premium: false 
    },
    { 
      id: 2, 
      name: '猫胡须', 
      emoji: '😸', 
      preview: '俏皮猫胡须',
      premium: false 
    },
    { 
      id: 3, 
      name: '猫眼妆', 
      emoji: '😻', 
      preview: '魅惑猫眼',
      premium: true 
    },
    { 
      id: 4, 
      name: '猫咪腮红', 
      emoji: '🥰', 
      preview: '粉嫩猫咪腮红',
      premium: true 
    },
    { 
      id: 5, 
      name: '猫爪印', 
      emoji: '🐾', 
      preview: '可爱爪印装饰',
      premium: false 
    },
    { 
      id: 6, 
      name: '猫咪头饰', 
      emoji: '👑', 
      preview: '皇冠猫咪',
      premium: true 
    },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-2xl">🐱</div>
        <h3 className="text-lg font-medium text-gray-800">猫咪特效</h3>
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs">
          喵~
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {catFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedFilter(filter.name)}
            className={`relative p-4 rounded-2xl transition-all transform hover:scale-105 ${
              selectedFilter === filter.name
                ? 'bg-gradient-to-br from-pink-200 to-purple-200 shadow-lg scale-105'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          >
            {/* Premium badge */}
            {filter.premium && (
              <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full p-1">
                <Crown className="w-3 h-3" />
              </div>
            )}
            
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl">{filter.emoji}</div>
              <span className="text-xs text-gray-700 text-center leading-tight">{filter.name}</span>
              <span className="text-xs text-gray-500 text-center leading-tight">{filter.preview}</span>
            </div>

            {/* Selection indicator */}
            {selectedFilter === filter.name && (
              <div className="absolute bottom-1 right-1">
                <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Heart className="w-2 h-2 text-white" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Filter intensity slider */}
      <div className="mt-4 p-4 bg-white/60 rounded-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">特效强度</span>
          <span className="text-sm text-pink-500">85%</span>
        </div>
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-4/5 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"></div>
          <div className="absolute top-1/2 left-4/5 transform -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-pink-400 rounded-full shadow-sm"></div>
        </div>
      </div>
    </div>
  );
}