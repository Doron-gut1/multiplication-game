// src/components/learning/GoldenRules.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { goldenRules } from '../../data/goldenRulesData';
import VisualAidManager from './visualAids/VisualAidManager';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { VisualAidType, GridProps, NumberLineProps, PatternVisualizerProps } from '../../types/tutorial';

const GoldenRules: React.FC = () => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentRule = goldenRules[currentRuleIndex];

  const getPropsForVisualType = (
    type: VisualAidType,
    props: GridProps | NumberLineProps | PatternVisualizerProps
  ): GridProps | NumberLineProps | PatternVisualizerProps => {
    switch (type) {
      case 'grid':
        return props as GridProps;
      case 'numberLine':
        return props as NumberLineProps;
      case 'pattern':
        return props as PatternVisualizerProps;
      default:
        return props;
    }
  };

  const handleNext = () => {
    if (currentRuleIndex < goldenRules.length - 1) {
      setCurrentRuleIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentRuleIndex > 0) {
      setCurrentRuleIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">
            כלל {currentRuleIndex + 1} מתוך {goldenRules.length}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentRuleIndex + 1) / goldenRules.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Rule Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentRule.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent className="p-6 space-y-6 bg-white">
              {/* כותרת ותיאור */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-right text-gray-900">
                  {currentRule.title}
                </h3>
                <p className="text-gray-600 text-right">
                  {currentRule.description}
                </p>
              </div>

              {/* תרגיל לדוגמה */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-center">
                <div className="text-xl font-mono font-bold text-gray-900">
                  {currentRule.example}
                </div>
              </div>

              {/* הדגמה ויזואלית */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <VisualAidManager
                  type={currentRule.visualType}
                  props={getPropsForVisualType(currentRule.visualType, currentRule.visualProps)}
                  onAnimationComplete={() => setIsAnimating(false)}
                />
              </div>

              {/* טיפים */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-2 text-right">טיפים:</h4>
                <ul className="list-disc list-inside space-y-2 text-right">
                  {currentRule.tips.map((tip: string, index: number) => (
                    <li key={index} className="text-gray-700">{tip}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentRuleIndex === 0 || isAnimating}
          variant="outline"
        >
          הקודם
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentRuleIndex === goldenRules.length - 1 || isAnimating}
          variant="default"
        >
          הבא
        </Button>
      </div>
    </div>
  );
};

export default GoldenRules;