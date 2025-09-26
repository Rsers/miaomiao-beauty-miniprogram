import { Settings, User, Bell, Shield, HelpCircle, MessageSquare, LogOut, ChevronRight } from 'lucide-react';

export function SettingsMenu() {
  const settingsItems = [
    { icon: User, label: '个人资料', color: 'text-blue-600' },
    { icon: Bell, label: '消息通知', color: 'text-green-600' },
    { icon: Shield, label: '隐私设置', color: 'text-purple-600' },
    { icon: MessageSquare, label: '意见反馈', color: 'text-orange-600' },
    { icon: HelpCircle, label: '帮助中心', color: 'text-pink-600' },
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
      <h3 className="text-lg font-medium text-gray-800 mb-4">设置与帮助</h3>
      
      <div className="space-y-3">
        {settingsItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-gray-800">{item.label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
        
        {/* Logout button */}
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <LogOut className="w-4 h-4 text-red-600" />
            </div>
            <span className="text-red-600">退出登录</span>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </div>
      </div>
    </div>
  );
}