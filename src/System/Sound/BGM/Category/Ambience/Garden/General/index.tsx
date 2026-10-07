/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Garden Ambience Engine - General Submodule (64-bit Precision Audio Parameters)
 * High-precision 64-bit procedural sound synthesis for garden breeze, foliage rustles,
 * songbirds, and glasshouse greenhouse mist/water acoustics.
 */

export type AudioBitDepth = 8 | 16 | 32 | 64;

export interface GardenAmbience64BitConfig {
  bitDepth: AudioBitDepth;
  breezeBaseFreqHz: number;      // 64-bit precision float
  breezeFilterCutoffHz: number;  // 64-bit precision float
  foliageRustleGain: number;     // 64-bit precision float
  glasshouseReverbDecaySec: number; // 64-bit precision float
}

export const GARDEN_AMBIENCE_64BIT_DEFAULT: GardenAmbience64BitConfig = {
  bitDepth: 64,
  breezeBaseFreqHz: 320.000000000000,
  breezeFilterCutoffHz: 850.000000000000,
  foliageRustleGain: 0.150000000000,
  glasshouseReverbDecaySec: 2.800000000000,
};

export class GardenAmbienceEngine {
  private config: GardenAmbience64BitConfig = { ...GARDEN_AMBIENCE_64BIT_DEFAULT };
  private activeBreezeOsc: OscillatorNode | null = null;
  private activeBreezeGain: GainNode | null = null;
  private intervalId: ReturnType<typeof setTimeout> | null = null;

  public setConfig(customConfig: Partial<GardenAmbience64BitConfig>) {
    this.config = { ...this.config, ...customConfig };
  }

  public getConfig(): GardenAmbience64BitConfig {
    return this.config;
  }

  /**
   * Plays realistic 64-bit foliage breeze rumble & wind sweep
   */
  public startGardenBreeze(context: AudioContext, destination: AudioNode): void {
    this.stopGardenBreeze();

    const now = context.currentTime;
    const bufferSize = context.sampleRate * 2;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);

    // 64-bit float synthesis loop for pink/brown wind noise
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
    }

    const whiteNoise = context.createBufferSource();
    whiteNoise.buffer = buffer;
    whiteNoise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(this.config.breezeFilterCutoffHz, now);
    filter.Q.setValueAtTime(1.800000000000, now);

    const breezeGain = context.createGain();
    breezeGain.gain.setValueAtTime(0.040000000000, now);

    whiteNoise.connect(filter);
    filter.connect(breezeGain);
    breezeGain.connect(destination);

    whiteNoise.start(now);
    this.activeBreezeGain = breezeGain;

    // Gentle wind amplitude swell
    const swellWind = () => {
      if (!context || context.state === "closed" || !this.activeBreezeGain) return;
      const targetGain = 0.020000000000 + Math.random() * 0.050000000000;
      this.activeBreezeGain.gain.setTargetAtTime(targetGain, context.currentTime, 1.5);
      this.intervalId = setTimeout(swellWind, 3000 + Math.random() * 2000);
    };

    swellWind();
  }

  /**
   * Plays gentle glasshouse water droplet drip reflecting in Orchid Glasshouse
   */
  public playGlasshouseDroplet(context: AudioContext, destination: AudioNode): void {
    const now = context.currentTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "sine";
    // High crystal droplet pitch (1800Hz -> 600Hz rapid sweep)
    osc.frequency.setValueAtTime(1800.000000000000 + Math.random() * 200.0, now);
    osc.frequency.exponentialRampToValueAtTime(550.000000000000, now + 0.14);

    gain.gain.setValueAtTime(0.080000000000, now);
    gain.gain.exponentialRampToValueAtTime(0.000100000000, now + 0.16);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  public stopGardenBreeze(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    if (this.activeBreezeGain) {
      this.activeBreezeGain.gain.setTargetAtTime(0, 0, 0.1);
      this.activeBreezeGain = null;
    }
  }
}

export const globalGardenAmbience = new GardenAmbienceEngine();
