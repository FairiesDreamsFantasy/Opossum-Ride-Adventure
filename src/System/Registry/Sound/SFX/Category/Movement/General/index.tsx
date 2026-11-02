/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const MovementSoundRegistry = {
  id: "movement_sfx",
  name: "Movement SFX Matrix",
  subtypes: ['collision', 'fence_crash', 'garden_plant_stomp', 'rock_impact', 'play_jump'],
  synthesisEngine: "Web Audio API 64-Bit Precision FM Collision Synthesizer",
  cloudDependency: false
};
