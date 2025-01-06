import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AudioService } from '../../services/AudioService';

interface AnimationContextType {
  showSuccessAnimation: () => void;
  showErrorAnimation: () => void;
  showAchievementAnimation: () => void;
  showRewardAnimation: (amount: number, type: 'coins' | 'stars' | 'xp') => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

interface AnimationProviderProps {
  children: React.ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [achievementVisible, setAchievementVisible] = useState(false);
  const [rewardAnimation, setRewardAnimation] = useState<{
    amount: number;
    type: 'coins' | 'stars' | 'xp';
    visible: boolean;
  }>({ amount: 0, type: 'coins', visible: false });

  const showSuccessAnimation = useCallback(() => {
    setSuccessVisible(true);
    AudioService.playSound('correct');
    setTimeout(() => setSuccessVisible(false), 1500);
  }, []);

  const showErrorAnimation = useCallback(() => {
    setErrorVisible(true);
    AudioService.playSound('incorrect');
    setTimeout(() => setErrorVisible(false), 1500);
  }, []);

  const showAchievementAnimation = useCallback(() => {
    setAchievementVisible(true);
    AudioService.playSound('achievement');
    setTimeout(() => setAchievementVisible(false), 2000);
  }, []);

  const showRewardAnimation = useCallback((amount: number, type: 'coins' | 'stars' | 'xp') => {
    setRewardAnimation({ amount, type, visible: true });
    AudioService.playSound('reward');
    setTimeout(() => setRewardAnimation(prev => ({ ...prev, visible: false })), 1500);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        showSuccessAnimation,
        showErrorAnimation,
        showAchievementAnimation,
        showRewardAnimation
      }}
    >
      {children}

      <AnimatePresence>
        {/* אנימציית הצלחה */}
        {successVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl"
            >
              ✅
            </motion.div>
          </motion.div>
        )}

        {/* אנימציית שגיאה */}
        {errorVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.5 }}
              className="text-6xl"
            >
              ❌
            </motion.div>
          </motion.div>
        )}

        {/* אנימציית הישג */}
        {achievementVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-6 py-3 rounded-full shadow-lg"
          >
            🎆 הישג חדש! 🎉
          </motion.div>
        )}

        {/* אנימציית תגמול */}
        {rewardAnimation.visible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: [-50, -100],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 1.5 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 text-2xl font-bold"
          >
            +{rewardAnimation.amount} {rewardAnimation.type === 'coins' ? '💰' : rewardAnimation.type === 'stars' ? '⭐' : 'XP'}
          </motion.div>
        )}
      </AnimatePresence>
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};