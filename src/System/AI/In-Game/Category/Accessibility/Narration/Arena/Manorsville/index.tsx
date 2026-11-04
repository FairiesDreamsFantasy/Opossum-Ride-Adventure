/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

import { ManorsvilleDalesvilleNarration } from "./Dalesville";
import { ManorsvilleGrandTeaRoomNarration } from "./Grand_Tea_Room";
import { ManorsvilleManorGroundsNarration } from "./Manor_Grounds";

/**
 * Manorsville Arena Narration Module
 * 
 * Manages spatial orientation, acoustics, and subarenas across the Manorsville estate.
 */
export const ManorsvilleArenaNarration = {
  arenaId: "manorsville",
  arenaName: "Manorsville Estate",

  subarenas: {
    dalesville: ManorsvilleDalesvilleNarration,
    grand_tea_room: ManorsvilleGrandTeaRoomNarration,
    manor_grounds: ManorsvilleManorGroundsNarration
  },

  /**
   * Compiles Manorsville scene description through registered place data.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Manorsville Estate";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "historic estate terrain";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Estate Ambience";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  },

  /**
   * Compiles course position announcement in Manorsville.
   */
  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} within the Manorsville estate grounds, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export {
  ManorsvilleDalesvilleNarration,
  ManorsvilleGrandTeaRoomNarration,
  ManorsvilleManorGroundsNarration
};

export default ManorsvilleArenaNarration;
