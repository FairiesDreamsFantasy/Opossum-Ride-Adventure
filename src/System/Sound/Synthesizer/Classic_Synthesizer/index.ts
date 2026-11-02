/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createPulseWave, ClassicSynthesizerGeneral } from "./General";

export * from "./General";

/**
 * Classic Synthesizer Engine:
 * Dedicated retro synthesis engine generating variable duty-cycle pulse waves,
 * LFSR chip noise, and non-clipping triangle sub-bass.
 */
export class ClassicSynthesizer {
  private customPeriodicWaves: Map<string, PeriodicWave> = new Map();

  /**
   * Generates a pulse wave note with specified duty cycle (e.g. 0.125, 0.25, 0.50).
   */
  public playPulseNote(
    context: AudioContext,
    destination: AudioNode,
    frequencyHz: number,
    durationSeconds: number,
    dutyCycle: number = 0.25,
    volume: number = 0.25,
    startTime: number = context.currentTime
  ) {
    const now = startTime;
    const waveKey = `pulse_${dutyCycle.toFixed(3)}`;
    if (!this.customPeriodicWaves.has(waveKey)) {
      this.customPeriodicWaves.set(waveKey, createPulseWave(context, dutyCycle));
    }
    const wave = this.customPeriodicWaves.get(waveKey)!;

    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.setPeriodicWave(wave);
    osc.frequency.setValueAtTime(frequencyHz, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + durationSeconds + 0.02);

    return { osc, gain, endTime: now + durationSeconds };
  }

  /**
   * Generates classic LFSR (Linear Feedback Shift Register) retro arcade chip noise.
   */
  public playLFSRNoiseNote(
    context: AudioContext,
    destination: AudioNode,
    durationSeconds: number,
    pitchHz: number = 440,
    volume: number = 0.20,
    startTime: number = context.currentTime
  ) {
    const now = startTime;
    const bufferSize = Math.floor(context.sampleRate * Math.min(2.0, durationSeconds));
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = buffer.getChannelData(0);

    let lfsr = 0xACE1; // 16-bit LFSR seed
    for (let i = 0; i < bufferSize; i++) {
      const bit = ((lfsr >> 0) ^ (lfsr >> 2) ^ (lfsr >> 3) ^ (lfsr >> 5)) & 1;
      lfsr = (lfsr >> 1) | (bit << 15);
      data[i] = (lfsr & 1) ? 0.8 : -0.8;
    }

    const noiseSource = context.createBufferSource();
    noiseSource.buffer = buffer;

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(pitchHz, now);
    filter.Q.setValueAtTime(3.5, now);

    const gain = context.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    noiseSource.start(now);
    noiseSource.stop(now + durationSeconds + 0.01);

    return { noiseSource, filter, gain, endTime: now + durationSeconds };
  }

  /**
   * Generates a non-clipping pure triangle sub-bass tone.
   */
  public playTriangleSubBassNote(
    context: AudioContext,
    destination: AudioNode,
    frequencyHz: number,
    durationSeconds: number,
    volume: number = 0.35,
    startTime: number = context.currentTime
  ) {
    const now = startTime;
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(frequencyHz, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    osc.connect(gain);
    gain.connect(destination);

    osc.start(now);
    osc.stop(now + durationSeconds + 0.02);

    return { osc, gain, endTime: now + durationSeconds };
  }
}
