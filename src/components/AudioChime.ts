/**
 * Lightweight Web Audio API synthesizer for workout interval beeps
 * Runs offline, no external audio files required.
 */
class SoundService {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playBeep(freq: number = 587.33, durationMs: number = 150) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + durationMs / 1000);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + durationMs / 1000);
    } catch {
      // Ignore audio policy issues
    }
  }

  public playSuccessFanfare() {
    if (!this.enabled) return;
    this.playBeep(523.25, 120);
    setTimeout(() => this.playBeep(659.25, 120), 130);
    setTimeout(() => this.playBeep(783.99, 140), 260);
    setTimeout(() => this.playBeep(1046.50, 300), 400);
  }
}

export const sound = new SoundService();
