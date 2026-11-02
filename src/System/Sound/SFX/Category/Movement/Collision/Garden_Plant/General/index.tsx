/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Garden Plant General Collision logic
 */
export const playGardenPlantCollisionGeneral = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();
  osc.connect(gain);
  gain.connect(destination);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(350, now);
  osc.frequency.linearRampToValueAtTime(150, now + 0.15);
  
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
  
  osc.start(now);
  osc.stop(now + 0.2);
  
  return { nodes: [osc, gain], endTime: now + 0.2 };
};
