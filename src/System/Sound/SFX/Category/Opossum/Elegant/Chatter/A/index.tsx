/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElegantChatterGeneral } from "../General";

/**
 * Crafted Opossums Elegant Chatter System A - Upgraded 64-bit High-Precision DSP Engine
 * Shared offline Web Audio API vocalization engine for crafted opossums.
 * Synthesizes a high-fidelity, dual-harmonic vocal tract frequency sweep with precise formant filters.
 */
export const playCraftedOpossumElegantChatterA = (
  ctx: AudioContext,
  dest: AudioNode,
  isRetro: boolean = false,
  pitchOffsetRatio: number = 0.000000000000,
  customStartFreq: number = 1300.000000000000,
  customEndFreq: number = 450.000000000000
) => {
  const now = ctx.currentTime;
  const chirpCount = ElegantChatterGeneral.baseChirpCount;
  const spacing = ElegantChatterGeneral.baseSpacing;
  const duration = ElegantChatterGeneral.baseDuration;
  const waveType = isRetro ? ElegantChatterGeneral.retroWaveform : ElegantChatterGeneral.defaultWaveform;
  
  // Mathematically precise pitch factors using double-precision math
  const pitchFactor = 1.000000000000 + pitchOffsetRatio;
  const maxVolume = ElegantChatterGeneral.baseMaxVolume * Math.min(1.000000000000, pitchFactor);

  const startFreq = customStartFreq * pitchFactor;
  const endFreq = customEndFreq * pitchFactor;

  const activeNodes: (OscillatorNode | GainNode | BiquadFilterNode)[] = [];
  let maxEndTime = now;

  for (let i = 0; i < chirpCount; i++) {
    const startTime = now + (i * spacing);
    const endTime = startTime + duration;
    if (endTime > maxEndTime) maxEndTime = endTime;

    // Dual-harmonic 64-bit DSP synthesization structure
    const primaryOsc = ctx.createOscillator();
    const primaryGain = ctx.createGain();
    
    primaryOsc.type = waveType;
    primaryOsc.frequency.setValueAtTime(startFreq, startTime);
    primaryOsc.frequency.exponentialRampToValueAtTime(endFreq, endTime);

    // Primary envelope with 64-bit exponential decay (85% of volume power)
    primaryGain.gain.setValueAtTime(maxVolume * 0.850000000000, startTime);
    primaryGain.gain.exponentialRampToValueAtTime(0.000100000000, endTime);

    primaryOsc.connect(primaryGain);

    // Formant-shaping active Biquad Filter to remove harsh frequencies and mimic vocal tracts
    const formantFilter = ctx.createBiquadFilter();
    formantFilter.type = "bandpass";
    formantFilter.Q.setValueAtTime(1.200000000000, startTime);
    formantFilter.frequency.setValueAtTime(startFreq, startTime);
    formantFilter.frequency.exponentialRampToValueAtTime(endFreq, endTime);

    primaryGain.connect(formantFilter);
    formantFilter.connect(dest);

    primaryOsc.start(startTime);
    primaryOsc.stop(endTime);

    activeNodes.push(primaryOsc, primaryGain, formantFilter);

    // Only introduce high-fidelity golden harmonic in non-retro mode for pristine clarity
    if (!isRetro) {
      const harmonicOsc = ctx.createOscillator();
      const harmonicGain = ctx.createGain();

      harmonicOsc.type = "sine";
      // Golden Ratio harmonic multiplier (1.618033988749) to add crystal-clear vocal folds resonance
      const harmonicStartFreq = startFreq * 1.618033988749;
      const harmonicEndFreq = endFreq * 1.618033988749;

      harmonicOsc.frequency.setValueAtTime(harmonicStartFreq, startTime);
      harmonicOsc.frequency.exponentialRampToValueAtTime(harmonicEndFreq, endTime);

      // Harmonic envelope (15% of volume power)
      harmonicGain.gain.setValueAtTime(maxVolume * 0.150000000000, startTime);
      harmonicGain.gain.exponentialRampToValueAtTime(0.000100000000, endTime);

      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(formantFilter);

      harmonicOsc.start(startTime);
      harmonicOsc.stop(endTime);

      activeNodes.push(harmonicOsc, harmonicGain);
    }
  }

  return { nodes: activeNodes, endTime: maxEndTime };
};

