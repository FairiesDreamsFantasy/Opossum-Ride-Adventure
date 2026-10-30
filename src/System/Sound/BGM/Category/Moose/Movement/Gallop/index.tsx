/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural gallop: asymmetric 4-beat pattern (hind-left, hind-right, front-left, front-right) followed by suspension
 */
export const playGallopLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const steps = [0.0, 0.08, 0.22, 0.30];
  let lastEndTime = startTime;

  steps.forEach((offset, idx) => {
    const timeJitter = (Math.random() * 0.02) - 0.01;
    const freqJitter = (Math.random() * 16) - 8;
    const volJitter = (Math.random() * 0.08) - 0.04;
    const time = startTime + offset + timeJitter;
    const isFront = idx >= 2;
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      time,
      (isFront ? 85 : 72) + freqJitter,
      0.16,
      Math.max(0.1, (isFront ? 0.5 : 0.35) + volJitter)
    );
    lastEndTime = Math.max(lastEndTime, endTime);
  });

  return { endTime: lastEndTime };
};
