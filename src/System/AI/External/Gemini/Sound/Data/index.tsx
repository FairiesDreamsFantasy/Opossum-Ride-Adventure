/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundEngineUtils } from "../Engine";
import { GeminiSynthesizer } from "../Synthesizer";
import { SoundSurround } from "../Surround_Sound";
import { SoundVolumeControl } from "../Volume_Control";

export const GeminiSoundData = {
  Engine: SoundEngineUtils,
  Synthesizer: GeminiSynthesizer,
  SurroundSound: SoundSurround,
  VolumeControl: SoundVolumeControl,
};
