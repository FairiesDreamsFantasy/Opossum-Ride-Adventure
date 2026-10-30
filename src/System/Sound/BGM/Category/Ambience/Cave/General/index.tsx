/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Cave Ambience General Submodule
 * Base acoustics for subterranean environments.
 */

import { CaveWaterDrip } from "../Water_Drip";

export class CaveAmbienceEngine {
  private activeWindGain: GainNode | null = null;
  private activeFilter: BiquadFilterNode | null = null;
  private intervalId: any = null;
  private dripTimeoutId: any = null;

  public static createCaveResonance(context: AudioContext, destination: AudioNode): BiquadFilterNode {
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, context.currentTime);
    filter.Q.setValueAtTime(4.0, context.currentTime);
    filter.connect(destination);
    return filter;
  }

  /**
   * Starts procedural subterranean cave and mine ambience with wind swells and water drips
   */
  public startCaveAmbience(context: AudioContext, destination: AudioNode): void {
    this.stopCaveAmbience();

    const now = context.currentTime;
    const bufferSize = context.sampleRate * 4;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);

    // Deep brown/pink noise generation loop for cave acoustics
    let b0 = 0.0, b1 = 0.0, b2 = 0.0, b3 = 0.0, b4 = 0.0, b5 = 0.0, b6 = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      // Synthesize heavy subterranean atmosphere
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(140, now); // Deeper lowpass for subterranean spaces
    filter.Q.setValueAtTime(3.5, now);

    const windGain = context.createGain();
    windGain.gain.setValueAtTime(0.05, now);

    noiseSource.connect(filter);
    filter.connect(windGain);
    windGain.connect(destination);

    noiseSource.start(now);
    this.activeWindGain = windGain;
    this.activeFilter = filter;

    // Subterranean breeze dynamics
    const cycleGusts = () => {
      if (!context || context.state === "closed" || !this.activeWindGain || !this.activeFilter) return;
      const targetGain = 0.02 + Math.random() * 0.06;
      const targetFreq = 100 + Math.random() * 120;
      
      this.activeWindGain.gain.setTargetAtTime(targetGain, context.currentTime, 2.5);
      this.activeFilter.frequency.setTargetAtTime(targetFreq, context.currentTime, 2.0);

      this.intervalId = setTimeout(cycleGusts, 5000 + Math.random() * 4000);
    };
    cycleGusts();

    // Dripping water droplets scheduling
    const scheduleDrips = () => {
      if (!context || context.state === "closed" || !this.activeWindGain) return;
      // Play drip
      CaveWaterDrip.play(context, destination);
      this.dripTimeoutId = setTimeout(scheduleDrips, 2500 + Math.random() * 4500);
    };
    scheduleDrips();
  }

  public stopCaveAmbience(): void {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
    if (this.dripTimeoutId) {
      clearTimeout(this.dripTimeoutId);
      this.dripTimeoutId = null;
    }
    if (this.activeWindGain) {
      this.activeWindGain.gain.setTargetAtTime(0, 0, 0.1);
      this.activeWindGain = null;
    }
    this.activeFilter = null;
  }
}

export const globalCaveAmbience = new CaveAmbienceEngine();
