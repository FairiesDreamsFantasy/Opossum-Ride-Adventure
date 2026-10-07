/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseHoofstepGeneral } from "./General";

export * from "./General";

/**
 * Procedural Cloven Hoof Click:
 * Generates an authentic dual-element keratin click with surface coupling.
 */
export const playMooseHoofClick = (
  context: AudioContext,
  destination: AudioNode,
  startTime: number = context.currentTime,
  options: { name?: string; type?: "Bull" | "Cow"; distance?: number; volume?: number } = {}
) => {
  const now = startTime;
  const isBull = options.type !== "Cow";
  const dist = options.distance ?? 0;
  const volFalloff = Math.max(0.001, 1 - dist / 120);
  const volume = (options.volume ?? 0.35) * volFalloff;

  // 1. Keratin Hoof Snap
  const clickOsc = context.createOscillator();
  const clickGain = context.createGain();
  const clickFilter = context.createBiquadFilter();

  const clickFreq = isBull ? 480 : 620;
  clickFilter.type = "bandpass";
  clickFilter.frequency.setValueAtTime(clickFreq, now);
  clickFilter.Q.setValueAtTime(4.0, now);

  clickOsc.type = "triangle";
  clickOsc.frequency.setValueAtTime(clickFreq * 1.5, now);
  clickOsc.frequency.exponentialRampToValueAtTime(80, now + 0.04);

  clickGain.gain.setValueAtTime(volume * 0.8, now);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  clickOsc.connect(clickFilter);
  clickFilter.connect(clickGain);
  clickGain.connect(destination);

  // 2. Ground Coupling Thump
  const thumpOsc = context.createOscillator();
  const thumpGain = context.createGain();

  const thumpFreq = isBull ? 90 : 115;
  thumpOsc.type = "sine";
  thumpOsc.frequency.setValueAtTime(thumpFreq, now);
  thumpOsc.frequency.exponentialRampToValueAtTime(30, now + 0.08);

  thumpGain.gain.setValueAtTime(volume * 0.5, now);
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  thumpOsc.connect(thumpGain);
  thumpGain.connect(destination);

  clickOsc.start(now);
  thumpOsc.start(now);

  const endTime = now + 0.09;
  clickOsc.stop(endTime);
  thumpOsc.stop(endTime);

  return { nodes: [clickOsc, clickFilter, clickGain, thumpOsc, thumpGain], endTime };
};
