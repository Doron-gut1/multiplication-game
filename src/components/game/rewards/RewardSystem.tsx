// src/components/game/rewards/RewardSystem.tsx
import React from 'react';
import { Star, Coins } from 'lucide-react';
import { PlayerState } from '../../../types/rewards';

interface RewardSystemProps {
  playerState: PlayerState;
}

const RewardSystem: React.FC<RewardSystemProps> = ({ playerState }) => {
  return (
    <div className="mb-4 flex justify-end gap-4">
      {/* תצוגת מטבעות */}
      <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full shadow">
        <span className="font-bold">{playerState.currency.coins}</span>
        <Coins size={20} />
      </div>

      {/* תצוגת כוכבים */}
      <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full shadow">
        <span className="font-bold">{playerState.currency.stars}</span>
        <Star size={20} />
      </div>
    </div>
  );
};

export default RewardSystem;