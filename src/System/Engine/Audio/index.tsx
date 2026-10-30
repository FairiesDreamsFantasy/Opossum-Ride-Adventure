/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Narrator } from "./Narrator";
import { DEFAULT_AUDIO_SETTINGS, isAudioSupported } from "./General";
import { ProceduralSoundSystem } from "../../Sound";
import { playProceduralSound } from "../../Sound/TTS";

export { Narrator } from "./Narrator";
export * from "./General";

/**
 * Main Audio coordinator for the Opossum Ride Adventure Engine.
 * Ensures strict separation between screen-readers (TTS) and actual game sound effects.
 */
export const AudioEngine = {
  Narrator,
  DEFAULT_AUDIO_SETTINGS,
  isAudioSupported,

  /**
   * Safe procedurally synthesized sound play wrapper.
   */
  playSound(type: "tick" | "chatter" | "jump" | "crash", isRetro = false): void {
    playProceduralSound(type, isRetro);
  },

  /**
   * Trigger the high-fidelity chatter vocalization for a specific opossum.
   */
  playChatter(soundSystem: ProceduralSoundSystem, characterId: string, isRetro = false): void {
    if (soundSystem) {
      soundSystem.playOpossumChatter(isRetro, characterId);
    }
  },

  /**
   * Trigger spatialized footstep sounds based on surface.
   */
  playFootstep(soundSystem: ProceduralSoundSystem, surfaceType: string): void {
    if (soundSystem) {
      soundSystem.playFootstep(surfaceType);
    }
  },
};
