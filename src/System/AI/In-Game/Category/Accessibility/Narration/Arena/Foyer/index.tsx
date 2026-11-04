/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";

import { FoyerEntranceNarration } from "./Entrance";
import { FoyerCentralChandelierNarration } from "./Central_Chandelier";
import { FoyerTapestryAlcoveNarration } from "./Tapestry_Alcove";
import { FoyerSouthwestRampNarration } from "./Southwest_Ramp";
import { FoyerPerimeterWalkwayNarration } from "./Perimeter_Walkway";
import { FoyerDishwasherRoomNarration } from "./Dishwasher_Room";

/**
 * Floor Foyer Arena Narration Module
 * 
 * Manages spatial coordinates, acoustic reverb profiling, and modular subarena
 * hotspots (Entrance, Grand Tapestry, Southwest Ramp, Perimeter Walkway, Dishwasher Room).
 */
export const FoyerArenaNarration = {
  arenaId: "floor_foyer",
  arenaName: "Floor Foyer",

  /**
   * Catalog of modular registered subarenas and localized architectural hotspots
   */
  subarenas: {
    entrance: FoyerEntranceNarration,
    centralChandelier: FoyerCentralChandelierNarration,
    tapestryAlcove: FoyerTapestryAlcoveNarration,
    southwestRamp: FoyerSouthwestRampNarration,
    perimeterWalkway: FoyerPerimeterWalkwayNarration,
    dishwasherRoom: FoyerDishwasherRoomNarration
  },

  /**
   * Compiles the Foyer scene description without Babylonian shortcuts or cloud lag.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    let desc = ctx.foyerPrompt || "You are inside the grand Floor Foyer of the Manor.";
    if (ctx.settings?.announceReverb && ctx.foyerReverb) {
      desc += ` The reverb profile is ${ctx.foyerReverb}.`;
    }
    if (ctx.settings?.extendedInfo && ctx.foyerExtended) {
      desc += ` ${ctx.foyerExtended}`;
    }
    return desc;
  },

  /**
   * Compiles high-precision Floor Foyer coordinate announcement.
   */
  compilePosition: (foyerX: number, foyerY: number, foyerDirection: string): string => {
    const px = Math.round(foyerX);
    const py = Math.round(foyerY);
    return `You are at position ${px}, ${py} of the floor foyer, facing ${foyerDirection}.`;
  }
};

export {
  FoyerEntranceNarration,
  FoyerCentralChandelierNarration,
  FoyerTapestryAlcoveNarration,
  FoyerSouthwestRampNarration,
  FoyerPerimeterWalkwayNarration,
  FoyerDishwasherRoomNarration
};

export default FoyerArenaNarration;
