/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Procedural Jump Sound
 * Synthesized audio for movement propulsion.
 */

export const playJumpSound = (context: AudioContext, destination: AudioNode) => {
  const now = context.currentTime;
  const osc = context.createOscillator();
  const gain = context.createGain();

  osc.connect(gain);
  gain.connect(destination);

  // Swoosh climbing frequency jump
  osc.type = "sine";
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(360, now + 0.3);
  
  // Amplified by 15% (from 0.229 -> 0.26335)
  gain.gain.setValueAtTime(0.26335, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + 0.32);
  
  const endTime = now + 0.35;
  osc.start(now);
  osc.stop(endTime);

  return { nodes: [osc, gain], endTime };
};
