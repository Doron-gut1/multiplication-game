// src/components/game/animations/SuccessAnimation.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Star {
  id: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

const SuccessAnimation: React.FC = () => {
  // יוצר 10 כוכבים במיקומים רנדומליים
  const stars: Star[] = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 200 - 100, // בין 100- ל-100
    y: Math.random() * 200 - 100, // בין 100- ל-100
    scale: Math.random() * 0.5 + 0.5, // בין 0.5 ל-1
    rotation: Math.random() * 360 // סיבוב רנדומלי
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          initial={{ 
            opacity: 0,
            scale: 0,
            x: 0,
            y: 0,
            rotate: 0
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, star.scale, 0],
            x: [0, star.x, star.x * 2],
            y: [0, star.y, star.y * 2],
            rotate: [0, star.rotation, star.rotation * 2]
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          className="absolute left-1/2 top-1/2 text-yellow-400 text-2xl"
        >
          ⭐
        </motion.div>
      ))}
    </div>
  );
};

export default SuccessAnimation;