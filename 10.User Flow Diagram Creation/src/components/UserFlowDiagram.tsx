import { 
  ArrowRight, 
  ArrowDown,
  Users, 
  Puzzle, 
  Share2, 
  Gift, 
  Star, 
  Crown,
  Heart,
  Zap,
  TrendingUp,
  Smartphone,
  MessageCircle,
  Award
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function UserFlowDiagram() {
  const flowSteps = [
    {
      id: 1,
      title: "发现应用",
      subtitle: "通过好友邀请",
      icon: Users,
      color: "from-pink-400 to-pink-500",
      description: "朋友分享邀请链接",
      mobile: true
    },
    {
      id: 2,
      title: "完成拼图",
      subtitle: "与好友协作",
      icon: Puzzle,
      color: "from-pink-500 to-purple-500",
      description: "多人合作完成美颜拼图",
      mobile: true
    },
    {
      id: 3,
      title: "分享动画",
      subtitle: "展示作品成果",
      icon: Share2,
      color: "from-purple-500 to-purple-600",
      description: "生成专属美颜动画",
      mobile: true
    },
    {
      id: 4,
      title: "邀请好友",
      subtitle: "VIP权限转让",
      icon: Crown,
      color: "from-purple-600 to-pink-600",
      description: "获得VIP邀请特权",
      mobile: false
    },
    {
      id: 5,
      title: "获得奖励",
      subtitle: "积分与徽章",
      icon: Award,
      color: "from-pink-600 to-pink-500",
      description: "累积积分兑换奖品",
      mobile: false
    },
    {
      id: 6,
      title: "活跃推广者",
      subtitle: "成为品牌大使",
      icon: TrendingUp,
      color: "from-pink-500 to-purple-400",
      description: "持续推广获得收益",
      mobile: false
    }
  ];

  const viralIndicators = [
    { icon: Heart, count: "2.3K", label: "点赞" },
    { icon: Share2, count: "856", label: "分享" },
    { icon: Users, count: "1.2K", label: "新用户" },
    { icon: Star, count: "4.8", label: "评分" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            喵喵美颜 - 社交裂变机制
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          通过朋友邀请、协作拼图、分享传播的社交病毒式增长流程
        </p>
      </div>

      {/* Viral Growth Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {viralIndicators.map((indicator, index) => (
          <Card key={index} className="p-4 bg-gradient-to-br from-white to-pink-50 border-pink-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <indicator.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">{indicator.count}</div>
                <div className="text-sm text-gray-600">{indicator.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Flow Diagram */}
      <div className="relative">
        {/* Flow Steps */}
        <div className="space-y-8">
          {flowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Step Card */}
              <div className="flex items-center gap-6">
                {/* Step Number and Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      步骤 {step.id}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <Card className="flex-1 p-6 bg-gradient-to-r from-white to-gray-50 border-l-4 border-pink-400">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
                      <p className="text-pink-600 mb-2">{step.subtitle}</p>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                      
                      {/* Social Indicators */}
                      <div className="flex gap-2 mt-3">
                        {step.id <= 3 && (
                          <>
                            <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                              <MessageCircle className="w-3 h-3 mr-1" />
                              社交互动
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                              <Zap className="w-3 h-3 mr-1" />
                              病毒传播
                            </Badge>
                          </>
                        )}
                        {step.id >= 4 && (
                          <>
                            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
                              <Gift className="w-3 h-3 mr-1" />
                              奖励激励
                            </Badge>
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                              <Star className="w-3 h-3 mr-1" />
                              用户留存
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Mobile Screen Mockup */}
                    {step.mobile && (
                      <div className="ml-6 flex-shrink-0">
                        <div className="w-24 h-40 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-1 shadow-lg">
                          <div className="w-full h-full bg-gradient-to-b from-pink-100 to-purple-100 rounded-lg flex flex-col items-center justify-center">
                            <Smartphone className="w-6 h-6 text-gray-600 mb-1" />
                            <div className="text-xs text-gray-600 text-center px-1">
                              {step.title}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>

              {/* Arrow to Next Step */}
              {index < flowSteps.length - 1 && (
                <div className="flex justify-center my-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                    <ArrowDown className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Viral Growth Visualization */}
        <div className="mt-12 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200">
          <h3 className="text-lg font-semibold text-center mb-6 text-gray-800">
            病毒式增长效果
          </h3>
          
          <div className="flex items-center justify-center space-x-4">
            {/* User Growth Rings */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-400 rounded-full flex items-center justify-center opacity-30 animate-pulse">
                <div className="w-24 h-24 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center opacity-60">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-800">+</span>
              </div>
            </div>

            <ArrowRight className="w-6 h-6 text-pink-500" />

            {/* Growth Metrics */}
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600 mb-1">3.2倍</div>
              <div className="text-sm text-gray-600">增长倍数</div>
            </div>

            <ArrowRight className="w-6 h-6 text-pink-500" />

            {/* Final Result */}
            <div className="text-center bg-white rounded-lg p-4 shadow-md border border-pink-200">
              <div className="text-xl font-bold text-purple-600 mb-1">50K+</div>
              <div className="text-sm text-gray-600">月活用户</div>
              <div className="flex justify-center mt-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}