/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JamieJasmineRegistryGeneral } from "./General";
import { JamieJasmineRegistryDescription } from "./Description";
import { JamieJasmineRegistryDimensions } from "./Description/Dimensions";
import { JAMIE_JASMINE_UNITS } from "../../../../../../Characters/Opossums/Jamie_Jasmine/Units";

export const JamieJasmineRegistry = {
  id: "jamie_jasmine",
  name: "Jamie",
  lastName: "Jasmine",
  General: JamieJasmineRegistryGeneral,
  Description: JamieJasmineRegistryDescription,
  Dimensions: JamieJasmineRegistryDimensions,
  Units: JAMIE_JASMINE_UNITS
};

export default JamieJasmineRegistry;
