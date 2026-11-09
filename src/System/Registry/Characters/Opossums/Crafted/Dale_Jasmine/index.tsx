/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DaleJasmineRegistryGeneral } from "./General";
import { DaleJasmineRegistryDescription } from "./Description";
import { DaleJasmineRegistryDimensions } from "./Description/Dimensions";
import { DALE_JASMINE_UNITS } from "../../../../../../Characters/Opossums/Dale_Jasmine/Units";

export const DaleJasmineRegistry = {
  id: "dale_jasmine",
  name: "Dale",
  lastName: "Jasmine",
  General: DaleJasmineRegistryGeneral,
  Description: DaleJasmineRegistryDescription,
  Dimensions: DaleJasmineRegistryDimensions,
  Units: DALE_JASMINE_UNITS
};

export default DaleJasmineRegistry;
