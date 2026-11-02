/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TianaQinRegistryGeneral } from "./General";
import { TianaQinRegistryDescription } from "./Description";
import { TianaQinRegistryDimensions } from "./Description/Dimensions";

export const TianaQinRegistry = {
  id: "tiana_qin",
  name: "Tiana",
  lastName: "Qin",
  General: TianaQinRegistryGeneral,
  Description: TianaQinRegistryDescription,
  Dimensions: TianaQinRegistryDimensions
};

export default TianaQinRegistry;
