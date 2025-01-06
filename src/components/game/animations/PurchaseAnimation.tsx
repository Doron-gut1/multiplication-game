import React from 'react';
import { motion } from 'framer-motion';

interface PurchaseAnimationProps {
  item: {
    icon: string;
    name: string;
  };
  onComplete: () => void;
}

export const PurchaseAnimation: React.FC<PurchaseAnimationProps> = ({ item, onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Central animation */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {/* Icon animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{
            scale: [0, 1.5, 1],
            rotate: [-180, 0]
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-6xl mb-4"
        >
          {item.icon}
        </motion.div>

        {/* Text animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white text-2xl font-bold"
        >
          {item.name} נוסף לאוסף שלך!
        </motion.div>

        {/* Sparkles */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 bg-yellow-400 rounded-full"
              initial={{ scale: 0 }}
              animate={{
                x: [0, Math.cos(angle) * 100],
                y: [0, Math.sin(angle) * 100],
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default PurchaseAnimation;