/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../types";
import { description, parts } from "./Description";
import { ARNOLD_ROSE_DIMENSIONS } from "./Description/Dimensions";
import { ARNOLD_ROSE_GENERAL } from "./General";
import { playArnoldRoseBark } from "./Sounds";

export const ArnoldRoseOpossum = {
  id: OpossumId.ARNOLD_ROSE,
  name: "Arnold Rose",
  color: "Matte White base with dark-brown ovals",
  width: ARNOLD_ROSE_DIMENSIONS.width,
  length: ARNOLD_ROSE_DIMENSIONS.length,
  headWidth: ARNOLD_ROSE_DIMENSIONS.headWidth,
  headHeight: ARNOLD_ROSE_DIMENSIONS.headHeight,
  shoulderHeight: ARNOLD_ROSE_DIMENSIONS.shoulderHeight,
  noseColor: "Brown",
  eyeColor: "Light-Brown",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Male" as const,
  headOrientation: "perched forward",
  description: description,
  playChatter: playArnoldRoseBark,
  General: ARNOLD_ROSE_GENERAL,
  Parts: parts
};

export { playArnoldRoseBark };
export default ArnoldRoseOpossum;
