import { Task } from './TaskService';

export interface Reward {
  coins: number;
  xp: number;
  bonus?: {
    type: 'streak' | 'speed' | 'perfect';
    amount: number;
  };
}

export class RewardService {
  private static readonly BASE_XP = {
    easy: 5,
    medium: 10,
    hard: 15
  };

  private static readonly STREAK_BONUS = {
    5: 1.5,   // 5 ברצף = 50% בונוס
    10: 2,    // 10 ברצף = 100% בונוס
    15: 2.5   // 15 ברצף = 150% בונוס
  };

  static calculateReward(task: Task, timeTaken: number, streak: number): Reward {
    const baseCoins = {
      easy: 10,
      medium: 20,
      hard: 30
    }[task.difficulty];

    const baseXp = this.BASE_XP[task.difficulty];

    // חישוב בונוס רצף
    let streakMultiplier = 1;
    if (streak >= 15) streakMultiplier = this.STREAK_BONUS[15];
    else if (streak >= 10) streakMultiplier = this.STREAK_BONUS[10];
    else if (streak >= 5) streakMultiplier = this.STREAK_BONUS[5];

    // בונוס מהירות
    const optimalTime = {
      easy: 5000,  // 5 שניות
      medium: 8000,  // 8 שניות
      hard: 12000    // 12 שניות
    }[task.difficulty];

    const speedMultiplier = Math.max(0.5, Math.min(2, optimalTime / timeTaken));

    const finalCoins = Math.round(baseCoins * streakMultiplier * speedMultiplier);
    const finalXp = Math.round(baseXp * streakMultiplier * speedMultiplier);

    // הוספת בונוס אם יש
    let bonus;
    if (streak >= 10) {
      bonus = {
        type: 'streak' as const,
        amount: Math.round(finalCoins * 0.5)
      };
    } else if (speedMultiplier > 1.5) {
      bonus = {
        type: 'speed' as const,
        amount: Math.round(finalCoins * 0.3)
      };
    }

    return {
      coins: finalCoins,
      xp: finalXp,
      bonus
    };
  }

  static getStreakRequirement(currentStreak: number): number {
    if (currentStreak < 5) return 5;
    if (currentStreak < 10) return 10;
    if (currentStreak < 15) return 15;
    return currentStreak + 5;
  }
}
