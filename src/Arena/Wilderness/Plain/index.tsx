/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TallgrassPrairieSubArena } from "./Tallgrass_Prairie";
import { SagebrushSteppeSubArena } from "./Sagebrush_Steppe";
import { GoldenSavannahSubArena } from "./Golden_Savannah";
import { WildflowerMeadowSubArena } from "./Wildflower_Meadow";
import { CoastalMoorlandSubArena } from "./Coastal_Moorland";
import { WindsweptTundraSubArena } from "./Windswept_Tundra";
import { PampasFloodplainSubArena } from "./Pampas_Floodplain";

export const PlainArena = {
  "id": "plain",
  "name": "The Whispering Switchgrass Fields",
  "description": "A wide open-air prairie where footprints fade rapidly into the rich grassy soil.",
  "surfaceType": "loose switchgrass loam",
  "footstepSound": "dry switchgrass brush",
  "colorBase": "#3f6212",
  "ambientNoise": "sweeping grassland breeze",
  "lightingLevel": 1.0,
  "skyColor": "#0c4a6e",
  "horizonColor": "#38bdf8",
  "frameColor": "#15803d",
  "groundColor": "#3f6212",
  "fireflyColor": "#fde047",
  SubArenas: {
    TallgrassPrairieSubArena,
    SagebrushSteppeSubArena,
    GoldenSavannahSubArena,
    WildflowerMeadowSubArena,
    CoastalMoorlandSubArena,
    WindsweptTundraSubArena,
    PampasFloodplainSubArena
  }
};

export {
  TallgrassPrairieSubArena,
  SagebrushSteppeSubArena,
  GoldenSavannahSubArena,
  WildflowerMeadowSubArena,
  CoastalMoorlandSubArena,
  WindsweptTundraSubArena,
  PampasFloodplainSubArena
};

export default PlainArena;
