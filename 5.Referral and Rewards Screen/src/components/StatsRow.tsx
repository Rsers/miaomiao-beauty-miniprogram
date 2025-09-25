import { Users, UserCheck, Coins } from 'lucide-react';

export function StatsRow() {
  const stats = [
    {
      icon: Users,
      label: '已邀请',
      value: '12',
      unit: '人',
      color: 'text-blue-500'
    },
    {
      icon: UserCheck,
      label: '活跃用户',
      value: '8',
      unit: '人',
      color: 'text-green-500'
    },
    {
      icon: Coins,
      label: '本月收益',
      value: '588',
      unit: '元',
      color: 'text-yellow-500'
    }
  ];

  return (
    <div className="mx-4 mt-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="text-lg text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.unit}</div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}