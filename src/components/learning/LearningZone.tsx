// src/components/learning/LearningZone.tsx
import React, { useState } from 'react';
import TipsLibrary from './TipsLibrary';
import Tutorial from './Tutorial';
import GoldenRules from './GoldenRules';

type LearningTab = 'tips' | 'tutorial' | 'rules';

const LearningZone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearningTab>('tutorial');

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* כותרת ותפריט ניווט */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">אזור הלמידה</h2>
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-4 py-2 ${
              activeTab === 'tutorial'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            הדרכה
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 ${
              activeTab === 'tips'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            טיפים וטריקים
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 ${
              activeTab === 'rules'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-500'
            }`}
          >
            כללי הזהב
          </button>
        </div>
      </div>

      {/* תוכן הטאב הפעיל */}
      <div className="p-4">
        {activeTab === 'tutorial' && <Tutorial />}
        {activeTab === 'tips' && <TipsLibrary />}
        {activeTab === 'rules' && <GoldenRules />}
      </div>
    </div>
  );
};

export default LearningZone;