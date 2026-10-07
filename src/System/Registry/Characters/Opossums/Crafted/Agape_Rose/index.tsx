/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AgapeRoseRegistryGeneral } from "./General";
import { AgapeRoseRegistryDescription } from "./Description";
import { AgapeRoseRegistryDimensions } from "./Description/Dimensions";

export const AgapeRoseRegistry = {
  id: "agape_rose",
  name: "Agape",
  lastName: "Rose",
  General: AgapeRoseRegistryGeneral,
  Description: AgapeRoseRegistryDescription,
  Dimensions: AgapeRoseRegistryDimensions
};

export default AgapeRoseRegistry;
