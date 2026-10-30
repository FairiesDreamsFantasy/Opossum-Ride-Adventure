/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CaveArenaRegistryDescription } from "./Description";

/**
 * Cave Arena Registry
 * Handles environmental constants and structural data for the cave world.
 */
export const CaveRegistry = {
  id: "arena_cave",
  metadata: {
    name: "Glowing Synth Forest Cave",
    description: "A subterranean passage filled with bioluminescent fungi and neon crystals."
  },
  Description: CaveArenaRegistryDescription,
  environment: {
    ambientLight: "#0a1a0a",
    fogDensity: 0.15,
    echoFactor: 0.8,
    reverbProfile: "Large Cave"
  },
  dimensions: {
    width: 2000,
    height: 800,
    depth: 5000
  }
};

export default CaveRegistry;
