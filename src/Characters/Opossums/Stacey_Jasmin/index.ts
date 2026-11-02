/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { STACEY_JASMIN_UNITS } from "./Units";
import { description, parts } from "./Description";
import { STACEY_JASMIN_DIMENSIONS } from "./Description/Dimensions";
import { STACEY_JASMIN_GENERAL } from "./General";
import { playStaceyJasminChatter } from "./Sounds/Elegant_Chatter";

export const StaceyJasminOpossum = {
  id: OpossumId.STACEY_JASMIN,
  name: "Stacey Jasmin",
  color: "Purple base with yellow saddle beagle pattern",
  width: STACEY_JASMIN_DIMENSIONS.width,
  length: STACEY_JASMIN_DIMENSIONS.length,
  headWidth: STACEY_JASMIN_DIMENSIONS.headWidth,
  headHeight: STACEY_JASMIN_DIMENSIONS.headHeight,
  shoulderHeight: STACEY_JASMIN_DIMENSIONS.shoulderHeight,
  noseColor: "Dark-Pink",
  eyeColor: "Indigo",
  tailColor: "Dark-Pink",
  innerEarColor: "Dark-Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playStaceyJasminChatter,
  Units: STACEY_JASMIN_UNITS,
  General: STACEY_JASMIN_GENERAL,
  Parts: parts
};

export { STACEY_JASMIN_UNITS, playStaceyJasminChatter };
export default StaceyJasminOpossum;
