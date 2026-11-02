/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Rock General Collision logic
 */
export const playRockCollisionGeneral = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(destination);
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(100, now);
  osc.frequency.linearRampToValueAtTime(30, now + 0.3);
  
  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
  
  osc.start(now);
  osc.stop(now + 0.4);
  
  return { nodes: [osc, gain], endTime: now + 0.4 };
};
