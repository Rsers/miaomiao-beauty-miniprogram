import React from 'react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'solving' | 'offline';
  piecesCompleted: number;
  isInvited?: boolean;
}

interface TeamMembersListProps {
  members: TeamMember[];
}

export function TeamMembersList({ members }: TeamMembersListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'solving': return 'bg-pink-400';
      case 'offline': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '在线';
      case 'solving': return '拼图中';
      case 'offline': return '离线';
      default: return '离线';
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
      <h3 className="text-lg text-pink-800 mb-4 flex items-center gap-2">
        <span>👭</span>
        团队成员 ({members.length})
      </h3>
      
      <div className="space-y-3 max-h-48 overflow-y-auto">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative">
              <Avatar className="w-10 h-10 border-2 border-pink-200">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-pink-100 text-pink-600">
                  {member.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              {/* Status indicator */}
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`} />
              
              {/* Solving animation */}
              {member.status === 'solving' && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-pink-400"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-gray-800 truncate">
                  {member.name}
                </p>
                {member.isInvited && (
                  <Badge variant="outline" className="text-xs bg-pink-50 text-pink-600 border-pink-200">
                    邀请中
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {getStatusText(member.status)} • {member.piecesCompleted} 块拼图
              </p>
            </div>
            
            {member.piecesCompleted > 0 && (
              <div className="text-xs text-pink-600 font-medium">
                🧩 {member.piecesCompleted}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}