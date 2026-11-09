/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JacintaOpossumRegistryGeneral } from "./General";
import { JacintaOpossumRegistryDescription } from "./Description";
import { JacintaOpossumRegistryDimensions } from "./Description/Dimensions";
import { JACINTA_OPOSSUM_UNITS } from "../../../../../../Characters/Opossums/Jacinta_Opossum/Units";

export const JacintaOpossumRegistry = {
  id: "jacinta_opossum",
  name: "Jacinta",
  lastName: "Opossum",
  General: JacintaOpossumRegistryGeneral,
  Description: JacintaOpossumRegistryDescription,
  Dimensions: JacintaOpossumRegistryDimensions,
  Units: JACINTA_OPOSSUM_UNITS
};

export default JacintaOpossumRegistry;
