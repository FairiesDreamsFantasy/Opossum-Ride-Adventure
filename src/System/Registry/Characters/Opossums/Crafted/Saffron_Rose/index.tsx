/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SaffronRoseRegistryGeneral } from "./General";
import { SaffronRoseRegistryDescription } from "./Description";
import { SaffronRoseRegistryDimensions } from "./Description/Dimensions";
import { SAFFRON_ROSE_UNITS } from "../../../../../../Characters/Opossums/Saffron_Rose/Units";

export const SaffronRoseRegistry = {
  id: "saffron_rose",
  name: "Saffron",
  lastName: "Rose",
  General: SaffronRoseRegistryGeneral,
  Description: SaffronRoseRegistryDescription,
  Dimensions: SaffronRoseRegistryDimensions,
  Units: SAFFRON_ROSE_UNITS
};

export default SaffronRoseRegistry;

