/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./TTS";
export * from "./Synthesizer";

export const ProceduralSoundSystem = {
  initialize: () => {},
  playSound: () => {}
};

export const RHYTHM_PROFILES = {
  gallop: [0, 0.25, 0.5, 0.75],
  trot: [0, 0.5]
};
