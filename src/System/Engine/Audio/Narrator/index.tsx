/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { speakWords, setSpeechEnabled, isSpeechEnabled, stopSpeaking } from "../../../Sound/TTS";
import { NarratorSettings, compileScenicDescription } from "./General";

/**
 * Narrator controller for Opossum Ride Adventure.
 * Standardizes beautiful, resource-conserving, offline-friendly TTS voice and narration announcements.
 */
export const Narrator = {
  /**
   * Safe text-to-speech announcement.
   */
  announce(words: string, interrupt = true): void {
    speakWords(words, interrupt);
  },

  /**
   * Enable/disable narration speech.
   */
  setNarrationEnabled(enabled: boolean): void {
    setSpeechEnabled(enabled);
  },

  /**
   * Check if narration speech is enabled.
   */
  isNarrationEnabled(): boolean {
    return isSpeechEnabled();
  },

  /**
   * Stop all active speech announcements immediately.
   */
  silence(): void {
    stopSpeaking();
  },

  /**
   * Helper to format and narrate a scenic overview.
   */
  narrateScene(
    arena: { name: string; surfaceType: string; theme: string; longDescription?: string },
    isFoyer: boolean,
    foyerDesc: { prompt: string; reverbProfile: string; extendedNarrative: string },
    settings: NarratorSettings
  ): void {
    const description = compileScenicDescription(arena, isFoyer, foyerDesc, settings);
    speakWords(description);
  },
};
