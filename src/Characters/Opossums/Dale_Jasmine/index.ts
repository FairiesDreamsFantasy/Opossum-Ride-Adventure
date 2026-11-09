/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { DALE_JASMINE_UNITS } from "./Units";
import { description, parts } from "./Description";
import { DALE_JASMINE_DIMENSIONS } from "./Description/Dimensions";
import { DALE_JASMINE_GENERAL } from "./General";
import { playDaleJasminChatter } from "./Sounds/Elegant_Chatter";

export const DaleJasmineOpossum = {
  id: OpossumId.DALE_JASMINE,
  name: "Dale Jasmine",
  color: "Lavender with green rose pattern",
  width: DALE_JASMINE_DIMENSIONS.width,
  length: DALE_JASMINE_DIMENSIONS.length,
  headWidth: DALE_JASMINE_DIMENSIONS.headWidth,
  headHeight: DALE_JASMINE_DIMENSIONS.headHeight,
  shoulderHeight: DALE_JASMINE_DIMENSIONS.shoulderHeight,
  noseColor: "Pink",
  eyeColor: "Light-Green",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playDaleJasminChatter,
  Units: DALE_JASMINE_UNITS,
  General: DALE_JASMINE_GENERAL,
  Parts: parts
};

export { DALE_JASMINE_UNITS, playDaleJasminChatter };
export default DaleJasmineOpossum;
