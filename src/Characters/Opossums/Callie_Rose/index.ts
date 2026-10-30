/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { CALLIE_ROSE_UNITS } from "./Units";
import { description, parts } from "./Description";
import { CALLIE_ROSE_DIMENSIONS } from "./Description/Dimensions";
import { CALLIE_ROSE_GENERAL } from "./General";
import { playCallieRoseChatter } from "./Sounds/Elegant_Chatter";

export const CallieRoseOpossum = {
  id: OpossumId.CALLIE_ROSE,
  name: "Callie Rose",
  color: "Yellowish-gold base with 4.5-inch blue circles surrounded by indigo borders",
  width: CALLIE_ROSE_DIMENSIONS.width,
  length: CALLIE_ROSE_DIMENSIONS.length,
  headWidth: CALLIE_ROSE_DIMENSIONS.headWidth,
  headHeight: CALLIE_ROSE_DIMENSIONS.headHeight,
  shoulderHeight: CALLIE_ROSE_DIMENSIONS.shoulderHeight,
  noseColor: "Red Gold",
  eyeColor: "Green",
  tailColor: "Red Gold",
  innerEarColor: "Red-Gold",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playCallieRoseChatter,
  Units: CALLIE_ROSE_UNITS,
  General: CALLIE_ROSE_GENERAL,
  Parts: parts
};

export { CALLIE_ROSE_UNITS, playCallieRoseChatter };
export default CallieRoseOpossum;
