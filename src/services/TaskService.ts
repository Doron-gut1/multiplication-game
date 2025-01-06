export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  multiplicand: number;
  multiplier: number;
  difficulty: Difficulty;
  timeStarted?: Date;
  attempts: number;
}

export class TaskService {
  private static difficultyRanges = {
    easy: { min: 1, max: 5 },
    medium: { min: 3, max: 7 },
    hard: { min: 6, max: 12 }
  };

  static generateTask(difficulty: Difficulty): Task {
    const range = this.difficultyRanges[difficulty];
    const multiplicand = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
    const multiplier = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

    return {
      id: `task-${Date.now()}`,
      multiplicand,
      multiplier,
      difficulty,
      attempts: 0,
      timeStarted: new Date()
    };
  }

  static validateAnswer(task: Task, answer: number): boolean {
    return task.multiplicand * task.multiplier === answer;
  }

  static calculateReward(task: Task, timeTaken: number, attempts: number): number {
    let baseReward = {
      easy: 10,
      medium: 20,
      hard: 30
    }[task.difficulty];

    // זמן אופטימלי בשניות לכל רמת קושי
    const optimalTime = {
      easy: 5,
      medium: 8,
      hard: 12
    }[task.difficulty];

    // בונוס על מהירות
    const timeBonus = Math.max(0, 1 - (timeTaken / (optimalTime * 1000)));
    
    // הפחתה על ניסיונות כושלים
    const attemptsMultiplier = Math.max(0.5, 1 - ((attempts - 1) * 0.2));

    return Math.round(baseReward * (1 + timeBonus) * attemptsMultiplier);
  }

  static getDifficultyLevel(playerLevel: number): Difficulty {
    if (playerLevel < 5) return 'easy';
    if (playerLevel < 10) return 'medium';
    return 'hard';
  }
}
