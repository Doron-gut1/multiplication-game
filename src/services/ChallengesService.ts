  private static async saveChallenges(userId: string, challenges: Challenge[]): Promise<void> {
    localStorage.setItem(
      `${this.CHALLENGES_KEY}-${userId}`,
      JSON.stringify(challenges)
    );
  }

  private static isStartOfWeek(): boolean {
    const now = dayjs();
    const startOfWeek = now.startOf('week');
    return now.diff(startOfWeek, 'hour') < 24;
  }

  static formatTimeLeft(expiresAt: Date): string {
    const now = dayjs();
    const expiry = dayjs(expiresAt);
    const hours = expiry.diff(now, 'hour');
    const minutes = expiry.diff(now, 'minute') % 60;

    return `${hours}h ${minutes}m`;
  }
}
