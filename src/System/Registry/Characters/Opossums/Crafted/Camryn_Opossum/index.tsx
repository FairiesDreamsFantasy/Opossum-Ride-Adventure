/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CamrynOpossumRegistryGeneral } from "./General";
import { CamrynOpossumRegistryDescription } from "./Description";
import { CamrynOpossumRegistryDimensions } from "./Description/Dimensions";
import { CAMRYN_OPOSSUM_UNITS } from "../../../../../../Characters/Opossums/Camryn_Opossum/Units";

export const CamrynOpossumRegistry = {
  id: "camryn_opossum",
  name: "Camryn",
  lastName: "Opossum",
  General: CamrynOpossumRegistryGeneral,
  Description: CamrynOpossumRegistryDescription,
  Dimensions: CamrynOpossumRegistryDimensions,
  Units: CAMRYN_OPOSSUM_UNITS
};

export default CamrynOpossumRegistry;
