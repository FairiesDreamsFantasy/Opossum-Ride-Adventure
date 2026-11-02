/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural charge: accelerating thump-thump crescendo loop
 */
export const playChargeLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  let currentTime = startTime;
  let interval = 0.35; // Start with slow heavy thuds
  let lastEndTime = startTime;

  for (let i = 0; i < 8; i++) {
    const timeJitter = (Math.random() * 0.02) - 0.01;
    const freqJitter = (Math.random() * 20) - 10;
    const isHeavy = i % 2 === 0;
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      currentTime + timeJitter,
      (isHeavy ? 80 : 70) + freqJitter,
      0.15,
      0.3 + (i * 0.05) + (Math.random() * 0.04 - 0.02)
    );
    currentTime += interval;
    interval = Math.max(0.12, interval - (0.032 + Math.random() * 0.006));
    lastEndTime = Math.max(lastEndTime, endTime);
  }

  return { endTime: lastEndTime };
};
