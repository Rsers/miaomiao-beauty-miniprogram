import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PuzzlePiece {
  id: number;
  image?: string;
  isCompleted: boolean;
  isCurrentlyBeingSolved: boolean;
  solvedBy?: string;
}

interface PuzzleGridProps {
  pieces: PuzzlePiece[];
  completionPercentage: number;
}

export function PuzzleGrid({ pieces, completionPercentage }: PuzzleGridProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg text-pink-800">拼图进度</h3>
          <span className="text-pink-600 font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-pink-100 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-pink-400 to-pink-500 h-3 rounded-full"
            style={{ width: `${completionPercentage}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* 3x3 Puzzle Grid */}
      <div className="grid grid-cols-3 gap-2 aspect-square">
        {pieces.map((piece, index) => (
          <motion.div
            key={piece.id}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-pink-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {piece.isCompleted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full h-full"
              >
                <ImageWithFallback
                  src={piece.image}
                  alt={`Puzzle piece ${piece.id}`}
                  className="w-full h-full object-cover"
                />
                {/* Sparkle effect for completed pieces */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-yellow-200/30 to-pink-200/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                {/* Solved by indicator */}
                {piece.solvedBy && (
                  <div className="absolute bottom-1 right-1 bg-pink-500 text-white text-xs px-1 py-0.5 rounded">
                    {piece.solvedBy}
                  </div>
                )}
              </motion.div>
            ) : piece.isCurrentlyBeingSolved ? (
              <motion.div
                className="w-full h-full bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div className="text-2xl">🧩</div>
              </motion.div>
            ) : (
              <div className="w-full h-full bg-pink-50 flex items-center justify-center border-2 border-dashed border-pink-300">
                <div className="text-pink-400 text-lg">🐱</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Celebration Effect */}
      {completionPercentage === 100 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-6xl"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            🎉
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}