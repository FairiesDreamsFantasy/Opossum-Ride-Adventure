/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KadyRoseRegistryGeneral } from "./General";
import { KadyRoseRegistryAnimations } from "./Animations";
import { KadyRoseRegistryDescription } from "./Description";
import { KadyRoseRegistryDimensions } from "./Description/Dimensions";
import { KadyRoseRegistrySounds } from "./Sounds";

export const KadyRoseRegistry = {
  id: "kady_rose",
  name: "Kady Rose",
  lastName: "Rose",
  General: KadyRoseRegistryGeneral,
  Animations: KadyRoseRegistryAnimations,
  Description: KadyRoseRegistryDescription,
  Dimensions: KadyRoseRegistryDimensions,
  Sounds: KadyRoseRegistrySounds
};

export default KadyRoseRegistry;
