/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { MOOSE_SOUND_DEFINITIONS } from "./General";

export const MooseSoundRegistry = {
  name: "Moose Sound Category Registry",
  description: "Sound activation mappings for moose vocalizations, cloven hoof movement, and combat impacts.",
  sounds: MOOSE_SOUND_DEFINITIONS,
  count: MOOSE_SOUND_DEFINITIONS.length
};
