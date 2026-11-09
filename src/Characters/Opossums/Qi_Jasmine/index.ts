/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { QI_JASMINE_UNITS } from "./Units";
import { description, parts } from "./Description";
import { QI_JASMINE_DIMENSIONS } from "./Description/Dimensions";
import { QI_JASMINE_GENERAL } from "./General";
import { playQiJasminChatter } from "./Sounds/Elegant_Chatter";

export const QiJasmineOpossum = {
  id: OpossumId.QI_JASMINE,
  name: "Qi Jasmine",
  color: "Blue base with green circles",
  width: QI_JASMINE_DIMENSIONS.width,
  length: QI_JASMINE_DIMENSIONS.length,
  headWidth: QI_JASMINE_DIMENSIONS.headWidth,
  headHeight: QI_JASMINE_DIMENSIONS.headHeight,
  shoulderHeight: QI_JASMINE_DIMENSIONS.shoulderHeight,
  noseColor: "Pink",
  eyeColor: "Light-Blue",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playQiJasminChatter,
  Units: QI_JASMINE_UNITS,
  General: QI_JASMINE_GENERAL,
  Parts: parts
};

export { QI_JASMINE_UNITS, playQiJasminChatter };
export default QiJasmineOpossum;
