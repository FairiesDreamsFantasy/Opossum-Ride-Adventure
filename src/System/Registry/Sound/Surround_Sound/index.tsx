/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Surround Sound Registry
 */
export const SurroundSoundRegistry = {
  id: "surround_ultra_precise",
  config: {
    channels: 6, // 5.1 Simulation
    mapping: ["FL", "FR", "FC", "LFE", "RL", "RR"],
    spatialization: "HRTF"
  },
  metadata: {
    name: "Ultra-Precise Surround",
    description: "Multi-channel spatial audio simulation using Head-Related Transfer Function."
  }
};
