/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MelissaOpossumRegistryGeneral } from "./General";
import { MelissaOpossumRegistryDescription } from "./Description";
import { MelissaOpossumRegistryDimensions } from "./Description/Dimensions";

export const MelissaOpossumRegistry = {
  id: "melissa",
  name: "Melissa",
  lastName: "Opossum",
  width: 36,
  length: 86,
  headWidth: 36,
  headHeight: 35,
  shoulderHeight: "5 feet and 3 inches",
  color: "Light Gray",
  eyeColor: "Blue",
  noseColor: "Pink",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female",
  headOrientation: "perched on top of her neck",
  General: MelissaOpossumRegistryGeneral,
  Description: MelissaOpossumRegistryDescription,
  Dimensions: MelissaOpossumRegistryDimensions
};

export default MelissaOpossumRegistry;
