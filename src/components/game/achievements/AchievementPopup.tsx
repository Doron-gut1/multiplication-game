// src/components/game/achievements/AchievementPopup.tsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Achievement } from '../../../types/rewards';
import { Award, Star, Trophy } from 'lucide-react';

interface AchievementPopupProps {
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({
  achievement,
  onClose
}) => {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // נסגר אוטומטית אחרי 5 שניות

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  const getAchievementIcon = () => {
    if (!achievement) return null;

    switch (achievement.type) {
      case 'streak':
        return <Trophy className="text-yellow-500 w-8 h-8" />;
      case 'score':
        return <Award className="text-blue-500 w-8 h-8" />;
      case 'collection':
      case 'special':
        return <Star className="text-purple-500 w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed left-1/2 bottom-8 z-50"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* רצועת הישג חדש */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2">
              <span className="text-white font-bold">הישג חדש!</span>
            </div>

            {/* תוכן ההישג */}
            <div className="p-6 flex gap-4">
              {/* אייקון */}
              <div className="flex-shrink-0">
                {getAchievementIcon()}
              </div>

              {/* פרטים */}
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{achievement.name}</h3>
                <p className="text-gray-600">{achievement.description}</p>

                {/* תגמולים */}
                {achievement.reward && (
                  <div className="flex gap-4 mt-2">
                    {achievement.reward.coins && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-1 text-yellow-600"
                      >
                        <Award className="w-5 h-5" />
                        <span>+{achievement.reward.coins}</span>
                      </motion.div>
                    )}
                    {achievement.reward.stars && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-1 text-blue-600"
                      >
                        <Star className="w-5 h-5" />
                        <span>+{achievement.reward.stars}</span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* אפקטי קונפטי */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    opacity: 1,
                    scale: 0,
                    x: 0,
                    y: 0,
                    rotate: 0
                  }}
                  animate={{
                    opacity: [1, 0],
                    scale: [0, 1],
                    x: [0, (Math.random() - 0.5) * 200],
                    y: [0, (Math.random() - 0.5) * 200],
                    rotate: [0, Math.random() * 360]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.02
                  }}
                  className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full"
                  style={{
                    background: i % 2 === 0 ? '#3B82F6' : '#8B5CF6',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementPopup;