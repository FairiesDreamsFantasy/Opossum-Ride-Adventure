/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural walk: 4-beat steady heavy gait (Left-Rear, Left-Front, Right-Rear, Right-Front)
 */
export const playWalkLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const beats = [0.0, 0.25, 0.5, 0.75]; // Methodous pace
  let lastEndTime = startTime;

  beats.forEach((offset, idx) => {
    const timeJitter = (Math.random() * 0.03) - 0.015;
    const freqJitter = (Math.random() * 12) - 6;
    const volJitter = (Math.random() * 0.06) - 0.03;
    const time = startTime + offset + timeJitter;
    const isFrontHoof = idx % 2 === 1; // Front hoof is slightly heavier and different frequency
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      time,
      (isFrontHoof ? 60 : 50) + freqJitter,
      0.15,
      Math.max(0.1, (isFrontHoof ? 0.35 : 0.25) + volJitter)
    );
    lastEndTime = Math.max(lastEndTime, endTime);
  });

  return { endTime: lastEndTime };
};
