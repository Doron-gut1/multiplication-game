// src/services/LevelSystem.ts

import type { 
    XPConfig, 
    LevelInfo, 
    LevelProgress, 
    LevelSystemEvent 
  } from '../types/levelSystem';
  
  // קונפיגורציה בסיסית של המערכת
  const DEFAULT_XP_CONFIG: XPConfig = {
    taskCompletion: {
      easy: 10,
      medium: 20,
      hard: 30
    },
    streakBonuses: [
      { threshold: 3, multiplier: 1.2 },
      { threshold: 5, multiplier: 1.5 },
      { threshold: 10, multiplier: 2.0 }
    ],
    achievements: {
      common: 50,
      rare: 100,
      epic: 200,
      legendary: 500
    }
  };
  
  export class LevelSystem {
    private xpConfig: XPConfig;
  
    constructor(config: Partial<XPConfig> = {}) {
      this.xpConfig = { ...DEFAULT_XP_CONFIG, ...config };
    }
  
    // חישוב XP לאירוע
    public calculateXP(event: LevelSystemEvent, currentProgress: LevelProgress): number {
      let baseXP = 0;
      const { activeMultipliers } = currentProgress;
  
      switch (event.type) {
        case 'TASK_COMPLETED':
          baseXP = this.xpConfig.taskCompletion[event.difficulty];
          break;
        
       // case 'STREAK_REACHED':
        //  const bonus = this.xpConfig.streakBonuses.find(
        //    b => b.threshold === event.count
        //  );
         // if (bonus) {
        //    baseXP = Math.floor(this.xpConfig.taskCompletion.medium * bonus.multiplier);
        //  }
        //  break;
        
        case 'ACHIEVEMENT_UNLOCKED':
          baseXP = this.xpConfig.achievements[event.rarity];
          break;
      }
  
      return Math.floor(baseXP * activeMultipliers.xp);
    }
  
    // חישוב XP נדרש לרמה הבאה
    public getXPForNextLevel(level: number): number {
      // נוסחה לוגריתמית שמקשה יותר ויותר לעלות רמה
      return Math.floor(100 * Math.pow(1.5, level - 1));
    }
  
    // עדכון התקדמות לאחר קבלת XP
    public updateProgress(
      currentProgress: LevelProgress,
      xpGained: number
    ): LevelProgress {
      const updatedProgress = { ...currentProgress };
      updatedProgress.currentXP += xpGained;
      updatedProgress.totalXP += xpGained;
  
      // בדיקה אם השחקן עלה רמה
      while (updatedProgress.currentXP >= updatedProgress.xpToNextLevel) {
        updatedProgress.currentXP -= updatedProgress.xpToNextLevel;
        updatedProgress.currentLevel++;
        updatedProgress.xpToNextLevel = this.getXPForNextLevel(updatedProgress.currentLevel);
  
        // הוספת הטבות רמה חדשה
        const levelBenefits = this.getLevelBenefits(updatedProgress.currentLevel);
        updatedProgress.activeMultipliers = {
          xp: levelBenefits.multipliers.xp || updatedProgress.activeMultipliers.xp,
          coins: levelBenefits.multipliers.coins || updatedProgress.activeMultipliers.coins,
          stars: levelBenefits.multipliers.stars || updatedProgress.activeMultipliers.stars
        };
  
        if (levelBenefits.specialPerks) {
          updatedProgress.unlockedPerks = [
            ...updatedProgress.unlockedPerks,
            ...levelBenefits.specialPerks.map(perk => perk.type)
          ];
        }
      }
  
      return updatedProgress;
    }
  
    // קבלת הטבות לרמה מסוימת
    private getLevelBenefits(level: number): LevelInfo['benefits'] {
      // כאן נגדיר את ההטבות לכל רמה
      const benefits = {
        unlockedItems: [],
        multipliers: {
          xp: 1 + (level * 0.1),      // תוספת של 10% לכל רמה
          coins: 1 + (level * 0.05),   // תוספת של 5% לכל רמה
          stars: 1
        },
        specialPerks: []
      };
  
      // הטבות מיוחדות לרמות ספציפיות
     // if (level === 5) {
      //  benefits.specialPerks.push({ 
      //    type: 'hint_chance',
      //    value: 0.2  // 20% סיכוי לרמז
      //  });
     // }
      
     // if (level === 10) {
      //  benefits.specialPerks.push({
     //     type: 'double_coins',
     //     value: 2
     //   });
     // }
  
      return benefits;
    }
  }