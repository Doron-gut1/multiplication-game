import React from 'react';
import { motion } from 'framer-motion';
import { Reward } from '../../../types/rewards';

interface RewardAnimationProps {
  reward: Reward;
}

export const RewardAnimation: React.FC<RewardAnimationProps> = ({ reward }) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* אנימציית מטבעות */}
      {Array.from({ length: Math.min(reward.coins / 10, 10) }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2"
          initial={{ x: 0, y: 0, scale: 0, rotate: 0 }}
          animate={{
            x: [(Math.random() - 0.5) * 300, (Math.random() - 0.5) * 500],
            y: [0, window.innerHeight],
            scale: [0, 1, 1],
            rotate: [0, Math.random() * 360]
          }}
          transition={{
            duration: 1 + Math.random(),
            ease: 'easeOut'
          }}
        >
          <div className="text-2xl">🪙</div>
        </motion.div>
      ))}

      {/* הצגת הבונוס */}
      {reward.bonus && (
        <motion.div
          className="absolute left-1/2 top-[40%] -translate-x-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-yellow-100 px-4 py-2 rounded-full shadow-lg">
            <div className="text-yellow-800 font-bold">
              {reward.bonus.type === 'streak' && '🔥 בונוס רצף!'}
              {reward.bonus.type === 'speed' && '⚡ בונוס מהירות!'}
              {reward.bonus.type === 'perfect' && '✨ מושלם!'}
            </div>
            <div className="text-yellow-600">+{reward.bonus.amount}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RewardAnimation;