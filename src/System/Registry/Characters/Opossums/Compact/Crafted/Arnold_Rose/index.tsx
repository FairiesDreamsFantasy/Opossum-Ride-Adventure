/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArnoldRoseRegistryGeneral } from "./General";
import { ArnoldRoseRegistryDescription } from "./Description";
import { ArnoldRoseRegistryDimensions } from "./Description/Dimensions";

export const ArnoldRoseRegistry = {
  id: "arnold_rose",
  name: "Arnold",
  lastName: "Rose",
  General: ArnoldRoseRegistryGeneral,
  Description: ArnoldRoseRegistryDescription,
  Dimensions: ArnoldRoseRegistryDimensions
};

export default ArnoldRoseRegistry;
