/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GlacialIceRidgeSubArena } from "./Glacial_Ice_Ridge";
import { BasaltVolcanicCrestSubArena } from "./Basalt_Volcanic_Crest";
import { AlpineSnowSaddleSubArena } from "./Alpine_Snow_Saddle";
import { SlateSwitchbackPassSubArena } from "./Slate_Switchback_Pass";
import { LimestoneKarstCragSubArena } from "./Limestone_Karst_Crag";
import { TimberlineMeadowSpurSubArena } from "./Timberline_Meadow_Spur";
import { CloudGorgeLedgeSubArena } from "./Cloud_Gorge_Ledge";

export const MountainsArena = {
  "id": "mountains",
  "name": "The Rugged Granite Scree Peak",
  "description": "High mountain trails surrounded by towering crags and sheer rock cliffs.",
  "surfaceType": "cracked shale and granite scree",
  "footstepSound": "sharp rock slide clicks",
  "colorBase": "#334155",
  "ambientNoise": "howling high altitude wind",
  "lightingLevel": 0.85,
  "skyColor": "#0369a1",
  "horizonColor": "#7dd3fc",
  "frameColor": "#475569",
  "groundColor": "#334155",
  "fireflyColor": "#e2e8f0",
  SubArenas: {
    GlacialIceRidgeSubArena,
    BasaltVolcanicCrestSubArena,
    AlpineSnowSaddleSubArena,
    SlateSwitchbackPassSubArena,
    LimestoneKarstCragSubArena,
    TimberlineMeadowSpurSubArena,
    CloudGorgeLedgeSubArena
  }
};

export {
  GlacialIceRidgeSubArena,
  BasaltVolcanicCrestSubArena,
  AlpineSnowSaddleSubArena,
  SlateSwitchbackPassSubArena,
  LimestoneKarstCragSubArena,
  TimberlineMeadowSpurSubArena,
  CloudGorgeLedgeSubArena
};

export default MountainsArena;
