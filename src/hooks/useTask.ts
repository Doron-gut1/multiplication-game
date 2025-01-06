import { useState, useCallback } from 'react';
import { Task, TaskService } from '../services/TaskService';
import { RewardService } from '../services/RewardService';
import { useGameContext } from '../context/GameContext';

export const useTask = (difficulty: Task['difficulty']) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { playerState, dispatch } = useGameContext();

  const generateNewTask = useCallback(() => {
    const task = TaskService.generateTask(difficulty);
    setCurrentTask(task);
    return task;
  }, [difficulty]);

  const checkAnswer = useCallback((answer: number) => {
    if (!currentTask) return false;

    const isCorrect = TaskService.validateAnswer(currentTask, answer);
    const timeTaken = Date.now() - (currentTask.timeStarted?.getTime() || Date.now());

    if (isCorrect) {
      const reward = RewardService.calculateReward(currentTask, timeTaken, playerState.currentStreak + 1);
      
      dispatch({
        type: 'UPDATE_PLAYER_STATE',
        payload: {
          currency: {
            coins: playerState.currency.coins + reward.coins,
            stars: playerState.currency.stars
          },
          currentStreak: playerState.currentStreak + 1,
          bestStreak: Math.max(playerState.currentStreak + 1, playerState.bestStreak),
          totalCorrectAnswers: playerState.totalCorrectAnswers + 1,
          experience: playerState.experience + reward.xp
        }
      });

      setCurrentTask(null);
    } else {
      setCurrentTask({
        ...currentTask,
        attempts: currentTask.attempts + 1
      });

      dispatch({
        type: 'UPDATE_PLAYER_STATE',
        payload: {
          currentStreak: 0
        }
      });
    }

    return isCorrect;
  }, [currentTask, dispatch, playerState]);

  return {
    currentTask,
    generateNewTask,
    checkAnswer
  };
};
