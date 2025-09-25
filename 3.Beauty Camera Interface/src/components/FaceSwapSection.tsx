import React, { useState } from 'react';
import { Upload, ArrowRight, Sparkles, Star } from 'lucide-react';
import { Button } from './ui/button';

export function FaceSwapSection() {
  const [leftImage, setLeftImage] = useState<string | null>(null);
  const [rightImage, setRightImage] = useState<string | null>(null);

  const handleImageUpload = (side: 'left' | 'right', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (side === 'left') {
        setLeftImage(url);
      } else {
        setRightImage(url);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-3xl p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-medium text-gray-800">AI 换脸魔法</h3>
        <div className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs">
          HOT
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Upload Slot */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('left', e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl border-2 border-dashed border-pink-300 flex flex-col items-center justify-center overflow-hidden">
              {leftImage ? (
                <img src={leftImage} alt="Source" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6 text-pink-500" />
                  </div>
                  <span className="text-sm text-pink-600">上传原图</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">你的照片</p>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs text-gray-500 mt-1">AI换脸</span>
        </div>

        {/* Right Upload Slot */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload('right', e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl border-2 border-dashed border-purple-300 flex flex-col items-center justify-center overflow-hidden">
              {rightImage ? (
                <img src={rightImage} alt="Target" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-sm text-purple-600">选择模板</span>
                </>
              )}
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">目标模板</p>
        </div>
      </div>

      {/* Process Button */}
      <Button 
        className="w-full mt-4 bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-2xl py-3 shadow-lg"
        disabled={!leftImage || !rightImage}
      >
        <Sparkles className="w-4 h-4 mr-2" />
        开始AI换脸 (消耗1次)
      </Button>
    </div>
  );
}