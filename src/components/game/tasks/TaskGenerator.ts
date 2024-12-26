// src/components/game/tasks/TaskGenerator.ts
import { Task, Difficulty, TaskConfig, DIFFICULTY_CONFIG } from '../../../types/tasks';

export class TaskGenerator {
  private static generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static chooseRandomMultiplier(config: TaskConfig): number {
    const index = Math.floor(Math.random() * config.allowedMultipliers.length);
    return config.allowedMultipliers[index];
  }

  static generateTask(difficulty: Difficulty, animalId: string): Task {
    const config = DIFFICULTY_CONFIG[difficulty];
    const multiplier = this.chooseRandomMultiplier(config);
    const multiplicand = this.generateRandomNumber(config.range.min, config.range.max);

    return {
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'multiplication',
      difficulty,
      multiplicand,
      multiplier,
      answer: multiplicand * multiplier,
      associatedAnimal: animalId,
      status: 'pending',
      attempts: 0,
      createdAt: Date.now()
    };
  }

  static validateAnswer(task: Task, userAnswer: number): boolean {
    return task.answer === userAnswer;
  }

  // מחזיר רמז מותאם לסוג התרגיל
  static getHint(task: Task): string {
    const { multiplicand, multiplier } = task;
    
    // רמזים מותאמים למכפלות מיוחדות
    if (multiplier === 10) {
      return 'טיפ: כפל ב-10? פשוט הוסף 0 בסוף המספר!';
    }
    if (multiplier === 5) {
      return 'טיפ: כפל ב-5 הוא חצי מהכפל ב-10';
    }
    if (multiplier === 2) {
      return `טיפ: כפל ב-2 הוא כמו ${multiplicand} + ${multiplicand}`;
    }
    
    return 'נסה לחשוב על הטיפים שלמדנו באזור הלמידה';
  }
}