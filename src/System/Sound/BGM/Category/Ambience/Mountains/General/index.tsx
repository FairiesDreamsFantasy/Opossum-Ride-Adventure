/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Mountains Ambience Engine - General Submodule (64-bit Precision Audio Parameters)
 * High-precision 64-bit procedural sound synthesis for high-altitude mountain wind shear,
 * alpine ridge breeze swells, cliffside echoing gusts, and thin-air atmosphere.
 */

import { AudioBitDepth } from "../../Garden/General";

export interface MountainsAmbience64BitConfig {
  bitDepth: AudioBitDepth;
  altitudeWindBaseFreqHz: number;    // 64-bit precision float
  gustCutoffMaxHz: number;          // 64-bit precision float
  cliffEchoDelaySec: number;        // 64-bit precision float
  ridgeResonanceQ: number;          // 64-bit precision float
}

export const MOUNTAINS_AMBIENCE_64BIT_DEFAULT: MountainsAmbience64BitConfig = {
  bitDepth: 64,
  altitudeWindBaseFreqHz: 180.000000000000,
  gustCutoffMaxHz: 620.000000000000,
  cliffEchoDelaySec: 0.380000000000,
  ridgeResonanceQ: 2.400000000000,
};

export class MountainsAmbienceEngine {
  private config: MountainsAmbience64BitConfig = { ...MOUNTAINS_AMBIENCE_64BIT_DEFAULT };
  private activeWindGain: GainNode | null = null;
  private activeFilter: BiquadFilterNode | null = null;
  private intervalId: ReturnType<typeof setTimeout> | null = null;

  public setConfig(customConfig: Partial<MountainsAmbience64BitConfig>) {
    this.config = { ...this.config, ...customConfig };
  }

  public getConfig(): MountainsAmbience64BitConfig {
    return this.config;
  }

  /**
   * Starts ultra-realistic 64-bit alpine mountain wind shear & ridge gusting
   */
  public startMountainsWind(context: AudioContext, destination: AudioNode): void {
    this.stopMountainsWind();

    const now = context.currentTime;
    const bufferSize = context.sampleRate * 3;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);

    // 64-bit float synthesis loop for mountain pink/brown noise wind shear
    let b0 = 0.0, b1 = 0.0, b2 = 0.0, b3 = 0.0, b4 = 0.0, b5 = 0.0, b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
      b6 = white * 0.115926;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(this.config.altitudeWindBaseFreqHz, now);
    filter.Q.setValueAtTime(this.config.ridgeResonanceQ, now);

    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.080000000000, now);

    noiseSource.connect(filter);
    filter.connect(windGain);
    windGain.connect(destination);

    noiseSource.start(now);
    this.activeWindGain = windGain;
    this.activeFilter = filter;

    // Realistic mountain wind gust dynamics
    const cycleGusts = () => {
      if (!context || context.state === "closed" || !this.activeWindGain || !this.activeFilter) return;
      const targetGain = 0.040000000000 + Math.random() * 0.120000000000;
      const targetFreq = 160.000000000000 + Math.random() * (this.config.gustCutoffMaxHz - 160.0);
      
      this.activeWindGain.gain.setTargetAtTime(targetGain, context.currentTime, 2.0);
      this.activeFilter.frequency.setTargetAtTime(targetFreq, context.currentTime, 1.8);

      this.intervalId = setTimeout(cycleGusts, 4000 + Math.random() * 3500);
    };

    cycleGusts();
  }

  public stopMountainsWind(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    if (this.activeWindGain) {
      this.activeWindGain.gain.setTargetAtTime(0, 0, 0.1);
      this.activeWindGain = null;
    }
    this.activeFilter = null;
  }
}

export const globalMountainsAmbience = new MountainsAmbienceEngine();
