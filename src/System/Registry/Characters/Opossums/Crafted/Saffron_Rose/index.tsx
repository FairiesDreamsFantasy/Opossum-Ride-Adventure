/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SaffronRoseRegistryGeneral } from "./General";
import { SaffronRoseRegistryDescription } from "./Description";
import { SaffronRoseRegistryDimensions } from "./Description/Dimensions";

export const SaffronRoseRegistry = {
  id: "saffron_rose",
  name: "Saffron",
  lastName: "Rose",
  General: SaffronRoseRegistryGeneral,
  Description: SaffronRoseRegistryDescription,
  Dimensions: SaffronRoseRegistryDimensions
};

export default SaffronRoseRegistry;
