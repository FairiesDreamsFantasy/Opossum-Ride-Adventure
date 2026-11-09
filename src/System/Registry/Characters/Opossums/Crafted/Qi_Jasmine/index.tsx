/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QiJasmineRegistryGeneral } from "./General";
import { QiJasmineRegistryDescription } from "./Description";
import { QiJasmineRegistryDimensions } from "./Description/Dimensions";
import { QI_JASMINE_UNITS } from "../../../../../../Characters/Opossums/Qi_Jasmine/Units";

export const QiJasmineRegistry = {
  id: "qi_jasmine",
  name: "Qi",
  lastName: "Jasmine",
  General: QiJasmineRegistryGeneral,
  Description: QiJasmineRegistryDescription,
  Dimensions: QiJasmineRegistryDimensions,
  Units: QI_JASMINE_UNITS
};

export default QiJasmineRegistry;
