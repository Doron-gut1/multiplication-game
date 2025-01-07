// src/services/UserService.ts
export interface User {
  id: string;
  name: string;
  level: number;
  xp: number;
}

export class UserService {
  private static readonly STORAGE_KEY = 'user_data';

  static saveUser(user: User): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
  }

  static getUser(): User | null {
    const userData = localStorage.getItem(this.STORAGE_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  static updateUser(updates: Partial<User>): User | null {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.saveUser(updatedUser);
      return updatedUser;
    }
    return null;
  }

  static clearUser(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}