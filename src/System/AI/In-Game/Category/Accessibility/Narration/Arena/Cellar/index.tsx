/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

/**
 * Grand Cellar Arena Narration Module
 * 
 * Manages subterranean stone corridors, oak aging vaults, and cavernous acoustic RT60 profiles.
 */
export const CellarArenaNarration = {
  arenaId: "cellar",
  arenaName: "Grand Cellar",

  subarenas: {
    stone_corridor: {
      name: "Grand Cellar Stone Corridor",
      substrate: "hewn limestone slab with damp acoustic damping",
      reverb: "dense subterranean stone reflections RT60 ~1.6s"
    },
    stone_room: {
      name: "Subterranean Stone Vault",
      substrate: "massive granite flags surrounded by heavy masonry arches",
      reverb: "enclosed stone vault resonance RT60 ~1.4s"
    },
    aging_chamber: {
      name: "Oak Aging Chamber",
      substrate: "packed earth and timber runners holding oak casks",
      reverb: "wood-damped cellar atmosphere RT60 ~1.1s"
    }
  },

  /**
   * Compiles Cellar scene description through registered place parameters.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Grand Cellar";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "hewn limestone substrate";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Subterranean Echo";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  },

  /**
   * Compiles course position announcement in the cellar.
   */
  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} along the subterranean passage, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export default CellarArenaNarration;
