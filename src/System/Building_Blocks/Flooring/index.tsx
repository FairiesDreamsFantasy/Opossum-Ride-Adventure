/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FlooringGeneral } from "./General";
import { CarpetFlooring } from "./Carpet";
import { HardwoodFlooring } from "./Hardwood";
import { RugFlooring } from "./Rug";
import { TileFlooring } from "./Tile";

export const FlooringSystem = {
  id: "flooring_system",
  General: FlooringGeneral,
  Carpet: CarpetFlooring,
  Hardwood: HardwoodFlooring,
  Rug: RugFlooring,
  Tile: TileFlooring
};
