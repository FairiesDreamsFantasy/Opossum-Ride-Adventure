/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChickenFarmSubArena } from "./Chicken_Farm";
import { GoatFarmSubArena } from "./Goat_Farm";
import { SheepFarmSubArena } from "./Sheep_Farm";
import { DuckFarmSubArena } from "./Duck_Farm";
import { GooseFarmSubArena } from "./Goose_Farm";
import { CattleFarmSubArena } from "./Cattle_Farm";
import { HorseFarmSubArena } from "./Horse_Farm";

export const FarmArena = {
  id: "farm",
  name: "The Grand Valley Farm",
  description: "A sprawling agricultural haven comprising dedicated pastures and yards for chickens, goats, sheep, ducks, geese, cattle, and horses.",
  surfaceType: "loam and pasture grass",
  footstepSound: "soft pasture trot",
  colorBase: "#78350F", // Brown base
  ambientNoise: "pastoral animal chatter and breeze",
  lightingLevel: 1.0,
  skyColor: "#0284c7",
  horizonColor: "#bae6fd",
  frameColor: "#92400e",
  groundColor: "#451a03",
  fireflyColor: "#fef08a"
};

export {
  ChickenFarmSubArena,
  GoatFarmSubArena,
  SheepFarmSubArena,
  DuckFarmSubArena,
  GooseFarmSubArena,
  CattleFarmSubArena,
  HorseFarmSubArena
};
