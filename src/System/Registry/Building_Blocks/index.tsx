/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BuildingBlocksRegistryGeneral } from "./General";
import { AnimationsRegistry } from "./Animations";
import { BridgesRegistry } from "./Bridges";
import { BuildingsRegistry } from "./Buildings";
import { CeilingRegistry } from "./Ceiling";
import { DoorsRegistry } from "./Doors";
import { FlooringRegistry } from "./Flooring";
import { FlyoverRegistry } from "./Flyover";
import { GardenRegistry } from "./Garden";
import { HousesRegistry } from "./Houses";
import { NatureRegistry } from "./Nature";
import { ObstaclesBlockRegistry } from "./Obstacles";
import { ParksRegistry } from "./Parks";
import { PathsRegistry } from "./Paths";
import { RailwayRegistry } from "./Railway";
import { RandomMaterialsRegistry } from "./Random_Materials";
import { RoadRegistry } from "./Road";
import { SkylightsRegistry } from "./Skylights";
import { TunnelsRegistry } from "./Tunnels";
import { WallsAndBarriersRegistry } from "./Walls_and_Barriers";
import { WindowsRegistry } from "./Windows";
import { WorldBuildingBlockRegistry } from "./World";

/**
 * Registry Component for Building Blocks
 * Houses Flooring, World, Obstacles, Doors, Ceiling, Walls & Barriers, Windows, and Skylights building blocks data.
 */
export const BuildingBlocksRegistry = {
  id: "building_blocks",
  path: "src/System/Registry/Building_Blocks/index.tsx",
  category: "System Registry",
  General: BuildingBlocksRegistryGeneral,
  Animations: AnimationsRegistry,
  Bridges: BridgesRegistry,
  Buildings: BuildingsRegistry,
  Ceiling: CeilingRegistry,
  Doors: DoorsRegistry,
  Flooring: FlooringRegistry,
  Flyover: FlyoverRegistry,
  Garden: GardenRegistry,
  Houses: HousesRegistry,
  Nature: NatureRegistry,
  Obstacles: ObstaclesBlockRegistry,
  Parks: ParksRegistry,
  Paths: PathsRegistry,
  Railway: RailwayRegistry,
  RandomMaterials: RandomMaterialsRegistry,
  Road: RoadRegistry,
  Skylights: SkylightsRegistry,
  Tunnels: TunnelsRegistry,
  WallsAndBarriers: WallsAndBarriersRegistry,
  Windows: WindowsRegistry,
  World: WorldBuildingBlockRegistry,
  timestamp: new Date().toISOString()
};
