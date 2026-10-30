/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";

/**
 * Floor Foyer Arena Narration Module
 * 
 * Manages spatial coordinates, acoustic reverb profiling, and subarena
 * hotspots (Entrance, Grand Tapestry, Southwest Ramp, Perimeter Walkway, Dishwasher Room).
 */
export const FoyerArenaNarration = {
  arenaId: "floor_foyer",
  arenaName: "Floor Foyer",

  /**
   * Subarenas and localized architectural hotspots within the Floor Foyer
   */
  subarenas: {
    entrance: {
      name: "Grand Foyer Entrance",
      description: "You stand near the grand entrance threshold of the Manor.",
      reverb: "medium hall RT60 ~1.2s"
    },
    centralChandelier: {
      name: "Central Crystal Chandelier",
      description: "Directly under the massive crystal chandelier illuminating the foyer floor.",
      reverb: "extended high-ceiling chamber RT60 ~1.4s"
    },
    tapestryAlcove: {
      name: "Grand Tapestry Alcove",
      description: "Near the upper alcove where the historic Grand Tapestry is proudly showcased.",
      reverb: "muffled textile damping RT60 ~0.9s"
    },
    southwestRamp: {
      name: "Southwest Perimeter Ramp",
      description: "At the gentle inclined ramp leading upward to the perimeter walkway.",
      reverb: "angled acoustic corridor RT60 ~1.1s"
    },
    perimeterWalkway: {
      name: "Foyer Perimeter Walkway",
      description: "On the expansive perimeter walkway overlooking the central foyer hall.",
      reverb: "open balustrade dispersion RT60 ~1.3s"
    },
    dishwasherRoom: {
      name: "Dishwasher Room Threshold",
      description: "At the dedicated entrance leading into the manor service and dishwasher room.",
      reverb: "tiled utility resonance RT60 ~0.8s"
    }
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

export default FoyerArenaNarration;
