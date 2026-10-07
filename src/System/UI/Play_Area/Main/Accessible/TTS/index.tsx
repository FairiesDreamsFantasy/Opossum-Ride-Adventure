/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TTSGeneral, SpeechOptions } from "./General";

export * from "./General";

/**
 * Text-To-Speech Controller module for Accessible Screen Reader Announcements.
 */
export const TTSController = {
  speak: (text: string, options?: SpeechOptions) => {
    TTSGeneral.speakWords(text, options);
  },
  stop: () => {
    TTSGeneral.cancelSpeech();
  }
};
