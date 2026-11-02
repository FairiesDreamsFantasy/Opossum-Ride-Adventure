/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElegantChatterGeneral } from "./General";

/**
 * Classic Crafted Opossums Elegant Chatter System A (Preserved Original)
 * Shared offline Web Audio API vocalization engine for crafted opossums.
 * Generates frequency-swept chirps with envelope shaping.
 */
export const playCraftedOpossumElegantChatterAClassic = (
  ctx: AudioContext,
  dest: AudioNode,
  isRetro: boolean = false,
  pitchOffsetRatio: number = 0,
  customStartFreq: number = 1300,
  customEndFreq: number = 450
) => {
  const now = ctx.currentTime;
  const chirpCount = ElegantChatterGeneral.baseChirpCount;
  const spacing = ElegantChatterGeneral.baseSpacing;
  const duration = ElegantChatterGeneral.baseDuration;
  const waveType = isRetro ? ElegantChatterGeneral.retroWaveform : ElegantChatterGeneral.defaultWaveform;
  
  const pitchFactor = 1 + pitchOffsetRatio;
  const maxVolume = ElegantChatterGeneral.baseMaxVolume * Math.min(1.0, pitchFactor);

  const startFreq = customStartFreq * pitchFactor;
  const endFreq = customEndFreq * pitchFactor;

  const activeNodes: (OscillatorNode | GainNode)[] = [];
  let maxEndTime = now;

  for (let i = 0; i < chirpCount; i++) {
    const startTime = now + (i * spacing);
    const endTime = startTime + duration;
    if (endTime > maxEndTime) maxEndTime = endTime;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = waveType;
    osc.frequency.setValueAtTime(startFreq, startTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, endTime);

    gainNode.gain.setValueAtTime(maxVolume, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);

    osc.connect(gainNode);
    gainNode.connect(dest);

    osc.start(startTime);
    osc.stop(endTime);

    activeNodes.push(osc, gainNode);
  }

  return { nodes: activeNodes, endTime: maxEndTime };
};
