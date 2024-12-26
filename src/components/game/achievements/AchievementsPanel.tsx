// src/components/game/achievements/AchievementsPanel.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Draggable from 'react-draggable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Achievement } from '../../../types/rewards';
import { Star, Award, Medal, Trophy, X, GripHorizontal } from 'lucide-react';

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  isOpen,
  onClose,
  achievements
}) => {
  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'streak':
        return <Trophy className="text-yellow-500" size={24} />;
      case 'score':
        return <Medal className="text-blue-500" size={24} />;
      case 'collection':
        return <Star className="text-purple-500" size={24} />;
      default:
        return <Award className="text-green-500" size={24} />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Draggable handle=".dialog-handle">
          <DialogContent className="relative max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden h-[600px]">
            <DialogHeader className="border-b pb-4 px-6 pt-4">
              <div className="dialog-handle flex items-center justify-between cursor-move">
                <GripHorizontal className="h-6 w-6 text-gray-400" />
                <DialogTitle className="text-2xl font-bold text-gray-900 text-right flex-grow pl-10">
                  הישגים
                </DialogTitle>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </DialogHeader>

            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-2 ${
                      achievement.isCompleted
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-lg mb-1 text-gray-900">
                          {achievement.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {achievement.description}
                        </p>
                        
                        {/* פרוגרס בר */}
                        <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="absolute top-0 left-0 h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: `${(achievement.progress / achievement.requirement.value) * 100}%`
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                        
                        <div className="flex justify-between mt-2 text-sm">
                          <span className="text-gray-600">
                            {achievement.progress} / {achievement.requirement.value}
                          </span>
                          {achievement.isCompleted && (
                            <span className="text-green-600 font-bold">הושלם!</span>
                          )}
                        </div>

                        {/* תגמול */}
                        {achievement.reward && (
                          <div className="mt-2 flex gap-2">
                            <span className="text-sm text-gray-600">תגמול:</span>
                            <div className="flex gap-2">
                              {achievement.reward.coins && (
                                <span className="flex items-center gap-1 text-yellow-600">
                                  <Award size={16} />
                                  {achievement.reward.coins}
                                </span>
                              )}
                              {achievement.reward.stars && (
                                <span className="flex items-center gap-1 text-blue-600">
                                  <Star size={16} />
                                  {achievement.reward.stars}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </DialogContent>
        </Draggable>
      </div>
    </Dialog>
  );
};

export default AchievementsPanel;