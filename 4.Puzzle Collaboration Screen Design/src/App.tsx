import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PuzzleGrid } from './components/PuzzleGrid';
import { TeamMembersList } from './components/TeamMembersList';
import { SocialActions } from './components/SocialActions';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Button } from './components/ui/button';

const catImages = [
  "https://images.unsplash.com/photo-1589560535651-d2c358ae0641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwcHV6emxlfGVufDF8fHx8MTc1ODgyNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1622641269217-954d3163a1e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9yYWJsZSUyMGtpdHRlbiUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzU4ODI0OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1655992109610-297d3e6eb42b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBwb3J0cmFpdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
];

export default function App() {
  const [puzzleProgress, setPuzzleProgress] = useState(67);
  
  // Mock puzzle pieces data
  const puzzlePieces = [
    { id: 1, image: catImages[0], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小美" },
    { id: 2, image: catImages[1], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小红" },
    { id: 3, image: catImages[2], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小丽" },
    { id: 4, image: catImages[0], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小美" },
    { id: 5, image: catImages[1], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小红" },
    { id: 6, image: catImages[2], isCompleted: true, isCurrentlyBeingSolved: false, solvedBy: "小丽" },
    { id: 7, image: catImages[0], isCompleted: false, isCurrentlyBeingSolved: true },
    { id: 8, image: catImages[1], isCompleted: false, isCurrentlyBeingSolved: false },
    { id: 9, image: catImages[2], isCompleted: false, isCurrentlyBeingSolved: false }
  ];

  // Mock team members data
  const teamMembers = [
    {
      id: '1',
      name: '小美',
      avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'solving' as const,
      piecesCompleted: 2
    },
    {
      id: '2',
      name: '小红',
      avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'online' as const,
      piecesCompleted: 2
    },
    {
      id: '3',
      name: '小丽',
      avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'online' as const,
      piecesCompleted: 2
    },
    {
      id: '4',
      name: '小雯',
      avatar: 'https://images.unsplash.com/photo-1719424573284-6ce28e224351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBmcmllbmRzJTIwYXZhdGFyfGVufDF8fHx8MTc1ODgyNDkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      status: 'offline' as const,
      piecesCompleted: 0,
      isInvited: true
    }
  ];

  const handleInviteFriends = () => {
    console.log('邀请朋友功能');
    // Add invite friends functionality
  };

  const handleShareToWeChat = () => {
    console.log('分享到微信朋友圈');
    // Add WeChat sharing functionality
  };

  const handleExportVideo = () => {
    console.log('导出动画视频');
    // Add video export functionality
  };

  const handleCompletePuzzle = () => {
    setPuzzleProgress(100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-4 text-pink-300 text-4xl opacity-60"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🐱
        </motion.div>
        <motion.div
          className="absolute top-32 right-6 text-pink-300 text-3xl opacity-50"
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        >
          💖
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-8 text-pink-300 text-2xl opacity-40"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          ✨
        </motion.div>
      </div>

      {/* Mobile Container */}
      <div className="max-w-sm mx-auto min-h-screen bg-transparent relative">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pt-12">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-medium text-white">喵喵拼图</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 rounded-full">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="p-4 space-y-6">
          {/* Puzzle Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PuzzleGrid 
              pieces={puzzlePieces} 
              completionPercentage={puzzleProgress} 
            />
          </motion.div>

          {/* Team Members */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TeamMembersList members={teamMembers} />
          </motion.div>

          {/* Social Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SocialActions
              onInviteFriends={handleInviteFriends}
              onShareToWeChat={handleShareToWeChat}
              onExportVideo={handleExportVideo}
              isCompleted={puzzleProgress === 100}
            />
          </motion.div>

          {/* Demo Button */}
          {puzzleProgress < 100 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <Button
                onClick={handleCompletePuzzle}
                variant="outline"
                className="bg-white/80 text-pink-600 border-pink-300 hover:bg-white"
              >
                🎯 演示完成拼图
              </Button>
            </motion.div>
          )}
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300 text-lg opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                bottom: '-20px'
              }}
              animate={{
                y: [0, -400],
                opacity: [0, 0.3, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "easeOut"
              }}
            >
              💕
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}