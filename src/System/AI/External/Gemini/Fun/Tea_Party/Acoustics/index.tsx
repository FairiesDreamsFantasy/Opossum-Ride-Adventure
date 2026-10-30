/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Offline Local Web Audio API Sound Synthesizer for the Grand Tea Room
 * Synthesizes liquid pouring dynamics, porcelain teacup clinks, and spoon stirs with 100% offline mathematical DSP.
 */

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      sharedAudioCtx = new AudioCtxClass();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === "suspended") {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export class TeaPartyAcousticEngine {
  /**
   * Synthesizes a realistic liquid tea pouring stream into a porcelain teacup.
   * Uses white noise filtered through a dynamic, sweeping resonant bandpass filter.
   */
  public static playTeaPouringSound(durationSeconds: number = 2.2, volume: number = 0.25): void {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const sampleRate = ctx.sampleRate;
      const bufferSize = Math.floor(sampleRate * durationSeconds);
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const output = buffer.getChannelData(0);

      // Generate pink/brownian noise for bubbling fluid stream
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.1;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Resonant bandpass filter that slowly rises in pitch as cup fills
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.Q.value = 4.5;
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + durationSeconds);

      // Soft gain envelope
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.2);
      gainNode.gain.setValueAtTime(volume, ctx.currentTime + durationSeconds - 0.4);
      gainNode.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + durationSeconds);

      noiseSource.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseSource.start();
      noiseSource.stop(ctx.currentTime + durationSeconds);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Synthesizes the delicate, bright, high-Q clink of fine porcelain teacups meeting saucers.
   */
  public static playPorcelainClinkSound(volume: number = 0.18): void {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      // High glass/porcelain resonant frequency
      osc.frequency.setValueAtTime(3400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Synthesizes a gentle silver teaspoon stirring in a porcelain teacup.
   */
  public static playSpoonStirSound(volume: number = 0.12): void {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      for (let i = 0; i < 3; i++) {
        const timeOffset = i * 0.12;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(2600 + i * 150, ctx.currentTime + timeOffset);
        osc.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + timeOffset + 0.08);

        gain.gain.setValueAtTime(volume, ctx.currentTime + timeOffset);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + timeOffset + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + timeOffset);
        osc.stop(ctx.currentTime + timeOffset + 0.09);
      }
    } catch {
      // Graceful fallback
    }
  }
}

export const TeaPartyAcoustics = {
  systemName: "Grand Tea Room Acoustics Subsystem",
  TeaPartyAcousticEngine
};

export default TeaPartyAcoustics;
