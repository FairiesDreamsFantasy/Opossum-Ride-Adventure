/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { JACINTA_OPOSSUM_UNITS } from "./Units";
import { description, parts } from "./Description";
import { JACINTA_OPOSSUM_DIMENSIONS } from "./Description/Dimensions";
import { JACINTA_OPOSSUM_GENERAL } from "./General";
import { playJacintaOpossumChatter } from "./Sounds/Elegant_Chatter";

export const JacintaOpossum = {
  id: OpossumId.JACINTA_OPOSSUM,
  name: "Jacinta Opossum",
  color: "Red",
  width: JACINTA_OPOSSUM_DIMENSIONS.width,
  length: JACINTA_OPOSSUM_DIMENSIONS.length,
  headWidth: JACINTA_OPOSSUM_DIMENSIONS.headWidth,
  headHeight: JACINTA_OPOSSUM_DIMENSIONS.headHeight,
  shoulderHeight: JACINTA_OPOSSUM_DIMENSIONS.shoulderHeight,
  noseColor: "Red-Orange",
  eyeColor: "Dark-Green",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playJacintaOpossumChatter,
  Units: JACINTA_OPOSSUM_UNITS,
  General: JACINTA_OPOSSUM_GENERAL,
  Parts: parts
};

export { JACINTA_OPOSSUM_UNITS, playJacintaOpossumChatter };
export default JacintaOpossum;
