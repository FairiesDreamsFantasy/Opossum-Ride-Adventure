/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

import { PorchPerimeterWalkwayNarration } from "./Perimeter_Walkway";
import { PorchGrandVerandaNarration } from "./Grand_Veranda";
import { PorchSouthwestSquareNarration } from "./Southwest_Square";

/**
 * Southwest Porch Arena Narration Module
 * 
 * Manages the 4,000-foot expansive porch perimeter, outdoor veranda,
 * elevated walkways, and panoramic ambient acoustics.
 */
export const PorchArenaNarration = {
  arenaId: "porch",
  arenaName: "Southwest Porch",

  subarenas: {
    perimeter_walkway: PorchPerimeterWalkwayNarration,
    veranda: PorchGrandVerandaNarration,
    southwest_square: PorchSouthwestSquareNarration
  },

  /**
   * Compiles Porch scene description through registered place parameters.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Southwest Porch";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "solid cedar decking";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Mountain Air";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  },

  /**
   * Compiles course position announcement along the porch walkway.
   */
  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} along the perimeter walkway, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export {
  PorchPerimeterWalkwayNarration,
  PorchGrandVerandaNarration,
  PorchSouthwestSquareNarration
};

export default PorchArenaNarration;
