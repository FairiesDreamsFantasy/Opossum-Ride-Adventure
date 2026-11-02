/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DaisyRoseRegistryGeneral } from "./General";
import { DaisyRoseRegistryDescription } from "./Description";
import { DaisyRoseRegistryDimensions } from "./Description/Dimensions";
import { DAISY_ROSE_UNITS } from "../../../../../../Characters/Opossums/Daisy_Rose/Units";

export const DaisyRoseRegistry = {
  id: "daisy_rose",
  name: "Daisy",
  lastName: "Rose",
  General: DaisyRoseRegistryGeneral,
  Description: DaisyRoseRegistryDescription,
  Dimensions: DaisyRoseRegistryDimensions,
  Units: DAISY_ROSE_UNITS
};

export default DaisyRoseRegistry;
