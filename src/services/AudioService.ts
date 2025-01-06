// src/services/AudioService.ts
export class AudioService {
  private static readonly VOLUME_KEY = 'multiplication-game-volume';
  private static context: AudioContext | null = null;
  private static sounds: Record<string, AudioBuffer> = {};
  private static volume = 1.0;
  private static isMuted = false;

  static async initialize() {
    try {
      this.context = new AudioContext();
      
      // טעינת צלילים בסיסיים
      await Promise.all([
        this.loadSound('correct', '/sounds/correct.mp3'),
        this.loadSound('incorrect', '/sounds/incorrect.mp3'),
        this.loadSound('achievement', '/sounds/achievement.mp3'),
        this.loadSound('click', '/sounds/click.mp3'),
        this.loadSound('reward', '/sounds/reward.mp3')
      ]);

      // טעינת הגדרות קול שמורות
      const savedVolume = localStorage.getItem(this.VOLUME_KEY);
      if (savedVolume) {
        this.volume = parseFloat(savedVolume);
      }
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }

  private static async loadSound(id: string, url: string) {
    try {
      if (!this.context) return;

      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.sounds[id] = audioBuffer;
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error);
    }
  }

  static async playSound(id: string) {
    if (!this.context || !this.sounds[id] || this.isMuted) return;

    try {
      const source = this.context.createBufferSource();
      const gainNode = this.context.createGain();
      
      source.buffer = this.sounds[id];
      gainNode.gain.value = this.volume;

      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      source.start(0);
    } catch (error) {
      console.error(`Failed to play sound ${id}:`, error);
    }
  }

  static setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    localStorage.setItem(this.VOLUME_KEY, this.volume.toString());
  }

  static toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  static get currentVolume() {
    return this.volume;
  }

  static get muted() {
    return this.isMuted;
  }
}