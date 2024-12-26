// src/components/learning/visualAids/NumberLine.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NumberLineProps {
  number: number;
  repeat?: number;
  animate?: boolean;
  onAnimationComplete?: () => void;
}

export const NumberLine: React.FC<NumberLineProps> = ({
  number,
  repeat = 1,
  animate = true,
  onAnimationComplete
}) => {
  const [activeNumbers, setActiveNumbers] = useState(0);
  
  const lineWidth = 600;
  const numberSpacing = lineWidth / (repeat + 1);
  const numberRadius = 20;
  
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setActiveNumbers(prev => {
            if (prev < repeat) {
              return prev + 1;
            }
            clearInterval(interval);
            onAnimationComplete?.();
            return prev;
          });
        }, 1000);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setActiveNumbers(repeat);
    }
  }, [animate, repeat, onAnimationComplete]);

  return (
    <div className="flex justify-center items-center p-4">
      <svg width={lineWidth} height="120" className="rounded-lg">
        <line
          x1="40"
          y1="60"
          x2={lineWidth - 40}
          y2="60"
          stroke="black"
          strokeWidth="2"
        />
        
        {Array.from({ length: repeat }).map((_, index) => {
          const x = numberSpacing * (index + 1);
          const isActive = index < activeNumbers;
          
          return (
            <g key={index}>
              <line
                x1={x}
                y1="55"
                x2={x}
                y2="65"
                stroke="black"
                strokeWidth="2"
              />
              
              <motion.circle
                cx={x}
                cy="60"
                r={numberRadius}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isActive ? 1 : 0,
                  fill: isActive ? 'rgb(59, 130, 246)' : 'rgb(255, 255, 255)'
                }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              />
              
              <motion.text
                x={x}
                y="65"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ delay: index * 0.2 + 0.1 }}
                className="text-white font-bold"
              >
                {number}
              </motion.text>
            </g>
          );
        })}
        
        <motion.text
          x={lineWidth / 2}
          y="100"
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: activeNumbers === repeat ? 1 : 0 }}
          className="text-gray-600 text-lg"
        >
          {`${number} × ${repeat} = ${number * repeat}`}
        </motion.text>
      </svg>
    </div>
  );
};

export default NumberLine;