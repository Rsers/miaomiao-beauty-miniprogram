import { ReferralHeader } from './components/ReferralHeader';
import { InviteCode } from './components/InviteCode';
import { StatsRow } from './components/StatsRow';
import { VipGiftCards } from './components/VipGiftCards';
import { RewardTiers } from './components/RewardTiers';
import { SocialProof } from './components/SocialProof';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Mobile container */}
      <div className="max-w-sm mx-auto bg-white min-h-screen relative">
        {/* Header with earnings display */}
        <ReferralHeader />
        
        {/* Invite code section */}
        <InviteCode />
        
        {/* Statistics row */}
        <StatsRow />
        
        {/* VIP Gift cards */}
        <VipGiftCards />
        
        {/* Reward tiers */}
        <RewardTiers />
        
        {/* Social proof */}
        <SocialProof />
        
        {/* Toast notifications */}
        <Toaster position="top-center" />
      </div>
    </div>
  );
}