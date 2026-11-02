/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createMooseHoofThump } from "../General";

/**
 * Procedural stomp: heavy, dramatic single foot down-force stomp with sub-bass rumble
 */
export const playStomp = (context: AudioContext, destination: AudioNode, startTime: number) => {
  // Ultra low body thud
  const { endTime } = createMooseHoofThump(
    context,
    destination,
    startTime,
    45, // lower pitch
    0.35, // longer decay
    0.75 // louder
  );

  // Dirt splash / gravel scuff
  const oscDirt = context.createOscillator();
  const gainDirt = context.createGain();
  oscDirt.connect(gainDirt);
  gainDirt.connect(destination);

  oscDirt.type = "triangle";
  oscDirt.frequency.setValueAtTime(250, startTime);
  oscDirt.frequency.exponentialRampToValueAtTime(30, startTime + 0.25);

  gainDirt.gain.setValueAtTime(0.25, startTime);
  gainDirt.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

  oscDirt.start(startTime);
  oscDirt.stop(startTime + 0.26);

  return { endTime: Math.max(endTime, startTime + 0.26) };
};
