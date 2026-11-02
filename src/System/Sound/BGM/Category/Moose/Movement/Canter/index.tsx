/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural canter: asymmetric 3-beat rhythm (diagonal, single, diagonal)
 */
export const playCanterLoop = (context: AudioContext, destination: AudioNode, startTime: number) => {
  const steps = [0.0, 0.18, 0.36];
  let lastEndTime = startTime;

  steps.forEach((offset, idx) => {
    const timeJitter = (Math.random() * 0.025) - 0.0125;
    const freqJitter = (Math.random() * 12) - 6;
    const volJitter = (Math.random() * 0.06) - 0.03;
    const time = startTime + offset + timeJitter;
    const isLeadFoot = idx === 1;
    const { endTime } = createMooseHoofThump(
      context,
      destination,
      time,
      (isLeadFoot ? 75 : 62) + freqJitter,
      0.14,
      Math.max(0.1, (isLeadFoot ? 0.45 : 0.3) + volJitter)
    );
    lastEndTime = Math.max(lastEndTime, endTime);
  });

  return { endTime: lastEndTime };
};
