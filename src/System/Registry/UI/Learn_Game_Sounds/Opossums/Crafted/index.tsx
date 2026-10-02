/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
import { CRAFTED_OPOSSUM_SOUND_REGISTRY } from "./General";

export const CraftedOpossumsSoundRegistry = {
  name: "Crafted Opossums Sound Registry",
  description: "Sound activation mappings for the 16 handcrafted jill opossums.",
  characters: CRAFTED_OPOSSUM_SOUND_REGISTRY,
  count: CRAFTED_OPOSSUM_SOUND_REGISTRY.length
};
