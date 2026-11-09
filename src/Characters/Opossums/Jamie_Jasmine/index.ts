/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { JAMIE_JASMINE_UNITS } from "./Units";
import { description, parts } from "./Description";
import { JAMIE_JASMINE_DIMENSIONS } from "./Description/Dimensions";
import { JAMIE_JASMINE_GENERAL } from "./General";
import { playJamieJasminChatter } from "./Sounds/Elegant_Chatter";

export const JamieJasmineOpossum = {
  id: OpossumId.JAMIE_JASMINE,
  name: "Jamie Jasmine",
  color: "Silver",
  width: JAMIE_JASMINE_DIMENSIONS.width,
  length: JAMIE_JASMINE_DIMENSIONS.length,
  headWidth: JAMIE_JASMINE_DIMENSIONS.headWidth,
  headHeight: JAMIE_JASMINE_DIMENSIONS.headHeight,
  shoulderHeight: JAMIE_JASMINE_DIMENSIONS.shoulderHeight,
  noseColor: "Red-Orange",
  eyeColor: "Indigo",
  tailColor: "Red-Orange",
  innerEarColor: "Red-Orange",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playJamieJasminChatter,
  Units: JAMIE_JASMINE_UNITS,
  General: JAMIE_JASMINE_GENERAL,
  Parts: parts
};

export { JAMIE_JASMINE_UNITS, playJamieJasminChatter };
export default JamieJasmineOpossum;
