import { Star, MessageCircle, Heart, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SocialProof() {
  const testimonials = [
    {
      id: 1,
      name: '小美喵',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
      text: '通过邀请朋友已经赚了2000多元！',
      earnings: '¥2,156',
      rating: 5
    },
    {
      id: 2,
      name: '美颜达人',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      text: '朋友们都很喜欢这个APP，推广很容易',
      earnings: '¥1,888',
      rating: 5
    }
  ];

  const achievements = [
    { icon: Star, label: '5星好评', value: '98%', color: 'text-yellow-500' },
    { icon: Heart, label: '用户满意度', value: '99%', color: 'text-red-500' },
    { icon: TrendingUp, label: '推荐率', value: '95%', color: 'text-green-500' }
  ];

  return (
    <div className="mx-4 mt-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <MessageCircle className="w-5 h-5 text-pink-500" />
        <h3 className="text-pink-600">用户好评</h3>
      </div>
      
      {/* Testimonials */}
      <div className="space-y-3 mb-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              <ImageWithFallback
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-gray-900">{testimonial.name}</span>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{testimonial.text}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                    累计收益: {testimonial.earnings}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Achievement stats */}
      <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4">
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <achievement.icon className={`w-6 h-6 ${achievement.color} mx-auto mb-1`} />
              <div className="text-sm text-gray-900">{achievement.value}</div>
              <div className="text-xs text-gray-500">{achievement.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}