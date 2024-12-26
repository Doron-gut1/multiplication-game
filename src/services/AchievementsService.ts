// src/services/AchievementsService.ts
import { 
  Achievement,
  PlayerProgress,
  PlayerLevel, 
  AchievementReward
} from '../types/achievements';
import { achievements as defaultAchievements } from '../data/achievementsData';

export class AchievementsService {
  // החזרת כל ההישגים הזמינים
  static getAllAchievements(): Achievement[] {
    return defaultAchievements;
  }

  // עדכון רמת השחקן ו-XP
  static updatePlayerLevel(
    currentLevel: PlayerLevel,
    reward: AchievementReward
  ): PlayerLevel {
    const updatedLevel = { ...currentLevel };
    updatedLevel.xp += reward.xp;
    updatedLevel.totalXp += reward.xp;

    // בדיקה האם השחקן עלה רמה
    while (updatedLevel.xp >= updatedLevel.nextLevelXp) {
      updatedLevel.xp -= updatedLevel.nextLevelXp;
      updatedLevel.current++;
      updatedLevel.nextLevelXp = this.calculateNextLevelXp(updatedLevel.current);
    }

    // עדכון מדליות אם יש
    if (reward.medal) {
      updatedLevel.medals[reward.medal.type]++;
    }

    return updatedLevel;
  }

  // בדיקת הישגים חדשים
  static checkAchievements(
    progress: PlayerProgress,
    achievements: Achievement[]
  ): Achievement[] {
    const unlockedAchievements: Achievement[] = [];
    const today = new Date();

    for (const achievement of achievements) {
      if (!achievement.isCompleted && achievement.isVisible) {
        let isUnlocked = false;
        const requirement = achievement.requirement;

        switch (requirement.type) {
          case 'streak':
            isUnlocked = progress.currentStreak >= requirement.value;
            break;
          case 'correct_answers':
            isUnlocked = progress.totalCorrectAnswers >= requirement.value;
            break;
          case 'daily_tasks':
            isUnlocked = 
              progress.goals.daily.tasksCompleted >= requirement.value &&
              this.isSameDay(today, progress.goals.daily.lastUpdated);
            break;
          case 'weekly_tasks':
            isUnlocked = 
              progress.goals.weekly.tasksCompleted >= requirement.value &&
              this.isSameWeek(today, progress.goals.weekly.lastUpdated);
            break;
        }

        if (isUnlocked) {
          const unlockedAchievement = {
            ...achievement,
            isCompleted: true,
            completedAt: new Date()
          };
          unlockedAchievements.push(unlockedAchievement);
        }
      }
    }

    return unlockedAchievements;
  }

  // חישוב XP הנדרש לרמה הבאה
  private static calculateNextLevelXp(level: number): number {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  // עזרים לבדיקת תאריכים
  private static isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private static isSameWeek(date1: Date, date2: Date): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);
    d1.setDate(d1.getDate() - d1.getDay());
    d2.setDate(d2.getDate() - d2.getDay());
    return d1.getTime() === d2.getTime();
  }
}