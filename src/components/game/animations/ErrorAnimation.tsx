import React from 'react';
import { motion } from 'framer-motion';

export const ErrorAnimation: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* אפקט רעידה */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: [-10, 10, -10, 10, 0],
          rotate: [-5, 5, -5, 5, 0]
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-4xl">❌</div>
      </motion.div>

      {/* אפקט גלים */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{
          scale: [1, 2],
          opacity: [0.5, 0]
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-32 h-32 rounded-full border-4 border-red-500" />
      </motion.div>

      {/* טקסט */}
      <motion.div
        className="absolute left-1/2 top-[60%] -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-xl font-bold text-red-500">נסה שוב!</div>
      </motion.div>
    </div>
  );
};

export default ErrorAnimation;