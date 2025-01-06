import { useState, useCallback, useEffect } from 'react';
import { User } from '../services/UserService';
import { PlayerState, GameState } from '../types/gameState';
import { Task, Difficulty } from '../types/tasks';
import { ShopItem, Achievement } from '../types/rewards';
import { Challenge, ChallengeUpdate } from '../types/challenges';
import { StatisticsService } from '../services/StatisticsService';
import { AchievementsService } from '../services/AchievementsService';
import { ChallengesService } from '../services/ChallengesService';
import { TaskGenerator } from '../components/game/tasks/TaskGenerator';

export interface ExtendedGameState extends GameState {
  showChallenges: boolean;
  challenges: Challenge[];
}

export const initialGameState: ExtendedGameState = {
  activeTasks: {},
  isPlaying: false,
  showShop: false,
  showAchievements: false,
  showChallenges: false,
  challenges: []
};

export function useGameState(user: User | null) {
  const [playerState, setPlayerState] = useState<PlayerState>(initialPlayerState);
  const [gameState, setGameState] = useState<ExtendedGameState>(initialGameState);
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [inputError, setInputError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [lastAchievementStreak, setLastAchievementStreak] = useState<number>(0);

  // טעינת נתוני משתמש, כולל אתגרים
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) return;

      const [stats, challenges] = await Promise.all([
        StatisticsService.getStatistics(user.id),
        ChallengesService.getUserChallenges(user.id)
      ]);
      
      setPlayerState(prevState => ({
        ...prevState,
        currentStreak: stats.records.streaks.current,
        bestStreak: stats.records.streaks.best,
        totalCorrectAnswers: stats.totalCorrect
      }));

      setGameState(prevState => ({
        ...prevState,
        challenges
      }));
    };

    loadUserData();
  }, [user]);

  // עדכון אתגרים
  const updateChallenges = useCallback(async (updates: ChallengeUpdate[]) => {
    if (!user) return;

    const updatedChallenges = await ChallengesService.updateChallengeProgress(
      user.id,
      updates
    );

    setGameState(prev => ({
      ...prev,
      challenges: updatedChallenges
    }));

    // בדיקת אתגרים שהושלמו ולא נדרשו
    const completedUnclaimed = updatedChallenges.filter(
      c => !c.claimed && c.progress >= c.target
    );

    if (completedUnclaimed.length > 0) {
      // הודעה למשתמש על השלמת אתגר
      // TODO: להוסיף מערכת הודעות
    }
  }, [user]);

  // דרישת פרס עבור אתגר שהושלם
  const claimChallengeReward = useCallback(async (challengeId: string) => {
    if (!user) return;

    const updatedChallenges = await ChallengesService.claimReward(user.id, challengeId);
    const claimedChallenge = updatedChallenges.find(c => c.id === challengeId);

    if (claimedChallenge && claimedChallenge.claimed) {
      // עדכון מטבעות ו-XP
      setPlayerState(prev => ({
        ...prev,
        currency: {
          coins: prev.currency.coins + (claimedChallenge.reward.coins || 0),
          stars: prev.currency.stars + (claimedChallenge.reward.stars || 0)
        },
        level: {
          ...prev.level,
          xp: prev.level.xp + claimedChallenge.reward.xp
        }
      }));

      setGameState(prev => ({
        ...prev,
        challenges: updatedChallenges
      }));
    }
  }, [user]);

  // בדיקת תשובה עם תמיכה באתגרים
  const checkAnswer = async (answer: number) => {
    if (!user || !selectedAnimal || !gameState.activeTasks[selectedAnimal]) return;
    
    const currentTask = gameState.activeTasks[selectedAnimal];
    const isCorrect = TaskGenerator.validateAnswer(currentTask, answer);

    const timeToSolve = 0; // TODO: להוסיף מדידת זמן
    await StatisticsService.saveTaskStatistics(user.id, currentTask, timeToSolve, isCorrect);

    if (isCorrect) {
      setInputError(false);
      setShowSuccess(true);

      // עדכון אתגרים
      const updates: ChallengeUpdate[] = [
        { type: 'correct_answers', amount: 1 }
      ];

      if (currentTask.difficulty === 'hard') {
        updates.push({ type: 'hard_problems', amount: 1 });
      }

      await updateChallenges(updates);

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
        setSelectedAnimal(null);
        setShowSuccess(false);
      }, 1000);

      return true;
    } else {
      setInputError(true);
      setPlayerState(prev => ({
        ...prev,
        currentStreak: 0
      }));

      // עדכון אתגר רצף
      await updateChallenges([{ type: 'streak', amount: 0 }]);
      return false;
    }
  };

  return {
    playerState,
    gameState,
    selectedAnimal,
    inputError,
    showSuccess,
    newAchievement,
    checkAnswer,
    selectAnimal,
    purchaseItem,
    setGameState,
    checkAchievements,
    claimChallengeReward
  };
}