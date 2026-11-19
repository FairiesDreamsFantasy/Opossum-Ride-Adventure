/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WORLD2_COURTYARD_SPEC } from "../Courtyard";
import { WORLD2_NORTH_GARDEN_SPEC, NORTH_GARDEN_LARGE_FLOWERS } from "../North_Garden";
import { WORLD2_SOUTH_TEA_AREA_SPEC, SOUTH_TEA_TABLES } from "../South_Tea_Area";
import { WORLD2_TEMPLE_FOYER_SPEC, getTempleFoyerTileColor } from "../Temple_Foyer";

export type World2Level0ZoneId = "courtyard" | "north_garden" | "south_tea_area" | "temple_foyer";

export function resolveWorld2Level0Zone(x: number, y: number): World2Level0ZoneId {
  if (x > 4000) return "temple_foyer";
  if (y > 3000) return "north_garden";
  if (y < 0) return "south_tea_area";
  return "courtyard";
}

export function getWorld2Level0SurfaceSound(zone: World2Level0ZoneId): "stone" | "grass" | "tile" {
  if (zone === "north_garden") return "grass";
  if (zone === "south_tea_area" || zone === "temple_foyer") return "tile";
  return "stone";
}

export const WORLD2_LEVEL0_AREAS = {
  courtyard: WORLD2_COURTYARD_SPEC,
  northGarden: WORLD2_NORTH_GARDEN_SPEC,
  southTeaArea: WORLD2_SOUTH_TEA_AREA_SPEC,
  templeFoyer: WORLD2_TEMPLE_FOYER_SPEC,
  flowers: NORTH_GARDEN_LARGE_FLOWERS,
  teaTables: SOUTH_TEA_TABLES,
  getTempleFoyerTileColor
};

export const Level_0General = {
  id: 0,
  name: "Temple Courtyard & Entrance Foyer",
  world: 2,
  arena: "temple_courtyard",
  placeId: "temple_courtyard",
  isExploration: true,
  areas: WORLD2_LEVEL0_AREAS,
  resolveZone: resolveWorld2Level0Zone,
  getSurfaceSound: getWorld2Level0SurfaceSound
};

export default Level_0General;
