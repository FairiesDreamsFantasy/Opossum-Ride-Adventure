/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JalissaChinRegistryGeneral } from "./General";
import { JalissaChinRegistryDescription } from "./Description";
import { JalissaChinRegistryDimensions } from "./Description/Dimensions";

export const JalissaChinRegistry = {
  id: "jalissa_chin",
  name: "Jalissa",
  lastName: "Chin",
  General: JalissaChinRegistryGeneral,
  Description: JalissaChinRegistryDescription,
  Dimensions: JalissaChinRegistryDimensions
};

export default JalissaChinRegistry;
