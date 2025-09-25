import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Share2, Download, Users } from 'lucide-react';

interface SocialActionsProps {
  onInviteFriends: () => void;
  onShareToWeChat: () => void;
  onExportVideo: () => void;
  isCompleted: boolean;
}

export function SocialActions({ 
  onInviteFriends, 
  onShareToWeChat, 
  onExportVideo, 
  isCompleted 
}: SocialActionsProps) {
  return (
    <div className="space-y-4">
      {/* Main Invite Button */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          onClick={onInviteFriends}
          className="w-full h-14 bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white rounded-2xl shadow-lg border-0 text-lg"
        >
          <Users className="w-5 h-5 mr-2" />
          邀请闺蜜一起拼图
          <motion.span
            className="ml-2 text-xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            👭
          </motion.span>
        </Button>
      </motion.div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onShareToWeChat}
            variant="outline"
            className="w-full h-12 bg-white/90 border-2 border-green-200 text-green-600 hover:bg-green-50 rounded-xl"
            disabled={!isCompleted}
          >
            <Share2 className="w-4 h-4 mr-2" />
            分享到微信
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onExportVideo}
            variant="outline"
            className="w-full h-12 bg-white/90 border-2 border-purple-200 text-purple-600 hover:bg-purple-50 rounded-xl"
            disabled={!isCompleted}
          >
            <Download className="w-4 h-4 mr-2" />
            导出视频
          </Button>
        </motion.div>
      </div>

      {/* Completion Celebration */}
      {isCompleted && (
        <motion.div
          className="bg-gradient-to-r from-yellow-100 to-pink-100 p-4 rounded-2xl border border-pink-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="text-center">
            <motion.div
              className="text-2xl mb-2"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            >
              🎉 拼图完成啦！🎉
            </motion.div>
            <p className="text-sm text-pink-700">
              和小伙伴们一起完成了这个可爱的猫咪拼图！
            </p>
          </div>
        </motion.div>
      )}

      {!isCompleted && (
        <div className="text-center text-xs text-gray-500 bg-white/60 p-3 rounded-xl">
          💡 完成拼图后即可分享到微信朋友圈和导出动画视频
        </div>
      )}
    </div>
  );
}