import {
  Bell,
  User,
  Camera,
  Sparkles,
  Heart,
  Users,
  Gift,
  Palette,
  Image,
  Star,
  Zap,
  Calendar,
} from "lucide-react";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";

function CatPawIcon({ className = "", color = "#ff9a9e" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="6" r="2" fill={color} />
      <circle cx="16" cy="6" r="2" fill={color} />
      <circle cx="6" cy="12" r="1.5" fill={color} />
      <circle cx="18" cy="12" r="1.5" fill={color} />
      <ellipse cx="12" cy="14" rx="4" ry="3" fill={color} />
    </svg>
  );
}

function CatFaceIcon({ className = "", size = 40 }) {
  return (
    <div
      className={`${className} flex items-center justify-center`}
      style={{ width: size, height: size }}
    >
      <div className="relative">
        {/* Cat face */}
        <div
          className="rounded-full bg-gradient-to-br from-pink-300 to-pink-400 shadow-lg"
          style={{ width: size, height: size }}
        >
          {/* Cat ears */}
          <div className="absolute -top-2 left-2 w-3 h-3 bg-pink-400 rounded-full transform rotate-45"></div>
          <div className="absolute -top-2 right-2 w-3 h-3 bg-pink-400 rounded-full transform rotate-45"></div>

          {/* Cat eyes */}
          <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
          <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-white rounded-full"></div>

          {/* Cat nose */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-600 rounded-full"></div>

          {/* Cat whiskers */}
          <div className="absolute top-4 left-0 w-2 h-0.5 bg-pink-600 rounded"></div>
          <div className="absolute top-4 right-0 w-2 h-0.5 bg-pink-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] overflow-hidden">
      {/* Mobile Container */}
      <div className="max-w-[375px] mx-auto min-h-screen bg-gradient-to-br from-[#ff9a9e] to-[#fecfef] relative">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 pt-12">
          <CatFaceIcon size={40} />
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] text-white">3</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Greeting */}
        <div className="px-4 mb-6">
          <h1 className="text-white text-2xl mb-1">
            早上好，小美女！
          </h1>
          <p className="text-white/80">
            今天也要变得更美丽呢 ✨
          </p>
        </div>

        {/* Main CTA Button */}
        <div className="px-4 mb-6">
          <Card className="relative overflow-hidden bg-gradient-to-r from-white to-pink-50 shadow-xl rounded-3xl border-0">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <CatPawIcon className="w-6 h-6" />
                <h2 className="text-xl text-gray-800">
                  立即美颜
                </h2>
                <CatPawIcon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 mb-4">
                让AI为你量身定制专属美颜方案
              </p>
              <Button className="bg-gradient-to-r from-[#ff9a9e] to-[#fad0c4] hover:from-[#f093a0] hover:to-[#f5c8bd] text-white px-8 py-3 rounded-full shadow-lg">
                <Camera className="w-5 h-5 mr-2" />
                开始拍照
              </Button>
            </div>
            {/* Decorative cat paws */}
            <CatPawIcon
              className="absolute top-2 right-2 w-8 h-8 opacity-20"
              color="#fad0c4"
            />
            <CatPawIcon
              className="absolute bottom-2 left-2 w-6 h-6 opacity-20"
              color="#fad0c4"
            />
          </Card>
        </div>

        {/* Function Grid */}
        <div className="px-4 mb-6">
          <h3 className="text-white mb-3">功能大全</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: Sparkles,
                label: "智能美颜",
                color: "from-purple-400 to-pink-400",
              },
              {
                icon: Heart,
                label: "瘦脸塑形",
                color: "from-pink-400 to-red-400",
              },
              {
                icon: Palette,
                label: "美妆试色",
                color: "from-orange-400 to-pink-400",
              },
              {
                icon: Image,
                label: "风格滤镜",
                color: "from-blue-400 to-purple-400",
              },
              {
                icon: Star,
                label: "五官调整",
                color: "from-yellow-400 to-orange-400",
              },
              {
                icon: Zap,
                label: "一键美颜",
                color: "from-green-400 to-blue-400",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl overflow-hidden"
              >
                <div className="p-4 text-center">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-2`}
                  >
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">
                    {item.label}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Section */}
        <div className="px-4 mb-6">
          <h3 className="text-white mb-3">社交互动</h3>
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-white to-purple-50 border-0 shadow-lg rounded-2xl overflow-hidden">
              <div className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center mx-auto mb-2">
                  <Image className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-gray-800 mb-1">拼图协作</h4>
                <p className="text-xs text-gray-600">
                  与好友一起创作美图
                </p>
                <div className="mt-2 flex justify-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 border-2 border-white flex items-center justify-center"
                      >
                        <CatFaceIcon size={16} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-white to-pink-50 border-0 shadow-lg rounded-2xl overflow-hidden">
              <div className="p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-gray-800 mb-1">邀请好友</h4>
                <p className="text-xs text-gray-600">
                  分享获得专属奖励
                </p>
                <div className="mt-2">
                  <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                    +500积分
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Promotional Area */}
        <div className="px-4 pb-8">
          <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-0 shadow-lg rounded-2xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-800">每日福利</h4>
                    <p className="text-xs text-gray-600">
                      签到领取美颜道具
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white rounded-full"
                >
                  <Calendar className="w-4 h-4 mr-1" />
                  签到
                </Button>
              </div>

              <div className="mt-4 p-3 bg-white/50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">
                    连续签到
                  </span>
                  <span className="text-orange-600">第5天</span>
                </div>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        day <= 5
                          ? "bg-gradient-to-br from-orange-400 to-yellow-400 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute top-20 right-8 opacity-20">
          <CatPawIcon className="w-8 h-8" color="white" />
        </div>
        <div className="absolute top-40 left-8 opacity-15">
          <CatPawIcon className="w-6 h-6" color="white" />
        </div>
        <div className="absolute bottom-32 right-12 opacity-10">
          <CatPawIcon className="w-10 h-10" color="white" />
        </div>
      </div>
    </div>
  );
}