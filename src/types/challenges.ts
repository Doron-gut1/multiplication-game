export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly';
  target: number;
  progress: number;
  reward: {
    coins?: number;
    stars?: number;
    xp: number;
  };
  expiresAt: Date;
  claimed: boolean;
}

export interface ChallengeUpdate {
  type: 'correct_answers' | 'streak' | 'hard_problems';
  amount: number;
}
