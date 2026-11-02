/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TTSController, SpeechOptions } from "./TTS";
import { AccessibleGeneral } from "./General";
import { multiTapNavigator, MultiTapNavigator, MultiTapContext } from "./Key_Taps";

export * from "./TTS";
export * from "./General";
export * from "./Key_Taps";

/**
 * Main Accessibility & Screen-Reader Narration Module.
 */
export const AccessibleNarrationModule = {
  announce: (message: string, options?: SpeechOptions) => {
    TTSController.speak(message, options);
  },
  cancel: () => {
    TTSController.stop();
  },
  format: AccessibleGeneral.formatAnnouncement,
  multiTap: multiTapNavigator
};
