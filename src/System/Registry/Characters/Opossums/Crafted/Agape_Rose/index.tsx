/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgapeRoseRegistryGeneral } from "./General";
import { AgapeRoseRegistryDescription } from "./Description";
import { AgapeRoseRegistryDimensions } from "./Description/Dimensions";
import { AGAPE_ROSE_UNITS } from "../../../../../../Characters/Opossums/Agape_Rose/Units";

export const AgapeRoseRegistry = {
  id: "agape_rose",
  name: "Agape",
  lastName: "Rose",
  General: AgapeRoseRegistryGeneral,
  Description: AgapeRoseRegistryDescription,
  Dimensions: AgapeRoseRegistryDimensions,
  Units: AGAPE_ROSE_UNITS
};

export default AgapeRoseRegistry;

