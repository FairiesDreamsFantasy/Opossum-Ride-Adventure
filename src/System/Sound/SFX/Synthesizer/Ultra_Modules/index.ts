/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SFXUltraModulesGeneral } from "./General";

export * from "./General";

/**
 * Ultra-Scientific SFX Synthesizer Modules:
 * Advanced granular micro-grain shimmer generator, sub-harmonic impact crunch shockwave,
 * and dual-peak bio-acoustic formant vocal shifter.
 */
export class SFXUltraModulesSynthesizer {
  /**
   * Granular Micro-Grain Shimmer Synthesizer:
   * Scatters high-density micro-grains across randomized pitch intervals for magical pickups,
   * sparkling stars, and achievement sound effects.
   */
  public playGranularShimmerSFX(
    context: AudioContext,
    destination: AudioNode,
    baseFreqHz: number = 1800,
    durationSeconds: number = 0.45,
    options: { grainCount?: number; volume?: number } = {}
  ) {
    const now = context.currentTime;
    const grains = Math.min(SFXUltraModulesGeneral.grainCountLimits.maxGrains, Math.max(SFXUltraModulesGeneral.grainCountLimits.minGrains, options.grainCount ?? 16));
    const volume = options.volume ?? 0.28;
    const grainDuration = 0.03;

    const masterGain = context.createGain();
    masterGain.gain.setValueAtTime(volume, now);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);
    masterGain.connect(destination);

    for (let i = 0; i < grains; i++) {
      const startTime = now + (i / grains) * (durationSeconds * 0.8);
      const grainOsc = context.createOscillator();
      const grainGain = context.createGain();

      // Pseudo-random harmonic jitter
      const pitchMultiplier = 1.0 + ((i * 137) % 17) * 0.08;
      const grainFreq = baseFreqHz * pitchMultiplier;

      grainOsc.type = i % 2 === 0 ? "sine" : "triangle";
      grainOsc.frequency.setValueAtTime(grainFreq, startTime);
      grainOsc.frequency.exponentialRampToValueAtTime(grainFreq * 1.15, startTime + grainDuration);

      grainGain.gain.setValueAtTime(0.001, startTime);
      grainGain.gain.linearRampToValueAtTime(0.2, startTime + grainDuration * 0.3);
      grainGain.gain.exponentialRampToValueAtTime(0.0001, startTime + grainDuration);

      grainOsc.connect(grainGain);
      grainGain.connect(masterGain);

      grainOsc.start(startTime);
      grainOsc.stop(startTime + grainDuration + 0.005);
    }

    return { masterGain, endTime: now + durationSeconds };
  }

  /**
   * Sub-Harmonic Impact Crunch Synthesizer:
   * Synthesizes heavy transient shockwaves with sub-harmonic distortion for heavy collisions,
   * obstacle smashes, and landing thuds.
   */
  public playSubHarmonicImpactCrunch(
    context: AudioContext,
    destination: AudioNode,
    fundamentalHz: number = 90,
    durationSeconds: number = 0.38,
    options: { distortionAmount?: number; volume?: number } = {}
  ) {
    const now = context.currentTime;
    const volume = options.volume ?? 0.55;

    const thudOsc = context.createOscillator();
    const subOsc = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(45, now + durationSeconds);
    filter.Q.setValueAtTime(4.5, now);

    thudOsc.type = "sawtooth";
    thudOsc.frequency.setValueAtTime(fundamentalHz, now);
    thudOsc.frequency.exponentialRampToValueAtTime(25, now + durationSeconds);

    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(fundamentalHz * 0.5, now);
    subOsc.frequency.exponentialRampToValueAtTime(15, now + durationSeconds);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    thudOsc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(destination);

    thudOsc.start(now);
    subOsc.start(now);

    const endTime = now + durationSeconds;
    thudOsc.stop(endTime);
    subOsc.stop(endTime);

    return { thudOsc, subOsc, filter, gain, endTime };
  }

  /**
   * Bio-Acoustic Formant Vocal Shifter:
   * Continuous dual-peak bandpass filter solver for organic animal vocalization sweeps.
   */
  public playBioFormantVocalShift(
    context: AudioContext,
    destination: AudioNode,
    baseFreqHz: number,
    formant1Hz: number,
    formant2Hz: number,
    durationSeconds: number,
    options: { volume?: number } = {}
  ) {
    const now = context.currentTime;
    const volume = options.volume ?? 0.40;

    const sourceOsc = context.createOscillator();
    const f1Filter = context.createBiquadFilter();
    const f2Filter = context.createBiquadFilter();
    const gain = context.createGain();

    sourceOsc.type = "sawtooth";
    sourceOsc.frequency.setValueAtTime(baseFreqHz, now);
    sourceOsc.frequency.linearRampToValueAtTime(baseFreqHz * 0.7, now + durationSeconds);

    f1Filter.type = "bandpass";
    f1Filter.frequency.setValueAtTime(formant1Hz, now);
    f1Filter.frequency.exponentialRampToValueAtTime(formant1Hz * 0.6, now + durationSeconds);
    f1Filter.Q.setValueAtTime(5.0, now);

    f2Filter.type = "bandpass";
    f2Filter.frequency.setValueAtTime(formant2Hz, now);
    f2Filter.frequency.exponentialRampToValueAtTime(formant2Hz * 0.65, now + durationSeconds);
    f2Filter.Q.setValueAtTime(4.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSeconds);

    sourceOsc.connect(f1Filter);
    sourceOsc.connect(f2Filter);
    f1Filter.connect(gain);
    f2Filter.connect(gain);
    gain.connect(destination);

    sourceOsc.start(now);
    const endTime = now + durationSeconds;
    sourceOsc.stop(endTime);

    return { sourceOsc, f1Filter, f2Filter, gain, endTime };
  }
}
