/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

export const WILDERNESS_PLACE_IDS = [
  // Desert (8)
  "desert",
  "desert_obsidian_erg",
  "desert_salt_pan_basin",
  "desert_red_sandstone_mesa",
  "desert_oasis_palm_wadi",
  "desert_quartz_singing_dunes",
  "desert_chalk_badlands",
  "desert_canyon_arroyo",
  // Forest (8)
  "forest",
  "forest_old_growth_redwood",
  "forest_pine_needle_ridge",
  "forest_mossy_temperate_rainforest",
  "forest_autumn_maple_hollow",
  "forest_boreal_spruce_taiga",
  "forest_bamboo_mist_grove",
  "forest_cypress_bayou_trail",
  // Plain (8)
  "plain",
  "plain_tallgrass_prairie",
  "plain_sagebrush_steppe",
  "plain_golden_savannah",
  "plain_wildflower_meadow",
  "plain_coastal_moorland",
  "plain_windswept_tundra",
  "plain_pampas_floodplain",
  // Mountains (8)
  "mountains",
  "mountains_glacial_ice_ridge",
  "mountains_basalt_volcanic_crest",
  "mountains_alpine_snow_saddle",
  "mountains_slate_switchback_pass",
  "mountains_limestone_karst_crag",
  "mountains_timberline_meadow_spur",
  "mountains_cloud_gorge_ledge",
  // Natural Wilderness Caves (8)
  "wilderness_cave_limestone_grotto",
  "wilderness_cave_granite_rift",
  "wilderness_cave_glacial_ice_vault",
  "wilderness_cave_lava_tube",
  "wilderness_cave_marble_cathedral",
  "wilderness_cave_slate_fissure",
  "wilderness_cave_alluvial_gravel",
  "wilderness_cave_echosilt_hollow"
] as const;

export function isWildernessPlaceId(placeId: string): boolean {
  if (!placeId) return false;
  const normalized = placeId.trim().toLowerCase();
  if ((WILDERNESS_PLACE_IDS as readonly string[]).includes(normalized)) return true;
  return (
    normalized.startsWith("desert_") ||
    normalized.startsWith("forest_") ||
    normalized.startsWith("plain_") ||
    normalized.startsWith("mountains_") ||
    normalized.startsWith("wilderness_cave_")
  );
}

export const WildernessArenaNarration = {
  arenaId: "wilderness",
  arenaName: "The Great Outdoors, Wilderness and Mountains",

  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Wilderness";
    const substrate = ctx.surfaceType || resolvedPlace.surfaceType || "natural wilderness terrain";
    const acoustic = resolvedPlace.ambientNoise || "authentic wilderness atmospheric resonance";
    const description = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";
    const id = (ctx.placeId || "").trim().toLowerCase();
    const isCave = id.startsWith("wilderness_cave_");
    const biomeFamily = isCave
      ? "Natural Wilderness Cave"
      : id.startsWith("desert")
        ? "Wilderness Desert"
        : id.startsWith("forest")
          ? "Wilderness Forest"
          : id.startsWith("plain")
            ? "Wilderness Plains"
            : "Wilderness Mountains";

    return `You are currently exploring ${name} in World 4 (${biomeFamily}). Natural surface underfoot is ${substrate}, with true wilderness ambience featuring ${acoustic}. This wild terrain has zero fences, zero garden plants, and zero stone fences—instead offering elevated natural stone platforms you can jump onto and ride over. ${description}`;
  },

  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} along the natural wilderness course of ${activeName}, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export default WildernessArenaNarration;
