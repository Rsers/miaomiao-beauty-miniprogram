import React from 'react';
import { CameraPreview } from './components/CameraPreview';
import { FaceSwapSection } from './components/FaceSwapSection';
import { PurchaseButton } from './components/PurchaseButton';
import { CatFilters } from './components/CatFilters';
import { CollaborationArea } from './components/CollaborationArea';
import { SocialSharing } from './components/SocialSharing';
import { Menu, Settings, User } from 'lucide-react';

export default function App() {
  return (
    <div className="w-full max-w-sm mx-auto h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 overflow-y-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-pink-200/50">
        <div className="flex items-center justify-between p-4">
          <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="text-2xl">🐱</div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              喵喵美颜
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
              <Settings className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6 pb-8">
        {/* Camera Preview */}
        <CameraPreview />

        {/* AI Face Swap */}
        <FaceSwapSection />

        {/* Cat Filters */}
        <CatFilters />

        {/* Purchase Section */}
        <PurchaseButton />

        {/* Collaboration Area */}
        <CollaborationArea />

        {/* Social Sharing */}
        <SocialSharing />
      </main>

      {/* Floating Cat Paw Decorations */}
      <div className="fixed top-20 right-4 text-pink-300 opacity-40 text-xl animate-bounce">
        🐾
      </div>
      <div className="fixed top-40 left-4 text-purple-300 opacity-40 text-lg animate-pulse delay-500">
        🐾
      </div>
      <div className="fixed bottom-32 right-8 text-rose-300 opacity-40 text-2xl animate-bounce delay-1000">
        🐾
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5">
        <div className="absolute top-10 left-10 text-6xl text-pink-400">🐱</div>
        <div className="absolute top-32 right-16 text-4xl text-purple-400">🐾</div>
        <div className="absolute bottom-40 left-8 text-5xl text-rose-400">🐱</div>
        <div className="absolute bottom-20 right-20 text-3xl text-indigo-400">🐾</div>
      </div>
    </div>
  );
}