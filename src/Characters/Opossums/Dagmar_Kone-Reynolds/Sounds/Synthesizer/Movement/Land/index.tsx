/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Character-Specific Landing Sound
 */
export const playLand = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.connect(gain);
  gain.connect(destination);

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(150, now);
  osc.frequency.linearRampToValueAtTime(30, now + 0.4);
  
  gain.gain.setValueAtTime(0.315, now); // Amplified 5%
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
  
  const endTime = now + 0.5;
  osc.start(now);
  osc.stop(endTime);

  return { nodes: [osc, gain], endTime };
};
