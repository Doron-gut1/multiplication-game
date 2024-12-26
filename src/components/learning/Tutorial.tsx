// src/components/learning/Tutorial.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { tutorialSteps } from '../../data/tutorialSteps';
import { TutorialState, TutorialProps } from '../../types/tutorial';
import VisualAidManager from './visualAids/VisualAidManager';

const Tutorial: React.FC<TutorialProps> = ({ onComplete }) => {
  const [state, setState] = useState<TutorialState>({
    currentStep: 1,
    totalSteps: tutorialSteps.length,
    status: 'not_started',
    completedSteps: []
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Debugging logs
  useEffect(() => {
    console.log('Current step:', state.currentStep);
    console.log('Current tutorial data:', tutorialSteps[state.currentStep - 1]);
  }, [state.currentStep]);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      status: 'in_progress'
    }));
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    
    if (state.currentStep < state.totalSteps) {
      setState(prev => ({
        ...prev,
        currentStep: prev.currentStep + 1,
        completedSteps: [...prev.completedSteps, prev.currentStep]
      }));
    } else {
      setState(prev => ({
        ...prev,
        status: 'completed',
        completedSteps: [...prev.completedSteps, prev.currentStep]
      }));
      onComplete?.();
    }
  };

  const handlePrevious = () => {
    if (isAnimating || state.currentStep === 1) return;
    
    setState(prev => ({
      ...prev,
      currentStep: prev.currentStep - 1
    }));
  };

  const currentTutorialStep = tutorialSteps[state.currentStep - 1];

  // בדיקה שהצעד הנוכחי קיים
  if (!currentTutorialStep) {
    console.error('Could not find tutorial step:', state.currentStep);
    return <div>שגיאה בטעינת שלב ההדרכה</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Indicator */}
      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          שלב {state.currentStep} מתוך {state.totalSteps}
        </div>
        <div className="flex gap-2">
          {Array.from({ length: state.totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-3 rounded-full ${
                idx + 1 <= state.currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Tutorial Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 bg-white">
            <h3 className="text-2xl font-bold mb-4 text-right text-gray-900">
              {currentTutorialStep.title}
            </h3>
            <p className="text-gray-600 mb-6 text-right">
              {currentTutorialStep.content}
            </p>
            
            <div className="h-64">
              <VisualAidManager
                type={currentTutorialStep.visualAid.type}
                props={currentTutorialStep.visualAid.props}
                onAnimationComplete={() => setIsAnimating(false)}
              />
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={state.currentStep === 1 || isAnimating}
          variant="outline"
        >
          הקודם
        </Button>
        <Button
          onClick={handleNext}
          disabled={isAnimating}
          variant="default"
        >
          {state.currentStep === state.totalSteps ? 'סיום' : 'הבא'}
        </Button>
      </div>
    </div>
  );
};

export default Tutorial;