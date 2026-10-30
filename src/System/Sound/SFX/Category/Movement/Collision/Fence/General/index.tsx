/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Fence General Collision logic
 */
export const playFenceCollisionGeneral = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  
  // High fidelity wood splinter
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(destination);
  
  osc.type = "triangle";
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.linearRampToValueAtTime(60, now + 0.2);
  
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
  
  osc.start(now);
  osc.stop(now + 0.25);
  
  return { nodes: [osc, gain], endTime: now + 0.25 };
};
