/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CallieRoseRegistryGeneral } from "./General";
import { CallieRoseRegistryDescription } from "./Description";
import { CallieRoseRegistryDimensions } from "./Description/Dimensions";
import { CALLIE_ROSE_UNITS } from "../../../../../../Characters/Opossums/Callie_Rose/Units";

export const CallieRoseRegistry = {
  id: "callie_rose",
  name: "Callie",
  lastName: "Rose",
  General: CallieRoseRegistryGeneral,
  Description: CallieRoseRegistryDescription,
  Dimensions: CallieRoseRegistryDimensions,
  Units: CALLIE_ROSE_UNITS
};

export default CallieRoseRegistry;
