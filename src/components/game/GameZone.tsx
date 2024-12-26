// src/components/game/GameZone.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store as StoreIcon, Trophy, Star, Coins } from 'lucide-react';
import { Button } from '../ui/button';

import type { Difficulty } from '../../types/tasks';
import type { Achievement, ShopItem } from '../../types/rewards';
import type { PlayerState, GameState } from '../../types/gameState';

import FarmArea from './farm/FarmArea';
import { TaskGenerator } from './tasks/TaskGenerator';
import SuccessAnimation from './animations/SuccessAnimation';
import FarmShop from './shop/FarmShop';
import AchievementsPanel from './achievements/AchievementsPanel';
import AchievementPopup from './achievements/AchievementPopup';
import { AchievementsService } from '../../services/AchievementsService';
import { initialPlayerState, initialGameState } from './initialState';

const animalDifficulties: Record<string, Difficulty> = {
  '1': 'easy',     // פרה - קל
  '2': 'medium',   // כבשה - בינוני
  '3': 'hard'      // תרנגול - קשה
};

const GameZone: React.FC = () => {
  // מצב המשחק
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  
  // מצב ממשק המשתמש
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [inputError, setInputError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [lastAchievementStreak, setLastAchievementStreak] = useState<number>(0);

  // בדיקת הישגים
  const checkForNewAchievements = useCallback(() => {
    if (playerState.currentStreak <= lastAchievementStreak) {
      return;
    }

    const unlockedAchievements = AchievementsService.checkAchievements(
      {
        currentStreak: playerState.currentStreak,
        bestStreak: playerState.bestStreak,
        totalCorrectAnswers: playerState.totalCorrectAnswers,
        totalTasksCompleted: playerState.goals.daily.tasksCompleted,
        completedAchievements: playerState.achievements
          .filter(a => a.isCompleted)
          .map(a => a.id),
        level: playerState.level,
        goals: playerState.goals
      },
      playerState.achievements
    );
    
    if (unlockedAchievements.length > 0) {
      setPlayerState(prev => ({
        ...prev,
        achievements: prev.achievements.map(achievement => {
          const unlocked = unlockedAchievements.find(a => a.id === achievement.id);
          return unlocked || achievement;
        }),
        currency: {
          coins: prev.currency.coins + unlockedAchievements.reduce((sum, a) => sum + (a.reward.coins || 0), 0),
          stars: prev.currency.stars + unlockedAchievements.reduce((sum, a) => sum + (a.reward.stars || 0), 0)
        },
        level: {
          ...prev.level,
          xp: prev.level.xp + unlockedAchievements[unlockedAchievements.length - 1].reward.xp
        }
      }));

      setNewAchievement(unlockedAchievements[unlockedAchievements.length - 1]);
      setLastAchievementStreak(playerState.currentStreak);

      setTimeout(() => {
        setNewAchievement(null);
      }, 3000);
    }
  }, [playerState, lastAchievementStreak]);

  useEffect(() => {
    if (playerState.currentStreak > 0 || playerState.totalCorrectAnswers > 0) {
      checkForNewAchievements();
    }
  }, [playerState.currentStreak, playerState.totalCorrectAnswers, checkForNewAchievements]);

  // טיפול בתשובה
  const handleAnswerSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    
    if (!selectedAnimal || !gameState.activeTasks[selectedAnimal]) return;
    
    const currentTask = gameState.activeTasks[selectedAnimal];
    const isCorrect = TaskGenerator.validateAnswer(currentTask, parseInt(userAnswer));

    if (isCorrect) {
      setInputError(false);
      setShowSuccess(true);

      setPlayerState(prev => ({
        ...prev,
        currency: {
          ...prev.currency,
          coins: prev.currency.coins + 10
        },
        currentStreak: prev.currentStreak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.currentStreak + 1),
        totalCorrectAnswers: prev.totalCorrectAnswers + 1,
        goals: {
          ...prev.goals,
          daily: {
            ...prev.goals.daily,
            tasksCompleted: prev.goals.daily.tasksCompleted + 1
          },
          weekly: {
            ...prev.goals.weekly,
            tasksCompleted: prev.goals.weekly.tasksCompleted + 1
          }
        }
      }));

      const updatedTasks = { ...gameState.activeTasks };
      delete updatedTasks[selectedAnimal];
      setGameState(prev => ({
        ...prev,
        activeTasks: updatedTasks
      }));

      setTimeout(() => {
        setUserAnswer('');
        setSelectedAnimal(null);
        setShowSuccess(false);
      }, 1000);
    } else {
      setInputError(true);
      setPlayerState(prev => ({
        ...prev,
        currentStreak: 0
      }));
    }
  }, [selectedAnimal, gameState.activeTasks, userAnswer]);

  // טיפול בלחיצה על חיה
  const handleAnimalClick = useCallback((animalId: string) => {
    setSelectedAnimal(animalId);
    setInputError(false);
    setShowSuccess(false);

    if (!gameState.activeTasks[animalId]) {
      const newTask = TaskGenerator.generateTask(animalDifficulties[animalId], animalId);
      setGameState(prev => ({
        ...prev,
        activeTasks: {
          ...prev.activeTasks,
          [animalId]: newTask
        }
      }));
    }
  }, [gameState.activeTasks]);

  // טיפול ברכישה מהחנות
  const handlePurchase = useCallback((item: ShopItem) => {
    setPlayerState(prev => ({
      ...prev,
      currency: {
        coins: prev.currency.coins - (item.price.coins || 0),
        stars: prev.currency.stars - (item.price.stars || 0)
      },
      inventory: [...prev.inventory, item]
    }));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* כותרת וניקוד */}
      <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900">אזור המשחק</h2>
        <div className="flex gap-4">
          {/* תצוגת מטבעות */}
          <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
            <Coins className="h-5 w-5" />
            <span className="font-bold">{playerState.currency.coins}</span>
          </div>

          {/* תצוגת כוכבים */}
          <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
            <Star className="h-5 w-5" />
            <span className="font-bold">{playerState.currency.stars}</span>
          </div>

          {/* תצוגת רמה ו-XP */}
          <div className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
            <Trophy className="h-5 w-5" />
            <span className="font-bold">רמה {playerState.level.current}</span>
          </div>

          {/* כפתורי ניווט */}
          <Button
            variant="outline"
            onClick={() => setGameState(prev => ({ ...prev, showShop: true }))}
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            <StoreIcon className="ml-2 h-5 w-5" />
            חנות
          </Button>
          <Button
            variant="outline"
            onClick={() => setGameState(prev => ({ ...prev, showAchievements: true }))}
            className="bg-white text-gray-700 hover:bg-gray-100"
          >
            <Trophy className="ml-2 h-5 w-5" />
            הישגים
          </Button>
        </div>
      </div>

      {/* אזור המשחק */}
      {!gameState.isPlaying ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setGameState(prev => ({ ...prev, isPlaying: true }))}
          className="bg-blue-500 text-white px-8 py-4 rounded-lg mx-auto block text-xl font-bold hover:bg-blue-600 transition-colors"
        >
          התחל משחק
        </motion.button>
      ) : (
        <div className="space-y-6">
          {/* אזור החווה */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FarmArea 
              onAnimalClick={handleAnimalClick}
              activeTasks={gameState.activeTasks}
              playerItems={playerState.inventory}
            />
          </div>

          {/* טופס תשובה */}
          {selectedAnimal && gameState.activeTasks[selectedAnimal] && (
            <form onSubmit={handleAnswerSubmit} className="text-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
              <div>
                <label className="block text-xl font-bold text-gray-900 mb-4">
                  {gameState.activeTasks[selectedAnimal].multiplicand} × {gameState.activeTasks[selectedAnimal].multiplier} = ?
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={userAnswer}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setUserAnswer(value);
                    setInputError(false);
                  }}
                  className={`border-2 rounded-lg px-6 py-3 text-center text-xl text-gray-900 w-32
                    ${inputError ? 'border-red-500' : 'border-blue-500'}
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                  autoFocus
                />
                <AnimatePresence>
                  {inputError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 mt-2 font-bold"
                    >
                      נסה שוב!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <Button 
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-bold"
              >
                בדוק תשובה
              </Button>
            </form>
          )}
        </div>
      )}

      {/* חנות */}
      <FarmShop
        isOpen={gameState.showShop}
        onClose={() => setGameState(prev => ({ ...prev, showShop: false }))}
        playerCurrency={playerState.currency}
        onPurchase={handlePurchase}
        ownedItems={playerState.inventory.map(item => item.id)}
      />

      {/* פאנל הישגים */}
      <AchievementsPanel
        isOpen={gameState.showAchievements}
        onClose={() => setGameState(prev => ({ ...prev, showAchievements: false }))}
        achievements={playerState.achievements}
      />

      {/* אנימציות והודעות */}
      <AnimatePresence>
        {/* אנימציית הצלחה */}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none"
          >
            <SuccessAnimation />
          </motion.div>
        )}

        {/* הודעת הישג חדש */}
        {newAchievement && (
          <AchievementPopup
            achievement={newAchievement}
            onClose={() => setNewAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameZone;