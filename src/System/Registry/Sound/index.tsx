/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StereoRegistry } from "./Stereo";
import { SurroundSoundRegistry } from "./Surround_Sound";
import { SoundGeneralRegistry } from "./General";
import { SoundLanguagesRegistry } from "./Engine/Languages";
import SoundEngine from "../../Sound/Engine";
import { BGMRegistryIndex } from "./BGM/Index";
import { SFXRegistryIndex } from "./SFX/Index";

export * from "./Engine/Languages";

export const SoundRegistryIndex = {
  BGM: BGMRegistryIndex,
  SFX: SFXRegistryIndex,
  standard: "75,000,000,000%_ULTRA_BROAD",
  timestamp: new Date().toISOString()
};

/**
 * Sound Registry Index
 */
export const SoundRegistry = {
  Stereo: StereoRegistry,
  Surround: SurroundSoundRegistry,
  General: SoundGeneralRegistry,
  Engine: SoundEngine,
  Languages: SoundLanguagesRegistry,
  Index: SoundRegistryIndex
};

