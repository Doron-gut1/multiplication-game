import React, { useState } from 'react';
import { GameZone } from './';
import LearningZone from '../learning/LearningZone';

type GameState = 'learning' | 'playing' | 'progress';

const GameManager: React.FC = () => {
  const [currentState, setCurrentState] = useState<GameState>('learning');

  const switchState = (newState: GameState) => {
    setCurrentState(newState);
  };

  return (
    <div className="w-full h-full p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">חווה מתמטית</h1>
      </div>

      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => switchState('learning')}
          className={`px-4 py-2 rounded transition-colors ${
            currentState === 'learning' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          אזור למידה
        </button>
        <button 
          onClick={() => switchState('playing')}
          className={`px-4 py-2 rounded transition-colors ${
            currentState === 'playing' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          משחק
        </button>
        <button 
          onClick={() => switchState('progress')}
          className={`px-4 py-2 rounded transition-colors ${
            currentState === 'progress' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          התקדמות
        </button>
      </div>

      <div className="border rounded-lg p-4">
        {currentState === 'learning' && <LearningZone />}
        {currentState === 'playing' && <div>GameZone will be added soon</div>}
        {currentState === 'progress' && (
          <div className="bg-white rounded-lg p-6 text-center text-gray-600">
            אזור ההתקדמות יפותח בקרוב
          </div>
        )}
      </div>
    </div>
  );
};

export default GameManager;