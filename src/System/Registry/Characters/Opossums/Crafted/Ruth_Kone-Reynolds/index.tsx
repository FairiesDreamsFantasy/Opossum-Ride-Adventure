/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuthKoneReynoldsRegistryGeneral } from "./General";
import { RuthKoneReynoldsRegistryAnimations } from "./Animations";
import { RuthKoneReynoldsRegistryDescription } from "./Description";
import { RuthKoneReynoldsRegistryDimensions } from "./Description/Dimensions";
import { RuthKoneReynoldsRegistrySounds } from "./Sounds";

export const RuthKoneReynoldsRegistry = {
  id: "ruth_kone_reynolds",
  name: "Ruth Kone-Reynolds",
  lastName: "Kone-Reynolds",
  General: RuthKoneReynoldsRegistryGeneral,
  Animations: RuthKoneReynoldsRegistryAnimations,
  Description: RuthKoneReynoldsRegistryDescription,
  Dimensions: RuthKoneReynoldsRegistryDimensions,
  Sounds: RuthKoneReynoldsRegistrySounds
};

export default RuthKoneReynoldsRegistry;
