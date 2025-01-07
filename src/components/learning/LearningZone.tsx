import React, { useState } from 'react';

type LearningTab = 'tips' | 'tutorial' | 'rules';

const LearningZone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearningTab>('tutorial');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">אזור הלמידה</h2>
        <div className="flex gap-4 border-b">
          <button
            onClick={() => setActiveTab('tutorial')}
            className={`px-4 py-2 ${activeTab === 'tutorial' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            הדרכה
          </button>
          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2 ${activeTab === 'tips' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            טיפים וטריקים
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 ${activeTab === 'rules' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          >
            כללי הזהב
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'tutorial' && (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">הדרכת לוח הכפל</h3>
            <p>בקרוב תוכלו ללמוד את לוח הכפל בדרך חוויתית!</p>
          </div>
        )}
        {activeTab === 'tips' && (
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">טיפים וטריקים</h3>
            <p>בקרוב תוכלו למצוא כאן טיפים שיעזרו לכם ללמוד!</p>
          </div>
        )}
        {activeTab === 'rules' && (
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4">כללי הזהב בלוח הכפל</h3>
            <p>כאן יופיעו הכללים החשובים ביותר!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningZone;