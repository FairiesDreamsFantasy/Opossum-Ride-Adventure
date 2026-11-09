/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { CAMRYN_OPOSSUM_UNITS } from "./Units";
import { description, parts } from "./Description";
import { CAMRYN_OPOSSUM_DIMENSIONS } from "./Description/Dimensions";
import { CAMRYN_OPOSSUM_GENERAL } from "./General";
import { playCamrynOpossumChatter } from "./Sounds/Elegant_Chatter";

export const CamrynOpossum = {
  id: OpossumId.CAMRYN_OPOSSUM,
  name: "Camryn Opossum",
  color: "Light Green",
  width: CAMRYN_OPOSSUM_DIMENSIONS.width,
  length: CAMRYN_OPOSSUM_DIMENSIONS.length,
  headWidth: CAMRYN_OPOSSUM_DIMENSIONS.headWidth,
  headHeight: CAMRYN_OPOSSUM_DIMENSIONS.headHeight,
  shoulderHeight: CAMRYN_OPOSSUM_DIMENSIONS.shoulderHeight,
  noseColor: "Pink",
  eyeColor: "Blue",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female" as const,
  headOrientation: "perched on top of her neck",
  description: description,
  playChatter: playCamrynOpossumChatter,
  Units: CAMRYN_OPOSSUM_UNITS,
  General: CAMRYN_OPOSSUM_GENERAL,
  Parts: parts
};

export { CAMRYN_OPOSSUM_UNITS, playCamrynOpossumChatter };
export default CamrynOpossum;
