/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SURFACE_PROFILES, RHYTHM_PROFILES } from "../../../Sound/General";

/**
 * Sound General Registry
 * Manages environmental acoustic and movement rhythm parameters.
 */
export const SoundGeneralRegistry = {
  id: "sound_general",
  name: "Sound General",
  SurfaceProfiles: SURFACE_PROFILES,
  RhythmProfiles: RHYTHM_PROFILES,
  timestamp: new Date().toISOString()
};
