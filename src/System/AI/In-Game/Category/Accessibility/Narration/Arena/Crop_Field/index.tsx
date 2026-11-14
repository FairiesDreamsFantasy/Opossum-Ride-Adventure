/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

import { WheatFieldNarration } from "./Wheat_Field";
import { CornFieldNarration } from "./Corn_Field";
import { BarleyFieldNarration } from "./Barley_Field";
import { RiceFieldNarration } from "./Rice_Field";
import { OatsFieldNarration } from "./Oats_Field";
import { SorghumFieldNarration } from "./Sorghum_Field";
import { RyeFieldNarration } from "./Rye_Field";
import { MilletFieldNarration } from "./Millet_Field";
import { BuckwheatFieldNarration } from "./Buckwheat_Field";
import { QuinoaFieldNarration } from "./Quinoa_Field";
import { AmaranthFieldNarration } from "./Amaranth_Field";
import { SpeltFieldNarration } from "./Spelt_Field";

export const CROP_FIELD_PLACE_IDS = [
  "crop_field",
  "wheat_field",
  "corn_field",
  "barley_field",
  "rice_field",
  "oats_field",
  "sorghum_field",
  "rye_field",
  "millet_field",
  "buckwheat_field",
  "quinoa_field",
  "amaranth_field",
  "spelt_field"
] as const;

export function isCropFieldPlaceId(placeId: string): boolean {
  if (!placeId) return false;
  const normalized = placeId.trim().toLowerCase();
  return (CROP_FIELD_PLACE_IDS as readonly string[]).includes(normalized) || normalized.includes("crop_field");
}

/**
 * Crop Field Arena Narration Module
 * Eliminates fallback ambiguity across all 12 functional crop field subarenas.
 */
export const CropFieldArenaNarration = {
  arenaId: "crop_field",
  arenaName: "Crop Fields",

  subarenas: {
    wheat_field: WheatFieldNarration,
    corn_field: CornFieldNarration,
    barley_field: BarleyFieldNarration,
    rice_field: RiceFieldNarration,
    oats_field: OatsFieldNarration,
    sorghum_field: SorghumFieldNarration,
    rye_field: RyeFieldNarration,
    millet_field: MilletFieldNarration,
    buckwheat_field: BuckwheatFieldNarration,
    quinoa_field: QuinoaFieldNarration,
    amaranth_field: AmaranthFieldNarration,
    spelt_field: SpeltFieldNarration
  },

  compileScene: (ctx: SceneNarrationContext): string => {
    const key = (ctx.placeId || "").trim().toLowerCase() as keyof typeof CropFieldArenaNarration.subarenas;
    const subNarration = CropFieldArenaNarration.subarenas[key];
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);

    const name = ctx.levelName || subNarration?.name || resolvedPlace.name || "Crop Fields";
    const substrate =
      ctx.surfaceType ||
      subNarration?.substrate ||
      resolvedPlace.surfaceType ||
      "flat triangular slate stone blocks";
    const acoustic = subNarration?.acoustic || resolvedPlace.ambientNoise || "winds rustling through sunlit crop fields";
    const description =
      ctx.longDescription ||
      subNarration?.description ||
      resolvedPlace.longDescription ||
      resolvedPlace.description ||
      "";

    return `You are currently at ${name}, connected seamlessly from the Cattle Farm. Path surface uses ${substrate}, giving crisp 1650 Hz Slate acoustic feedback underfoot, divided from rustling robotic-tended crops by 12-inch Red, Gold, and Green triangular border stones. Ambient sound features ${acoustic}. ${description}`;
  },

  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} along the ground-oriented 36-color triangular slate stone path, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export {
  WheatFieldNarration,
  CornFieldNarration,
  BarleyFieldNarration,
  RiceFieldNarration,
  OatsFieldNarration,
  SorghumFieldNarration,
  RyeFieldNarration,
  MilletFieldNarration,
  BuckwheatFieldNarration,
  QuinoaFieldNarration,
  AmaranthFieldNarration,
  SpeltFieldNarration
};

export default CropFieldArenaNarration;
