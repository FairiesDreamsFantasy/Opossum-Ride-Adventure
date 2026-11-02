/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Tick Sound
 * Short clear tick digest chime.
 */

export const playTickSound = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.connect(gain);
  gain.connect(destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
  
  // Amplified by 5% (from 0.15 -> 0.1575)
  gain.gain.setValueAtTime(0.1575, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
  
  const endTime = now + 0.1;
  osc.start(now);
  osc.stop(endTime);

  return { nodes: [osc, gain], endTime };
};
