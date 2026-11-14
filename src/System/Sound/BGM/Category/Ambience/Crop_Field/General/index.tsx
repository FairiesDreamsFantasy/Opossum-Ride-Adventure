/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Crop Field Ambience Engine - General Submodule (64-bit Precision Audio Parameters)
 * Procedural synthesis of open-air farmland winds sweeping across layered wheat, corn,
 * barley, rice, oats, and sorghum stalks with realistic stalk-rustle modulation and calm afternoon air.
 */

export interface CropFieldAmbience64BitConfig {
  bitDepth: 64;
  stalkRustleCenterHz: number;
  windGustBaseHz: number;
  rustleQ: number;
  gustPeriodMs: number;
}

export const CROP_FIELD_AMBIENCE_64BIT_DEFAULT: CropFieldAmbience64BitConfig = {
  bitDepth: 64,
  stalkRustleCenterHz: 2350.0,
  windGustBaseHz: 420.0,
  rustleQ: 1.65,
  gustPeriodMs: 3200
};

export class CropFieldAmbienceEngine {
  private config: CropFieldAmbience64BitConfig = { ...CROP_FIELD_AMBIENCE_64BIT_DEFAULT };
  private activeWindGain: GainNode | null = null;
  private activeRustleGain: GainNode | null = null;
  private activeSources: AudioBufferSourceNode[] = [];
  private gustTimer: ReturnType<typeof setTimeout> | null = null;

  public getConfig(): CropFieldAmbience64BitConfig {
    return this.config;
  }

  public startCropFieldAmbience(context: AudioContext, destination: AudioNode): void {
    this.stopCropFieldAmbience();

    const now = context.currentTime;
    const bufferSize = context.sampleRate * 3;

    // Layer 1: Smooth low farmland breeze (brown/pink noise wind swell)
    const windBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const windData = windBuffer.getChannelData(0);
    let lastWind = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      windData[i] = (lastWind + 0.025 * white) / 1.025;
      lastWind = windData[i];
    }

    const windSource = context.createBufferSource();
    windSource.buffer = windBuffer;
    windSource.loop = true;

    const windFilter = context.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.setValueAtTime(this.config.windGustBaseHz, now);
    windFilter.Q.setValueAtTime(1.4, now);

    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.045, now);

    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(destination);
    windSource.start(now);

    // Layer 2: Crisp high-frequency stalk rustle (grain heads and leaves brushing in gusts)
    const rustleBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const rustleData = rustleBuffer.getChannelData(0);
    let prev = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // High-passed textured stalk whisper envelope
      rustleData[i] = (white - prev * 0.45) * 0.65;
      prev = white;
    }

    const rustleSource = context.createBufferSource();
    rustleSource.buffer = rustleBuffer;
    rustleSource.loop = true;

    const rustleFilter = context.createBiquadFilter();
    rustleFilter.type = "bandpass";
    rustleFilter.frequency.setValueAtTime(this.config.stalkRustleCenterHz, now);
    rustleFilter.Q.setValueAtTime(this.config.rustleQ, now);

    const rustleGain = context.createGain();
    rustleGain.gain.setValueAtTime(0.028, now);

    rustleSource.connect(rustleFilter);
    rustleFilter.connect(rustleGain);
    rustleGain.connect(destination);
    rustleSource.start(now);

    this.activeWindGain = windGain;
    this.activeRustleGain = rustleGain;
    this.activeSources = [windSource, rustleSource];

    // Rhythmic gust modulation: swells wind + synchronized stalk rustle waves across fields
    const modulateGust = () => {
      if (!context || context.state === "closed" || !this.activeWindGain || !this.activeRustleGain) return;
      const t = context.currentTime;
      const gustStrength = 0.35 + Math.random() * 0.65;
      this.activeWindGain.gain.setTargetAtTime(0.025 + gustStrength * 0.045, t, 1.3);
      this.activeRustleGain.gain.setTargetAtTime(0.014 + gustStrength * 0.042, t + 0.18, 0.9);
      rustleFilter.frequency.setTargetAtTime(1950 + gustStrength * 950, t, 1.1);
      this.gustTimer = setTimeout(modulateGust, this.config.gustPeriodMs + Math.random() * 2200);
    };

    modulateGust();
  }

  public stopCropFieldAmbience(): void {
    if (this.gustTimer) {
      clearTimeout(this.gustTimer);
      this.gustTimer = null;
    }
    if (this.activeWindGain) {
      try {
        this.activeWindGain.gain.setTargetAtTime(0, 0, 0.08);
      } catch {}
      this.activeWindGain = null;
    }
    if (this.activeRustleGain) {
      try {
        this.activeRustleGain.gain.setTargetAtTime(0, 0, 0.08);
      } catch {}
      this.activeRustleGain = null;
    }
    this.activeSources.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch {}
    });
    this.activeSources = [];
  }
}

export const globalCropFieldAmbience = new CropFieldAmbienceEngine();
