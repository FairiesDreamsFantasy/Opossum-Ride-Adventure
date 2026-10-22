/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Character-Specific Jump Sound
 */
export const playJump = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.connect(gain);
  gain.connect(destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(360, now + 0.3);
  
  gain.gain.setValueAtTime(0.26335, now); // Amplified 15%
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
  
  const endTime = now + 0.35;
  osc.start(now);
  osc.stop(endTime);

  return { nodes: [osc, gain], endTime };
};
