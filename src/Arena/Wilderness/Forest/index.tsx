/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OldGrowthRedwoodSubArena } from "./Old_Growth_Redwood";
import { PineNeedleRidgeSubArena } from "./Pine_Needle_Ridge";
import { MossyRainforestSubArena } from "./Mossy_Rainforest";
import { AutumnMapleHollowSubArena } from "./Autumn_Maple_Hollow";
import { BorealSpruceTaigaSubArena } from "./Boreal_Spruce_Taiga";
import { BambooMistGroveSubArena } from "./Bamboo_Mist_Grove";
import { CypressBayouTrailSubArena } from "./Cypress_Bayou_Trail";

export const ForestArena = {
  "id": "forest",
  "name": "The Whispering Birch Forest",
  "description": "A dense, serene birch forest pathway surrounded by towering trees and organic soil.",
  "surfaceType": "dewy mulch and leaves",
  "footstepSound": "soft pine needle crunch",
  "colorBase": "#14532d",
  "ambientNoise": "swarming autumn cricket chorus",
  "lightingLevel": 0.9,
  "skyColor": "#052e16",
  "horizonColor": "#0f766e",
  "frameColor": "#15803d",
  "fireflyColor": "#86efac",
  SubArenas: {
    OldGrowthRedwoodSubArena,
    PineNeedleRidgeSubArena,
    MossyRainforestSubArena,
    AutumnMapleHollowSubArena,
    BorealSpruceTaigaSubArena,
    BambooMistGroveSubArena,
    CypressBayouTrailSubArena
  }
};

export {
  OldGrowthRedwoodSubArena,
  PineNeedleRidgeSubArena,
  MossyRainforestSubArena,
  AutumnMapleHollowSubArena,
  BorealSpruceTaigaSubArena,
  BambooMistGroveSubArena,
  CypressBayouTrailSubArena
};

export default ForestArena;
