/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural trot: crisp, repetitive 2-beat gait (diagonal pairs landing almost together)
 */
export const playTrotLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const steps = 6;
  let currentTime = startTime;
  let lastEndTime = startTime;

  for (let i = 0; i < steps; i++) {
    const stepInterval = 0.28 + (Math.random() * 0.04 - 0.02);
    const freqJitter = (Math.random() * 14) - 7;
    const volJitter = (Math.random() * 0.08) - 0.04;

    const { endTime } = createMooseHoofThump(
      context,
      destination,
      currentTime,
      65 + freqJitter,
      0.12,
      Math.max(0.1, 0.35 + volJitter)
    );
    // Subtle offset step to replicate diagonal hoof pairs landing
    const microOffset = currentTime + 0.018 + (Math.random() * 0.008);
    createMooseHoofThump(
      context,
      destination,
      microOffset,
      55 + freqJitter * 0.5,
      0.08,
      Math.max(0.05, 0.15 + volJitter * 0.5)
    );
    lastEndTime = Math.max(lastEndTime, endTime, microOffset + 0.08);
    currentTime += stepInterval;
  }

  return { endTime: lastEndTime };
};
