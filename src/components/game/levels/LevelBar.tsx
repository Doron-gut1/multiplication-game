import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Gift } from 'lucide-react';
import { Level, LevelPerk, LevelProgress } from '../../../types/levelSystem';

interface LevelBarProps {
  level: Level;
  progress: LevelProgress;
  onPerkUnlock?: (perk: LevelPerk) => void;
}

const LevelBar: React.FC<LevelBarProps> = ({ level, progress, onPerkUnlock }) => {
  const perkIcons = {
    bonus: <Star className="text-yellow-500" size={20} />,
    unlock: <Trophy className="text-purple-500" size={20} />,
    reward: <Gift className="text-blue-500" size={20} />
  };

  const renderPerk = (perk: LevelPerk, index: number) => {
    const perkPosition = (index + 1) * (100 / (level.perks.length + 1));
    const isPerkUnlocked = progress.progress >= perkPosition;

    return (
      <motion.div
        key={perk.id}
        className="absolute top-0"
        style={{ left: `${perkPosition}%` }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: isPerkUnlocked ? -25 : -10, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <div 
          className={`p-2 rounded-full ${isPerkUnlocked ? 'bg-white' : 'bg-gray-200'} shadow-md cursor-help
            transition-colors duration-200`}
          onClick={() => isPerkUnlocked && onPerkUnlock?.(perk)}
        >
          {perkIcons[perk.type as keyof typeof perkIcons]}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full space-y-4">
      {/* רמה נוכחית */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            {level.title}
          </h3>
          <p className="text-sm text-gray-600">
            רמה {level.number}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">
            {progress.currentXP} / {progress.nextLevelXP} XP
          </p>
          <p className="text-xs text-gray-500">
            סה"כ XP: {progress.totalXP}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="overflow-hidden h-6 text-xs flex rounded-full bg-blue-100">
          <motion.div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress.progress}%` }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-2">{progress.progress}%</span>
          </motion.div>
        </div>

        {/* Perk Indicators */}
        {level.perks.map(renderPerk)}
      </div>
    </div>
  );
};

export default LevelBar;