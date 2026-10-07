/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JahmellaRoseRegistryGeneral } from "./General";
import { JahmellaRoseRegistryDescription } from "./Description";
import { JahmellaRoseRegistryDimensions } from "./Description/Dimensions";

export const JahmellaRoseRegistry = {
  id: "jahmella_rose",
  name: "Jahmella",
  lastName: "Rose",
  General: JahmellaRoseRegistryGeneral,
  Description: JahmellaRoseRegistryDescription,
  Dimensions: JahmellaRoseRegistryDimensions
};

export default JahmellaRoseRegistry;
