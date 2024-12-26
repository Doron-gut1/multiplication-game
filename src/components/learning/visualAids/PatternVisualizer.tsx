// src/components/learning/visualAids/PatternVisualizer.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PatternVisualizerProps } from '../../../types/tutorial';

interface ExtendedPatternVisualizerProps extends PatternVisualizerProps {
  onAnimationComplete?: () => void;
}

export const PatternVisualizer: React.FC<ExtendedPatternVisualizerProps> = ({
  pattern,
  highlightInterval = 5,
  animate = true,
  onAnimationComplete
}) => {
  const [activeNumbers, setActiveNumbers] = useState<number[]>([]);
  const numbers = pattern.split(',').map(Number);
  const boxSize = 50;
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setActiveNumbers(prev => {
            if (prev.length < numbers.length) {
              return [...prev, prev.length];
            }
            clearInterval(interval);
            onAnimationComplete?.();
            return prev;
          });
        }, 500);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setActiveNumbers(numbers.map((_, i: number) => i));
    }
  }, [animate, numbers.length, onAnimationComplete, numbers]);

  const getHighlightColor = (num: number): string => {
    if (num % highlightInterval === 0) {
      return 'rgb(59, 130, 246)'; // כחול
    }
    return 'rgb(156, 163, 175)'; // אפור
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex gap-2 mb-4 overflow-x-auto p-4">
        {numbers.map((num: number, index: number) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: activeNumbers.includes(index) ? 1 : 0,
              opacity: activeNumbers.includes(index) ? 1 : 0
            }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex-shrink-0"
          >
            <div
              className="rounded-lg flex items-center justify-center text-white font-bold"
              style={{
                width: boxSize,
                height: boxSize,
                backgroundColor: getHighlightColor(num)
              }}
            >
              {num}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: activeNumbers.length === numbers.length ? 1 : 0 }}
        className="text-center text-gray-600"
      >
        <p className="text-lg">
          {`כל ${highlightInterval} מספרים מודגשים בכחול`}
        </p>
        {pattern.startsWith('5,10,15') && (
          <p className="text-sm mt-2">
            שים לב: כל המספרים מסתיימים ב-0 או ב-5
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default PatternVisualizer;