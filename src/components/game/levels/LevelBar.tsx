import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Trophy } from 'lucide-react';
import type { LevelProgress } from '../../../types/levelSystem';

interface LevelBarProps {
  progress: LevelProgress;
  showAnimation?: boolean;
}

const LevelBar: React.FC<LevelBarProps> = ({ progress, showAnimation = false }) => {
  const progressPercentage = (progress.currentXP / progress.xpToNextLevel) * 100;
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
      {/* Level Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-blue-500" />
          <span className="font-bold text-xl text-gray-900">
            רמה {progress.currentLevel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">
            {progress.currentXP} / {progress.xpToNextLevel} XP
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Level Up Animation */}
        <AnimatePresence>
          {showAnimation && (
            <>
              {/* Spark Effect */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-white opacity-50" />
              </motion.div>

              {/* Stars Effect */}
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ 
                    x: "50%", 
                    y: "50%", 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: [
                      "50%", 
                      `${50 + (Math.random() * 100 - 50)}%`
                    ],
                    y: [
                      "50%", 
                      `${50 + (Math.random() * 100 - 50)}%`
                    ],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    delay: i * 0.1 
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Multipliers Display */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="bg-blue-50 p-2 rounded-md text-center">
          <span className="block text-blue-600 font-semibold">XP x{progress.activeMultipliers.xp}</span>
          <span className="text-gray-500">מכפיל נקודות</span>
        </div>
        <div className="bg-yellow-50 p-2 rounded-md text-center">
          <span className="block text-yellow-600 font-semibold">מטבעות x{progress.activeMultipliers.coins}</span>
          <span className="text-gray-500">מכפיל מטבעות</span>
        </div>
        <div className="bg-purple-50 p-2 rounded-md text-center">
          <span className="block text-purple-600 font-semibold">כוכבים x{progress.activeMultipliers.stars}</span>
          <span className="text-gray-500">מכפיל כוכבים</span>
        </div>
      </div>

      {/* Unlocked Perks */}
      {progress.unlockedPerks.length > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <h4 className="font-semibold text-green-800 mb-2">הטבות פעילות:</h4>
          <div className="flex flex-wrap gap-2">
            {progress.unlockedPerks.map((perk, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                {perk}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelBar;