/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AshleyOpossumRegistryGeneral } from "./General";
import { AshleyOpossumRegistryDescription } from "./Description";
import { AshleyOpossumRegistryDimensions } from "./Description/Dimensions";

export const AshleyOpossumRegistry = {
  id: "ashley",
  name: "Ashley",
  lastName: "Opossum",
  width: 36,
  length: 86,
  headWidth: 36,
  headHeight: 35,
  shoulderHeight: "5 feet and 3 inches",
  color: "Tan",
  eyeColor: "Blue",
  noseColor: "Pink",
  tailColor: "Pink",
  innerEarColor: "Pink",
  gender: "Female",
  headOrientation: "perched on top of her neck",
  General: AshleyOpossumRegistryGeneral,
  Description: AshleyOpossumRegistryDescription,
  Dimensions: AshleyOpossumRegistryDimensions
};

export default AshleyOpossumRegistry;
