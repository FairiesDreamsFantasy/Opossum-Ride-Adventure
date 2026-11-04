/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneNarrationContext } from "../Scene_Types";
import { PlaceResolver } from "../../../../../../../Engine/Resolver";

import { ZenStoneGardenNarration } from "./Zen_Stone_Garden";
import { BotanicalMazeNarration } from "./Botanical_Maze";
import { ButterflySanctuaryNarration } from "./Butterfly_Sanctuary";
import { OrchidGlasshouseNarration } from "./Orchid_Glasshouse";
import { EdibleBerryGardenNarration } from "./Edible_Berry_Garden";
import { TheGrandOrchardNarration } from "./The_Grand_Orchard";
import { CherryOrchardNarration } from "./Cherry_Orchard";
import { AlmondGroveNarration } from "./Almond_Grove";
import { AppleGroveNarration } from "./Apple_Grove";
import { OliveGroveNarration } from "./Olive_Grove";
import { WalnutGroveNarration } from "./Walnut_Grove";
import { ChickenFarmNarration } from "./Chicken_Farm";
import { GoatFarmNarration } from "./Goat_Farm";
import { SheepFarmNarration } from "./Sheep_Farm";
import { DuckFarmNarration } from "./Duck_Farm";
import { GooseFarmNarration } from "./Goose_Farm";
import { CattleFarmNarration } from "./Cattle_Farm";
import { HorseFarmNarration } from "./Horse_Farm";

/**
 * Garden Arena Narration Module
 * 
 * Manages spatial orientation, substrate acoustics, and subarenas across the
 * Garden biome (Zen Stone Garden, Botanical Maze, Sanctuaries, Orchards, Groves, Farms).
 */
export const GardenArenaNarration = {
  arenaId: "garden",
  arenaName: "Garden Arena",

  /**
   * Catalog of all registered modular garden subarenas and botanical microclimates
   */
  subarenas: {
    zen_stone_garden: ZenStoneGardenNarration,
    botanical_maze: BotanicalMazeNarration,
    butterfly_sanctuary: ButterflySanctuaryNarration,
    orchid_glasshouse: OrchidGlasshouseNarration,
    edible_berry_garden: EdibleBerryGardenNarration,
    the_grand_orchard: TheGrandOrchardNarration,
    cherry_orchard: CherryOrchardNarration,
    almond_grove: AlmondGroveNarration,
    apple_grove: AppleGroveNarration,
    olive_grove: OliveGroveNarration,
    walnut_grove: WalnutGroveNarration,
    chicken_farm: ChickenFarmNarration,
    goat_farm: GoatFarmNarration,
    sheep_farm: SheepFarmNarration,
    duck_farm: DuckFarmNarration,
    goose_farm: GooseFarmNarration,
    cattle_farm: CattleFarmNarration,
    horse_farm: HorseFarmNarration
  },

  /**
   * Compiles the Garden scene description cleanly through registered place data.
   */
  compileScene: (ctx: SceneNarrationContext): string => {
    const resolvedPlace = PlaceResolver.resolvePlace(ctx.placeId, ctx.levelName);
    const name = ctx.levelName || resolvedPlace.name || "Garden Arena";
    const surface = ctx.surfaceType || resolvedPlace.surfaceType || "natural terrain";
    const atmosphere = ctx.theme || resolvedPlace.ambientNoise || "Serene";
    const longDesc = ctx.longDescription || resolvedPlace.longDescription || resolvedPlace.description || "";

    const base = `You are currently at ${name}. Terrain substrate features ${surface}. Atmospheric resonance is ${atmosphere}.`;
    return longDesc ? `${base} ${longDesc}` : base;
  },

  /**
   * Compiles course path progression announcement.
   */
  compilePosition: (formattedDistance: string, activeName: string, segmentDirection: string): string => {
    return `You are at ${formattedDistance} of ${activeName} via a course path, facing ${segmentDirection.toLowerCase()}.`;
  }
};

export {
  ZenStoneGardenNarration,
  BotanicalMazeNarration,
  ButterflySanctuaryNarration,
  OrchidGlasshouseNarration,
  EdibleBerryGardenNarration,
  TheGrandOrchardNarration,
  CherryOrchardNarration,
  AlmondGroveNarration,
  AppleGroveNarration,
  OliveGroveNarration,
  WalnutGroveNarration,
  ChickenFarmNarration,
  GoatFarmNarration,
  SheepFarmNarration,
  DuckFarmNarration,
  GooseFarmNarration,
  CattleFarmNarration,
  HorseFarmNarration
};

export default GardenArenaNarration;
