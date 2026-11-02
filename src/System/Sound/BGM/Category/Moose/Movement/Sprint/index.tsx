/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural sprint: high-tempo, extreme power galloping pattern
 */
export const playSprintLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const steps = [0.0, 0.06, 0.16, 0.22];
  let lastEndTime = startTime;

  steps.forEach((offset, idx) => {
    const timeJitter = (Math.random() * 0.016) - 0.008;
    const freqJitter = (Math.random() * 18) - 9;
    const volJitter = (Math.random() * 0.08) - 0.04;
    const time = startTime + offset + timeJitter;
    const isFront = idx >= 2;
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      time,
      (isFront ? 95 : 80) + freqJitter,
      0.12,
      Math.max(0.1, (isFront ? 0.6 : 0.45) + volJitter)
    );
    lastEndTime = Math.max(lastEndTime, endTime);
  });

  return { endTime: lastEndTime };
};
