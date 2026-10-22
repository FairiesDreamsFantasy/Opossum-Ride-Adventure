/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const FeralPigBehaviorsRegistry = {
  states: ["rooting", "patrolling", "alert", "charging", "evading", "smashed"],
  boarConfig: {
    detectionRadius: 240,
    chargeSpeedMultiplier: 1.55,
    rootingDurationMinMs: 1800,
    rootingDurationMaxMs: 4200
  },
  sowConfig: {
    detectionRadius: 280,
    chargeSpeedMultiplier: 1.35,
    rootingDurationMinMs: 2200,
    rootingDurationMaxMs: 5000
  }
};
