/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { DAISY_ROSE_UNITS } from "./Units";
import { description, parts } from "./Description";
import { DAISY_ROSE_DIMENSIONS } from "./Description/Dimensions";
import { DAISY_ROSE_GENERAL } from "./General";
import { playDaisyRoseChatter } from "./Sounds/Elegant_Chatter";

export const DaisyRoseOpossum = {
  id: OpossumId.DAISY_ROSE,
  name: "Daisy Rose",
  color: "Pink with 4-inch yellow daisy flowers surrounded by blue borders",
  width: DAISY_ROSE_DIMENSIONS.width,
  length: DAISY_ROSE_DIMENSIONS.length,
  headWidth: DAISY_ROSE_DIMENSIONS.headWidth,
  headHeight: DAISY_ROSE_DIMENSIONS.headHeight,
  shoulderHeight: DAISY_ROSE_DIMENSIONS.shoulderHeight,
  noseColor: "Dark-Pink",
  eyeColor: "Blue",
  tailColor: "Pink with Light-Yellow 1.44cm spiral",
  innerEarColor: "Dark-Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playDaisyRoseChatter,
  Units: DAISY_ROSE_UNITS,
  General: DAISY_ROSE_GENERAL,
  Parts: parts
};

export { DAISY_ROSE_UNITS, playDaisyRoseChatter };
export default DaisyRoseOpossum;
