import { User } from './UserService';
import dayjs from 'dayjs';

export interface Competition {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: 'solo' | 'team';
  rules: {
    scoreType: 'correctAnswers' | 'streak' | 'totalXP';
    minLevel?: number;
    maxParticipants?: number;
  };
  rewards: {
    coins?: number;
    stars?: number;
    xp: number;
  };
  participants: {
    userId: string;
    username: string;
    score: number;
    joinedAt: Date;
  }[];
  status: 'upcoming' | 'active' | 'completed';
}

export class CompetitionService {
  private static readonly STORAGE_KEY = 'multiplication-game-competitions';

  static async getActiveCompetitions(): Promise<Competition[]> {
    const competitions = await this.getAllCompetitions();
    const now = new Date();

    return competitions.filter(comp => 
      dayjs(comp.startDate).isBefore(now) && 
      dayjs(comp.endDate).isAfter(now)
    );
  }

  static async getUpcomingCompetitions(): Promise<Competition[]> {
    const competitions = await this.getAllCompetitions();
    const now = new Date();

    return competitions.filter(comp => dayjs(comp.startDate).isAfter(now));
  }

  static async joinCompetition(competitionId: string, user: User): Promise<Competition | null> {
    const competition = await this.getCompetition(competitionId);
    if (!competition) return null;

    // בדיקת תנאים להצטרפות
    if (
      competition.status !== 'upcoming' &&
      competition.status !== 'active' ||
      competition.participants.some(p => p.userId === user.id) ||
      (competition.rules.maxParticipants &&
        competition.participants.length >= competition.rules.maxParticipants)
    ) {
      return null;
    }

    competition.participants.push({
      userId: user.id,
      username: user.username,
      score: 0,
      joinedAt: new Date()
    });

    await this.saveCompetition(competition);
    return competition;
  }

  static async updateScore(
    competitionId: string,
    userId: string,
    score: number
  ): Promise<void> {
    const competition = await this.getCompetition(competitionId);
    if (!competition || competition.status !== 'active') return;

    const participant = competition.participants.find(p => p.userId === userId);
    if (!participant) return;

    participant.score = score;
    await this.saveCompetition(competition);
  }

  private static async getAllCompetitions(): Promise<Competition[]> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (!stored) return [];

    const competitions = JSON.parse(stored) as Competition[];
    
    // עדכון סטטוס אוטומטי
    const now = new Date();
    competitions.forEach(comp => {
      if (dayjs(comp.endDate).isBefore(now)) {
        comp.status = 'completed';
      } else if (dayjs(comp.startDate).isBefore(now)) {
        comp.status = 'active';
      } else {
        comp.status = 'upcoming';
      }
    });

    return competitions;
  }

  private static async getCompetition(id: string): Promise<Competition | null> {
    const competitions = await this.getAllCompetitions();
    return competitions.find(c => c.id === id) || null;
  }

  private static async saveCompetition(competition: Competition): Promise<void> {
    const competitions = await this.getAllCompetitions();
    const index = competitions.findIndex(c => c.id === competition.id);

    if (index !== -1) {
      competitions[index] = competition;
    } else {
      competitions.push(competition);
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(competitions));
  }
}