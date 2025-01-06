import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundProps {
  timeOfDay?: 'morning' | 'day' | 'evening' | 'night';
}

const Background: React.FC<BackgroundProps> = ({ timeOfDay = 'day' }) => {
  const getBackgroundColors = () => {
    switch (timeOfDay) {
      case 'morning':
        return ['from-orange-200', 'to-blue-200'];
      case 'day':
        return ['from-blue-200', 'to-blue-400'];
      case 'evening':
        return ['from-orange-300', 'to-purple-400'];
      case 'night':
        return ['from-blue-900', 'to-purple-900'];
      default:
        return ['from-blue-200', 'to-blue-400'];
    }
  };

  const [fromColor, toColor] = getBackgroundColors();

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${fromColor} ${toColor} transition-colors duration-1000`}>
      {timeOfDay === 'day' && (
        <motion.div
          className="absolute top-10 right-10 text-4xl"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          ☀️
        </motion.div>
      )}
      
      {timeOfDay === 'night' && (
        <>
          <motion.div
            className="absolute top-10 right-10 text-4xl"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            🌙
          </motion.div>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white text-sm"
              style={{
                top: `${Math.random() * 60}%`,
                left: `${Math.random() * 100}%`,
              }}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 2
              }}
            >
              ⭐
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
};

export default Background;