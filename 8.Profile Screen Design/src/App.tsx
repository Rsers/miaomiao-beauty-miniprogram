import { UserProfileCard } from './components/UserProfileCard';
import { MembershipCard } from './components/MembershipCard';
import { FunctionMenu } from './components/FunctionMenu';
import { StatsCard } from './components/StatsCard';
import { AchievementCard } from './components/AchievementCard';
import { SettingsMenu } from './components/SettingsMenu';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-pink-200 to-purple-200">
      {/* Mobile container */}
      <div className="max-w-sm mx-auto bg-gradient-to-br from-pink-300 via-pink-200 to-purple-200">
        {/* Status bar placeholder */}
        <div className="h-12 flex items-center justify-between px-6 pt-2">
          <div className="flex items-center space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <span className="text-white text-sm font-medium">喵喵美颜</span>
          <div className="flex items-center space-x-1">
            <span className="text-white text-xs">100%</span>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-full h-full bg-white rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="px-4 pb-8 space-y-0">
          <UserProfileCard />
          <MembershipCard />
          <StatsCard />
          <FunctionMenu />
          <AchievementCard />
          <SettingsMenu />
        </div>
      </div>
    </div>
  );
}