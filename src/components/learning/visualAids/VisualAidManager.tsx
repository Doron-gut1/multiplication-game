// src/components/learning/visualAids/VisualAidManager.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MultiplicationGrid from './MultiplicationGrid';
import NumberLine from './NumberLine';
import PatternVisualizer from './PatternVisualizer';
import { VisualAidType, GridProps, NumberLineProps, PatternVisualizerProps } from '../../../types/tutorial';

interface VisualAidManagerProps {
  type: VisualAidType;
  props: GridProps | NumberLineProps | PatternVisualizerProps;
  onAnimationComplete?: () => void;
}

const VisualAidManager: React.FC<VisualAidManagerProps> = ({
  type,
  props,
  onAnimationComplete
}) => {
  const renderVisualAid = () => {
    switch (type) {
      case 'grid':
        if ('rows' in props && 'columns' in props) {
          return (
            <MultiplicationGrid 
              {...(props as GridProps)}
              onAnimationComplete={onAnimationComplete}
            />
          );
        }
        return null;
      
      case 'numberLine':
        if ('number' in props) {
          return (
            <NumberLine 
              {...(props as NumberLineProps)}
              onAnimationComplete={onAnimationComplete}
            />
          );
        }
        return null;
      
      case 'pattern':
        if ('pattern' in props) {
          return (
            <PatternVisualizer 
              {...(props as PatternVisualizerProps)}
              onAnimationComplete={onAnimationComplete}
            />
          );
        }
        return null;
      
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="rounded-lg" // הסרנו את הרקע הלבן מכאן
      >
        {renderVisualAid()}
      </motion.div>
    </AnimatePresence>
  );
};

export default VisualAidManager;