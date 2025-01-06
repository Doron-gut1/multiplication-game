import React from 'react';
import { motion } from 'framer-motion';

export const Cloud: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    className="absolute"
    initial={{ x: -100, opacity: 0 }}
    animate={{
      x: ['100vw', '-20vw'],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: 'linear'
    }}
  >
    ☁️
  </motion.div>
);

export const Butterfly: React.FC<{ startPosition: { x: number; y: number } }> = ({ startPosition }) => (
  <motion.div
    className="absolute text-lg"
    initial={startPosition}
    animate={{
      y: [startPosition.y, startPosition.y - 50, startPosition.y],
      x: [startPosition.x, startPosition.x + 100, startPosition.x],
      rotate: [0, 10, -10, 0]
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut'
    }}
  >
    🦋
  </motion.div>
);

export const Grass: React.FC = () => (
  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-300 to-green-200" />
);

const Decorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <Cloud delay={0} />
      <Cloud delay={7} />
      <Cloud delay={14} />
      
      <Butterfly startPosition={{ x: 50, y: 100 }} />
      <Butterfly startPosition={{ x: 200, y: 150 }} />
      
      <Grass />
    </div>
  );
};

export default Decorations;