/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "./Scene_Types";
import { FoyerArenaNarration } from "./Foyer";
import { GardenArenaNarration } from "./Garden";
import { CellarArenaNarration } from "./Cellar";
import { PorchArenaNarration } from "./Porch";
import { ManorsvilleArenaNarration } from "./Manorsville";
import { CropFieldArenaNarration, isCropFieldPlaceId } from "./Crop_Field";
import { VegetableFieldArenaNarration, isVegetableFieldPlaceId } from "./Vegetable_Field";
import { WildernessArenaNarration, isWildernessPlaceId } from "./Wilderness";
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
    if (ctx.placeId === "temple_courtyard") {
      const title = ctx.levelName || "Temple Courtyard";
      return `${title}: A 4000 by 3000 foot outdoor stone temple courtyard with 25-foot stone walls, a north flower garden on grass, a south 20-foot canopy tile tea garden with spaced tea tables, and carved double sliding stone doors east into the 3000 by 3000 foot 40-foot-tall checkered tile Temple Foyer.`;
    }

    if (ctx.isFoyer || ctx.placeId === "floor_foyer") {
      return FoyerArenaNarration.compileScene(ctx);
    }

    if (ctx.placeId === "cellar" || ctx.placeId.startsWith("stone_")) {
      return CellarArenaNarration.compileScene(ctx);
    }

    if (ctx.placeId === "porch" || ctx.placeId.includes("porch")) {
      return PorchArenaNarration.compileScene(ctx);
    }

    if (ctx.placeId === "manorsville" || ctx.placeId.includes("dalesville") || ctx.placeId.includes("tea_room")) {
      return ManorsvilleArenaNarration.compileScene(ctx);
    }

    if (isCropFieldPlaceId(ctx.placeId)) {
      return CropFieldArenaNarration.compileScene(ctx);
    }

    if (isVegetableFieldPlaceId(ctx.placeId)) {
      return VegetableFieldArenaNarration.compileScene(ctx);
    }

    if (isWildernessPlaceId(ctx.placeId)) {
      return WildernessArenaNarration.compileScene(ctx);
    }

    // Default to Garden arena engine for natural terrain, groves, orchards, and farms
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
    if (placeId === "temple_courtyard") {
      const zoneLabel = foyerX > 4000
        ? `Temple Foyer (${Math.round(foyerX - 4000)} feet east, ${Math.round(foyerY)} feet north)`
        : foyerY > 3000
          ? `North Flower Garden (${Math.round(foyerX)} feet east, ${Math.round(foyerY)} feet north)`
          : foyerY < 0
            ? `South Outdoor Tea Area (${Math.round(foyerX)} feet east, ${Math.round(foyerY)} feet)`
            : `Temple Courtyard (${Math.round(foyerX)} feet east, ${Math.round(foyerY)} feet north)`;
      return `Position inside ${zoneLabel}, facing ${foyerDirection}.`;
    }

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

    if (placeId === "manorsville" || placeId.includes("dalesville") || placeId.includes("tea_room")) {
      return ManorsvilleArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    if (isCropFieldPlaceId(placeId)) {
      return CropFieldArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    if (isVegetableFieldPlaceId(placeId)) {
      return VegetableFieldArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    if (isWildernessPlaceId(placeId)) {
      return WildernessArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
    }

    return GardenArenaNarration.compilePosition(formattedDistance, activeName, segmentDirection);
  }
};

export default ArenaNarrationRegistry;
