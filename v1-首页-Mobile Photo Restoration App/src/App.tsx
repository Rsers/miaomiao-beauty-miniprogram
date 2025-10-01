import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FileInfo {
  file: File;
  preview: string;
  name: string;
  size: string;
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string } | null>(null);
  const [compareMode, setCompareMode] = useState<'side-by-side' | 'slider'>('side-by-side');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.match(/^image\/(jpeg|jpg|png|avif)$/)) {
      alert('请选择 JPG、PNG 或 AVIF 格式的图片');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setSelectedFile({
        file,
        preview,
        name: file.name,
        size: formatFileSize(file.size)
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartProcessing = () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            setShowResult(true);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 3 + 1;
      });
    }, 100);
  };

  const handleSaveImage = () => {
    if (!selectedFile) return;
    
    // Create download link
    const link = document.createElement('a');
    link.href = selectedFile.preview;
    link.download = `restored_${selectedFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share && selectedFile) {
      try {
        const response = await fetch(selectedFile.preview);
        const blob = await response.blob();
        const file = new File([blob], `restored_${selectedFile.name}`, { type: blob.type });
        
        await navigator.share({
          title: '图片修复结果',
          text: '看看我用喵喵美颜修复的照片！',
          files: [file]
        });
      } catch (error) {
        // Fallback to copying link
        navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  const openFullscreen = (src: string, title: string) => {
    setFullscreenImage({ src, title });
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const handleTryAgain = () => {
    setSelectedFile(null);
    setShowResult(false);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-sm mx-auto bg-white min-h-screen flex flex-col">
        {/* Header Section */}
        <motion.div 
          className="bg-gradient-to-br from-pink-400 via-pink-300 to-rose-300 p-8 text-center relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cat-themed background decorations */}
          <div className="absolute inset-0">
            {/* Main cat face in top right */}
            <div className="absolute top-3 right-3 text-3xl opacity-30 transform rotate-12">
              🐱
            </div>
            
            {/* Small cat in top right corner */}
            <div className="absolute top-8 right-12 text-lg opacity-25">
              😸
            </div>
            
            {/* Cat paw prints */}
            <div className="absolute top-1/3 right-6 text-sm opacity-20 transform -rotate-12">
              🐾
            </div>
            
            {/* Heart eyes cat in bottom left */}
            <div className="absolute bottom-6 left-4 text-2xl opacity-30 transform -rotate-6">
              😻
            </div>
            
            {/* Small paw in bottom left */}
            <div className="absolute bottom-12 left-8 text-xs opacity-25">
              🐾
            </div>
            
            {/* Sleeping cat in middle left */}
            <div className="absolute top-1/2 left-4 text-sm opacity-20 transform rotate-6">
              😴
            </div>
            
            {/* Sparkles around cats */}
            <div className="absolute top-6 right-20 text-xs opacity-30">
              ✨
            </div>
            
            <div className="absolute bottom-16 left-16 text-xs opacity-25">
              ✨
            </div>
            
            {/* Additional small cat elements */}
            <div className="absolute top-20 left-6 text-xs opacity-20">
              🐈
            </div>
            
            <div className="absolute bottom-20 right-8 text-xs opacity-25 transform rotate-12">
              💖
            </div>
          </div>
          
          <div className="relative z-10">
            <div className="mb-6">
              <h1 className="text-3xl text-white mb-3 tracking-wide drop-shadow-md">
                <span className="block text-2xl opacity-95 mb-1">图片修复</span>
                <span className="block text-4xl bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                  喵喵美颜
                </span>
              </h1>
              <div className="w-16 h-1 bg-white bg-opacity-60 rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-white text-opacity-95 leading-relaxed tracking-wide">
                让模糊照片变清晰<br />恢复珍贵记忆
              </p>
            </div>
          </div>
        </motion.div>

        <div className="px-6 space-y-6 flex-1">
          {/* Upload Section - Core Feature */}
          <div className="mt-4">
            <h2 className="text-2xl text-gray-800 mb-6 text-center">开始修复</h2>
            
            {!selectedFile ? (
              <motion.div
                className="bg-gradient-to-r from-orange-200 to-orange-300 border-3 border-dashed border-pink-400 rounded-2xl p-8 text-center cursor-pointer active:scale-95"
                onClick={handleUploadAreaClick}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-6xl mb-4">📷</div>
                <p className="text-lg text-gray-700 mb-2">点击选择图片</p>
                <p className="text-sm text-gray-600">支持 JPG、PNG、AVIF 格式</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={selectedFile.preview} 
                    alt="Preview" 
                    className="w-full max-h-96 object-cover rounded-2xl"
                  />
                  
                  {/* Processing overlay on image */}
                  {isProcessing && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white p-6">
                        {/* Cat with sparkles for processing */}
                        <div className="text-4xl mb-3 animate-pulse">
                          ✨😸✨
                        </div>
                        
                        <div className="text-lg mb-4">正在修复您的图片...</div>
                        
                        {/* Progress circle */}
                        <div className="relative w-20 h-20 mx-auto mb-4">
                          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="rgba(255,255,255,0.3)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              stroke="white"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 40}`}
                              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                              className="transition-all duration-300 ease-out"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xl">{Math.round(progress)}%</span>
                          </div>
                        </div>
                        
                        <div className="text-sm opacity-80">喵喵正在努力修复中...</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{selectedFile.size}</p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleUploadAreaClick}
                    disabled={isProcessing}
                    className="flex-1 bg-orange-400 text-white py-3 px-6 rounded-full transition-all duration-300 active:scale-95 shadow-lg disabled:opacity-50"
                  >
                    重新选择
                  </button>
                  
                  <button
                    onClick={handleStartProcessing}
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 shadow-lg"
                  >
                    {isProcessing ? '修复中...' : '开始修复'}
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/avif"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Result Section */}
          <AnimatePresence>
            {showResult && selectedFile && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl text-gray-800">修复结果</h2>
                  <button
                    onClick={handleTryAgain}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm transition-all duration-300 active:scale-95"
                  >
                    🔄 再试一次
                  </button>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 text-center">点击图片放大查看细节差异</p>

                {/* Compare Mode Toggle */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-100 rounded-full p-1 flex">
                    <button
                      onClick={() => setCompareMode('side-by-side')}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        compareMode === 'side-by-side' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      对比查看
                    </button>
                    <button
                      onClick={() => setCompareMode('slider')}
                      className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                        compareMode === 'slider' 
                          ? 'bg-white text-gray-800 shadow-sm' 
                          : 'text-gray-600'
                      }`}
                    >
                      滑动对比
                    </button>
                  </div>
                </div>

                {compareMode === 'side-by-side' ? (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: '原图', src: selectedFile.preview, desc: '修复前' },
                      { label: '修复后', src: selectedFile.preview, desc: '清晰度提升' }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-gray-700">{item.label}</p>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{item.desc}</span>
                        </div>
                        <div 
                          className="relative cursor-pointer group"
                          onClick={() => openFullscreen(item.src, item.label)}
                        >
                          <img 
                            src={item.src} 
                            alt={item.label}
                            className="w-full h-64 object-cover rounded-xl border-2 border-gray-200"
                            style={index === 1 ? { filter: 'contrast(1.1) brightness(1.05) saturate(1.1)' } : {}}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-active:bg-opacity-10 transition-all duration-200 rounded-xl flex items-center justify-center">
                            <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-white text-sm">🔍</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6">
                    <div className="relative h-80 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img 
                        src={selectedFile.preview} 
                        alt="原图"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <img 
                        src={selectedFile.preview} 
                        alt="修复后"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ 
                          filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                          clipPath: 'inset(0 50% 0 0)'
                        }}
                      />
                      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white shadow-lg transform -translate-x-0.5">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                          <span className="text-gray-600">↔</span>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        原图
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                        修复后
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">滑动中间的分割线查看对比效果</p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-3">
                  <motion.button
                    onClick={handleSaveImage}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-xl">💾</span>
                    <span>下载修复后的图片</span>
                  </motion.button>
                  
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handleTryAgain}
                      className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-2xl transition-all duration-300"
                      whileTap={{ scale: 0.95 }}
                    >
                      🔄 重新修复
                    </motion.button>
                    
                    <motion.button
                      onClick={handleShare}
                      className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 px-6 rounded-2xl transition-all duration-300 shadow-lg"
                      whileTap={{ scale: 0.95 }}
                    >
                      📤 分享
                    </motion.button>
                  </div>
                </div>

                {/* Quality comparison info */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                  <h4 className="text-sm text-gray-700 mb-2 flex items-center gap-2">
                    <span>📊</span>
                    修复效果分析
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <div className="text-gray-600">清晰度提升</div>
                      <div className="text-green-600">+25%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">噪点减少</div>
                      <div className="text-green-600">-40%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">色彩还原</div>
                      <div className="text-green-600">+18%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">处理时间</div>
                      <div className="text-blue-600">{Math.round(progress/10)}秒</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Core Features */}
        <div className="px-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
            <h3 className="text-center mb-4 text-gray-700 text-sm">核心特点</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '✨', title: '完全免费', desc: '无需付费' },
                { icon: '🔒', title: '不存照片', desc: '保护隐私' },
                { icon: '⚡', title: '用完即走', desc: '无需注册' }
              ].map((feature, index) => (
                <div key={index} className="text-center p-3 rounded-xl bg-gradient-to-b from-gray-50 to-gray-100">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg flex items-center justify-center text-lg text-white shadow-md mx-auto mb-2">
                    {feature.icon}
                  </div>
                  <h4 className="text-xs text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Privacy Card */}
        <div className="px-6 mb-6">
          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-4 shadow-lg border border-purple-400 border-opacity-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-lg backdrop-blur-sm">
                🔒
              </div>
              <div className="text-white flex-1">
                <h3 className="text-sm mb-1">隐私承诺</h3>
                <p className="text-xs opacity-90">本地处理，不保存照片</p>
              </div>
              <div className="w-6 h-6 bg-green-400 bg-opacity-80 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-gray-500">
          <p className="text-sm mb-2">
            <a href="#" className="text-gray-500">服务条款</a> | <a href="#" className="text-gray-500">隐私政策</a>
          </p>
          <p className="text-xs">使用本服务即表示您同意相关条款</p>
        </div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {fullscreenImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeFullscreen}
            >
              <motion.div
                className="relative max-w-full max-h-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={fullscreenImage.src} 
                  alt={fullscreenImage.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  style={fullscreenImage.title === '修复后' ? { filter: 'contrast(1.1) brightness(1.05) saturate(1.1)' } : {}}
                />
                
                {/* Control bar */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                    {fullscreenImage.title}
                  </div>
                  <button
                    onClick={closeFullscreen}
                    className="text-white text-2xl bg-black bg-opacity-70 rounded-full w-12 h-12 flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                  点按屏幕关闭 • 双指缩放查看细节
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}