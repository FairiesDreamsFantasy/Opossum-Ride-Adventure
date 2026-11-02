/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JahmellaRoseRegistryGeneral } from "./General";
import { JahmellaRoseRegistryDescription } from "./Description";
import { JahmellaRoseRegistryDimensions } from "./Description/Dimensions";
import { JAHMELLA_ROSE_UNITS } from "../../../../../../Characters/Opossums/Jahmella_Rose/Units";

export const JahmellaRoseRegistry = {
  id: "jahmella_rose",
  name: "Jahmella",
  lastName: "Rose",
  General: JahmellaRoseRegistryGeneral,
  Description: JahmellaRoseRegistryDescription,
  Dimensions: JahmellaRoseRegistryDimensions,
  Units: JAHMELLA_ROSE_UNITS
};

export default JahmellaRoseRegistry;

