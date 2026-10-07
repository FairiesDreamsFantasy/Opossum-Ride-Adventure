/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AudioSynthWildcard } from "./_Wildcard_";

export const GeminiAudioSynth = {
  ...AudioSynthWildcard,
  triggerSyntheticAmbientScape: AudioSynthWildcard.General.triggerSyntheticAmbientScape
};

export * from "./_Wildcard_";
export default GeminiAudioSynth;
