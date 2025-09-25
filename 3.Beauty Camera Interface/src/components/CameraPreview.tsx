import React, { useState } from 'react';
import { Camera, RotateCcw, Zap, Heart, Star } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CameraPreview() {
  const [selectedFilter, setSelectedFilter] = useState('原图');

  const filters = [
    { name: '原图', icon: '📷' },
    { name: '猫咪眼', icon: '🐱' },
    { name: '粉粉甜', icon: '🌸' },
    { name: '梦幻紫', icon: '💜' },
    { name: '清纯系', icon: '✨' },
  ];

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl overflow-hidden shadow-lg">
      {/* Camera Preview Background */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1649654077252-a0b200197c93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBjYW1lcmElMjBzZWxmaWV8ZW58MXx8fHwxNzU4ODI0NDE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Camera Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-purple-500/20"></div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
        <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <Camera className="w-4 h-4 mr-1" />
          切换镜头
        </Button>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md border-white/30 text-white p-2">
            <Zap className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="secondary" className="bg-white/20 backdrop-blur-md border-white/30 text-white p-2">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Cat Paw Decorations */}
      <div className="absolute top-6 right-6 text-pink-300 opacity-60 text-2xl animate-pulse">
        🐾
      </div>
      <div className="absolute bottom-8 left-6 text-purple-300 opacity-60 text-xl animate-pulse delay-1000">
        🐾
      </div>

      {/* Beauty Filter Indicator */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-2 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-300" />
            <span className="text-sm">美颜 85%</span>
          </div>
        </div>
      </div>

      {/* Filter Selection */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => setSelectedFilter(filter.name)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                selectedFilter === filter.name
                  ? 'bg-white/30 backdrop-blur-md scale-105'
                  : 'bg-white/10 backdrop-blur-md'
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              <span className="text-xs text-white">{filter.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}