/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StaceyJasminRegistryGeneral } from "./General";
import { StaceyJasminRegistryDescription } from "./Description";
import { StaceyJasminRegistryDimensions } from "./Description/Dimensions";
import { STACEY_JASMIN_UNITS } from "../../../../../../Characters/Opossums/Stacey_Jasmin/Units";

export const StaceyJasminRegistry = {
  id: "stacey_jasmin",
  name: "Stacey",
  lastName: "Jasmin",
  General: StaceyJasminRegistryGeneral,
  Description: StaceyJasminRegistryDescription,
  Dimensions: StaceyJasminRegistryDimensions,
  Units: STACEY_JASMIN_UNITS
};

export default StaceyJasminRegistry;
