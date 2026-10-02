/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WandaOpossumRegistryGeneral } from "./General";
import { WandaOpossumRegistryAnimations } from "./Animations";
import { WandaOpossumRegistryDescription } from "./Description";
import { WandaOpossumRegistryDimensions } from "./Description/Dimensions";
import { WandaOpossumRegistrySounds } from "./Sounds";

export const WandaOpossumRegistry = {
  General: WandaOpossumRegistryGeneral,
  Animations: WandaOpossumRegistryAnimations,
  Description: WandaOpossumRegistryDescription,
  Dimensions: WandaOpossumRegistryDimensions,
  Sounds: WandaOpossumRegistrySounds
};

export default WandaOpossumRegistry;
