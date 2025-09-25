import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

// Cat Logo Component
const CatLogo = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Cat head */}
    <motion.ellipse
      cx="40" cy="45" rx="22" ry="18"
      fill="url(#catGradient)"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    />
    
    {/* Cat ears */}
    <motion.path
      d="M25 32 L20 18 L35 25 Z"
      fill="url(#catGradient)"
      initial={{ rotate: -45, transformOrigin: "25px 32px" }}
      animate={{ rotate: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    />
    <motion.path
      d="M55 32 L60 18 L45 25 Z"
      fill="url(#catGradient)"
      initial={{ rotate: 45, transformOrigin: "55px 32px" }}
      animate={{ rotate: 0 }}
      transition={{ delay: 0.6, duration: 0.3 }}
    />
    
    {/* Inner ears */}
    <motion.path
      d="M26 30 L23 22 L32 27 Z"
      fill="#FFB6C1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.2 }}
    />
    <motion.path
      d="M54 30 L57 22 L48 27 Z"
      fill="#FFB6C1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.2 }}
    />
    
    {/* Eyes */}
    <motion.ellipse
      cx="33" cy="42" rx="3" ry="4"
      fill="#2D1B69"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.8, duration: 0.2 }}
    />
    <motion.ellipse
      cx="47" cy="42" rx="3" ry="4"
      fill="#2D1B69"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ delay: 0.8, duration: 0.2 }}
    />
    
    {/* Eye highlights */}
    <motion.ellipse
      cx="34" cy="41" rx="1" ry="1.5"
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.2 }}
    />
    <motion.ellipse
      cx="48" cy="41" rx="1" ry="1.5"
      fill="white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.2 }}
    />
    
    {/* Nose */}
    <motion.path
      d="M40 47 L37 50 L43 50 Z"
      fill="#FF69B4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, duration: 0.2 }}
    />
    
    {/* Mouth */}
    <motion.path
      d="M40 52 Q35 55 30 52"
      stroke="#2D1B69"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.1, duration: 0.3 }}
    />
    <motion.path
      d="M40 52 Q45 55 50 52"
      stroke="#2D1B69"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.1, duration: 0.3 }}
    />
    
    {/* Whiskers */}
    <motion.line
      x1="15" y1="45" x2="25" y2="43"
      stroke="#2D1B69"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.2, duration: 0.2 }}
    />
    <motion.line
      x1="15" y1="50" x2="25" y2="50"
      stroke="#2D1B69"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.3, duration: 0.2 }}
    />
    <motion.line
      x1="55" y1="43" x2="65" y2="45"
      stroke="#2D1B69"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.2, duration: 0.2 }}
    />
    <motion.line
      x1="55" y1="50" x2="65" y2="50"
      stroke="#2D1B69"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ delay: 1.3, duration: 0.2 }}
    />
    
    <defs>
      <linearGradient id="catGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFEAA7" />
        <stop offset="100%" stopColor="#FAB1A0" />
      </linearGradient>
    </defs>
  </svg>
)

// Paw Print Component
const PawPrint = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <ellipse cx="12" cy="18" rx="3" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="8" cy="12" rx="2" ry="2.5" fill="currentColor" opacity="0.6" />
    <ellipse cx="16" cy="12" rx="2" ry="2.5" fill="currentColor" opacity="0.6" />
    <ellipse cx="6" cy="16" rx="1.5" ry="2" fill="currentColor" opacity="0.6" />
    <ellipse cx="18" cy="16" rx="1.5" ry="2" fill="currentColor" opacity="0.6" />
  </svg>
)

// Loading Dots Component
const LoadingDots = () => {
  const dots = [0, 1, 2]
  
  return (
    <div className="flex space-x-2">
      {dots.map((dot) => (
        <motion.div
          key={dot}
          className="w-3 h-3 bg-white/60 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: dot * 0.2
          }}
        />
      ))}
    </div>
  )
}

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMainContent(true)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full h-screen max-w-[375px] max-h-[812px] mx-auto relative overflow-hidden">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)'
        }}
      />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Paw Prints */}
        <motion.div
          className="absolute top-20 left-8 text-white/20"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <PawPrint size={16} />
        </motion.div>
        
        <motion.div
          className="absolute top-32 right-12 text-white/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <PawPrint size={20} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-40 left-16 text-white/20"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <PawPrint size={14} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-60 right-8 text-white/20"
          animate={{
            y: [0, 8, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <PawPrint size={18} />
        </motion.div>
      </div>
      
      {/* Main Content */}
      {showMainContent && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">
          {/* Logo Container */}
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full p-8 shadow-2xl mb-8"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 15,
              duration: 0.8
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <CatLogo />
            </motion.div>
          </motion.div>
          
          {/* App Name */}
          <motion.div
            className="text-center mb-4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h1 className="text-4xl text-white font-bold mb-2 drop-shadow-lg">
              喵喵美颜
            </h1>
            <motion.div
              className="w-16 h-1 bg-white/60 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
          </motion.div>
          
          {/* Slogan */}
          <motion.p
            className="text-xl text-white/90 text-center mb-12 drop-shadow-md"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            喵喵一下，美美哒～
          </motion.p>
          
          {/* Loading Area */}
          <motion.div
            className="flex flex-col items-center space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            {/* Paw Prints Loading Animation */}
            <div className="flex space-x-4">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className="text-white/70"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  <PawPrint size={24} />
                </motion.div>
              ))}
            </div>
            
            {/* Loading Text */}
            <motion.p
              className="text-white/80 text-sm"
              animate={{
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
            >
              正在启动美颜魔法...
            </motion.p>
            
            {/* Loading Dots */}
            <LoadingDots />
          </motion.div>
        </div>
      )}
      
      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
    </div>
  )
}