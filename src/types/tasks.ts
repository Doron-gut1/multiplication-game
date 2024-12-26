// src/types/tasks.ts

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  type: 'multiplication';
  difficulty: Difficulty;
  multiplicand: number;
  multiplier: number;
  answer: number;
  associatedAnimal: string;  // ID of the animal presenting this task
  status: 'pending' | 'completed' | 'failed';
  attempts: number;
  createdAt: number;
}

export interface TaskConfig {
  difficulty: Difficulty;
  range: {
    min: number;
    max: number;
  };
  allowedMultipliers: number[];
}

export interface TaskProgress {
  currentStreak: number;
  totalCorrect: number;
  totalAttempts: number;
  scores: {
    [difficulty in Difficulty]: number;
  };
}

// Configuration for different difficulty levels
export const DIFFICULTY_CONFIG: Record<Difficulty, TaskConfig> = {
  easy: {
    difficulty: 'easy',
    range: { min: 1, max: 5 },
    allowedMultipliers: [1, 2, 5, 10]
  },
  medium: {
    difficulty: 'medium',
    range: { min: 2, max: 7 },
    allowedMultipliers: [3, 4, 6, 8]
  },
  hard: {
    difficulty: 'hard',
    range: { min: 3, max: 10 },
    allowedMultipliers: [7, 8, 9]
  }
};