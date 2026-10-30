/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "./Scene_Types";
import { FoyerArenaNarration } from "./Foyer";
import { GardenArenaNarration } from "./Garden";
import { CellarArenaNarration } from "./Cellar";
import { PorchArenaNarration } from "./Porch";
import { PlaceResolver } from "../../../../../../Engine/Resolver";

/**
 * Arena Narration Registry
 * 
 * Central dispatch router for modular arena and subarena narrations.
 * Eliminates monolithic hard-coded string branching in Scene and Position engines.
 */
export const ArenaNarrationRegistry = {
  /**
   * Compiles scene description for any given place, routing to its modular arena handler.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    if (ctx.isFoyer || ctx.placeId === "floor_foyer") {
      return FoyerArenaNarration.compileScene(ctx);
    }

    if (ctx.placeId === "cellar" || ctx.placeId.startsWith("stone_")) {
      return CellarArenaNarration.compileScene(ctx);
    }

    if (ctx.placeId === "porch" || ctx.placeId.includes("porch")) {
      return PorchArenaNarration.compileScene(ctx);
    }

    // Default to Garden arena engine for natural terrain, groves, orchards, farms, and outdoor arenas
    return GardenArenaNarration.compileScene(ctx);
  },

  /**
   * Compiles position and navigation announcement for any given place or level.
   */
  compilePosition: (
    levelId: number,
    levelName: string | undefined,
    placeId: string,
    foyerX: number,
    foyerY: number,
    foyerDirection: string,
    _playerZ: number,
    formattedDistance: string,
    segmentDirection: string
  ): string => {
    if (levelId === 0 || placeId === "floor_foyer") {
      return FoyerArenaNarration.compilePosition(foyerX, foyerY, foyerDirection);
    }

    const resolvedPlace = PlaceResolver.resolvePlace(placeId, levelName);
    const activeName = levelName || resolvedPlace.name || "Course";

    if (placeId === "cellar" || placeId.startsWith("stone_")) {
      return CellarArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    if (placeId === "porch" || placeId.includes("porch")) {
      return PorchArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    return GardenArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
  }
};

export default ArenaNarrationRegistry;
