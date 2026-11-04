/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

import { CellarStoneCorridorNarration } from "./Stone_Corridor";
import { CellarSubterraneanVaultNarration } from "./Subterranean_Vault";
import { CellarAgingChamberNarration } from "./Aging_Chamber";

/**
 * Grand Cellar Arena Narration Module
 * 
 * Manages subterranean stone corridors, oak aging vaults, and cavernous acoustic RT60 profiles.
 */
export const CellarArenaNarration = {
  arenaId: "cellar",
  arenaName: "Grand Cellar",

  subarenas: {
    stone_corridor: CellarStoneCorridorNarration,
    stone_room: CellarSubterraneanVaultNarration,
    aging_chamber: CellarAgingChamberNarration
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

export {
  CellarStoneCorridorNarration,
  CellarSubterraneanVaultNarration,
  CellarAgingChamberNarration
};

export default CellarArenaNarration;
