/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Smart Chatter System
 * 
 * A scientifically tuned algorithm to trigger automated opossum chatter
 * without overwhelming the player. Uses a temporal refractory period (cooldown)
 * and environment-based probability scaling.
 */

export interface SmartChatterState {
  lastChatterTime: number; // in seconds (game time)
}

/**
 * Evaluates whether a smart chatter event should be triggered.
 * 
 * @param gameTime Total elapsed game time in seconds
 * @param state Current state tracking the last chatter event
 * @param isHotspotEnv Whether the environment has high activity (hotspots)
 * @param delta Time since last frame in seconds
 * @returns boolean True if chatter should trigger
 */
export function evaluateSmartChatter(
  gameTime: number,
  state: SmartChatterState,
  isHotspotEnv: boolean,
  delta: number
): boolean {
  const timeSinceLast = gameTime - state.lastChatterTime;
  
  // Refractory period: Absolute minimum silence to ensure craftsmanship and avoid "spam"
  const minRefractoryPeriod = isHotspotEnv ? 6.5 : 12.0; 

  if (timeSinceLast < minRefractoryPeriod) {
    return false;
  }

  // Baseline probability per second
  // In hotspots, the opossum is more anxious/excited
  const baseRate = isHotspotEnv ? 0.035 : 0.01;
  
  // Accumulative probability factor: the longer we wait, the more likely the opossum wants to chatter
  // Caps at 2.5x base rate after 30 seconds of silence
  const tensionFactor = Math.min(2.5, timeSinceLast / 20.0);
  
  const finalProbability = delta * baseRate * tensionFactor;

  return Math.random() < finalProbability;
}
