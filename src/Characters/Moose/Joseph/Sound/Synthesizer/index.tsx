/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Offline Web Audio API Synthesizer for Joseph Moose
 * Synthesizes deep bull bellows, resonant footstep thuds, and crackling fire breath.
 */
export class JosephSoundSynthesizer {
  private ctx: AudioContext | null = null;

  constructor(audioContext?: AudioContext) {
    if (audioContext) {
      this.ctx = audioContext;
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Deep bull moose resonant bellow with evangelical brass harmonic overtone
   */
  public playBullBellow(): void {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sawtooth";
    subOsc.type = "sine";

    // Frequency sweep from 115Hz down to 65Hz
    osc.frequency.setValueAtTime(115, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.85);

    subOsc.frequency.setValueAtTime(57.5, now);
    subOsc.frequency.exponentialRampToValueAtTime(32.5, now + 0.85);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.85);
    subOsc.stop(now + 0.85);
  }

  /**
   * Crackling fire-breath audio synthesis
   */
  public playFireBreath(): void {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    // White noise buffer for fire roar
    const bufferSize = ctx.sampleRate * 1.2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.9));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(450, now + 1.2);
    filter.Q.value = 2.0;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 1.2);
  }

  /**
   * Heavy 20% thickened hoofstep thud
   */
  public playThickHoofstep(): void {
    const ctx = this.getContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(85, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }
}

export const josephSoundSynthesizer = new JosephSoundSynthesizer();
