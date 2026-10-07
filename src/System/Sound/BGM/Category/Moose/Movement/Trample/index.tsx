/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural synthesis of a chaotic, heavy trample sequence (crushing leaves/dirt)
 */
export const playTrampleLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const steps = 6;
  const stepInterval = 0.12; // Rapid chaotic sequence
  let lastEndTime = startTime;

  for (let i = 0; i < steps; i++) {
    const time = startTime + i * stepInterval + Math.random() * 0.03;
    const isHeavy = i % 3 === 0;
    
    // Low stomp
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      time,
      isHeavy ? 70 : 55,
      isHeavy ? 0.18 : 0.12,
      isHeavy ? 0.45 : 0.25
    );
    
    // High-frequency rustle
    const oscRustle = context.createOscillator();
    const gainRustle = context.createGain();
    const filterRustle = context.createBiquadFilter();

    oscRustle.connect(filterRustle);
    filterRustle.connect(gainRustle);
    gainRustle.connect(destination);

    filterRustle.type = "highpass";
    filterRustle.frequency.setValueAtTime(300, time);

    oscRustle.type = "sawtooth";
    oscRustle.frequency.setValueAtTime(isHeavy ? 450 : 600, time);

    gainRustle.gain.setValueAtTime(0.08, time);
    gainRustle.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    oscRustle.start(time);
    oscRustle.stop(time + 0.12);

    lastEndTime = Math.max(lastEndTime, endTime, time + 0.12);
  }

  return { endTime: lastEndTime };
};
