/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SandraOpossumRegistryGeneral } from "./General";
import { SandraOpossumRegistryAnimations } from "./Animations";
import { SandraOpossumRegistryDescription } from "./Description";
import { SandraOpossumRegistryDimensions } from "./Description/Dimensions";
import { SandraOpossumRegistrySounds } from "./Sounds";

export const SandraOpossumRegistry = {
  id: "sandra_opossum",
  name: "Sandra",
  lastName: "Opossum",
  General: SandraOpossumRegistryGeneral,
  Animations: SandraOpossumRegistryAnimations,
  Description: SandraOpossumRegistryDescription,
  Dimensions: SandraOpossumRegistryDimensions,
  Sounds: SandraOpossumRegistrySounds
};

export default SandraOpossumRegistry;
