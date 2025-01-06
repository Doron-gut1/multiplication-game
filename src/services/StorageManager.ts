// src/services/StorageManager.ts

export interface StorageError {
  key: string;
  error: string;
  timestamp: Date;
}

export class StorageManager {
  // Storage Keys
  private static readonly USER_DATA_KEY = 'multiplication-game-user';
  private static readonly STATS_KEY = 'multiplication-game-stats';
  private static readonly PROGRESS_KEY = 'multiplication-game-progress';
  private static readonly ERRORS_KEY = 'multiplication-game-errors';

  // Error logging
  private static errors: StorageError[] = [];

  static async save<T>(key: string, data: T): Promise<boolean> {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      this.logError(key, error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  static async load<T>(key: string, defaultValue: T): Promise<T> {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data) as T;
    } catch (error) {
      this.logError(key, error instanceof Error ? error.message : 'Unknown error');
      return defaultValue;
    }
  }

  static async remove(key: string): Promise<boolean> {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      this.logError(key, error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  static async clear(): Promise<boolean> {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      this.logError('all', error instanceof Error ? error.message : 'Unknown error');
      return false;
    }
  }

  // שמירת נתוני משתמש
  static async saveUserData(userId: string, data: any): Promise<boolean> {
    return this.save(`${this.USER_DATA_KEY}-${userId}`, data);
  }

  static async loadUserData<T>(userId: string, defaultValue: T): Promise<T> {
    return this.load(`${this.USER_DATA_KEY}-${userId}`, defaultValue);
  }

  // שמירת סטטיסטיקות
  static async saveStats(userId: string, data: any): Promise<boolean> {
    return this.save(`${this.STATS_KEY}-${userId}`, data);
  }

  static async loadStats<T>(userId: string, defaultValue: T): Promise<T> {
    return this.load(`${this.STATS_KEY}-${userId}`, defaultValue);
  }

  // שמירת התקדמות
  static async saveProgress(userId: string, data: any): Promise<boolean> {
    return this.save(`${this.PROGRESS_KEY}-${userId}`, data);
  }

  static async loadProgress<T>(userId: string, defaultValue: T): Promise<T> {
    return this.load(`${this.PROGRESS_KEY}-${userId}`, defaultValue);
  }

  // טיפול בשגיאות
  private static logError(key: string, error: string): void {
    const newError: StorageError = {
      key,
      error,
      timestamp: new Date()
    };

    this.errors.push(newError);
    this.save(this.ERRORS_KEY, this.errors);

    // שמירה על מקסימום שגיאות
    if (this.errors.length > 100) {
      this.errors = this.errors.slice(-100);
    }
  }

  static async getErrors(): Promise<StorageError[]> {
    return this.load(this.ERRORS_KEY, []);
  }

  static async clearErrors(): Promise<boolean> {
    this.errors = [];
    return this.save(this.ERRORS_KEY, []);
  }
}