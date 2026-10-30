/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuthKoneReynoldsRegistryGeneral } from "./General";
import { RuthKoneReynoldsRegistryAnimations } from "./Animations";
import { RuthKoneReynoldsRegistryDescription } from "./Description";
import { RuthKoneReynoldsRegistryDimensions } from "./Description/Dimensions";
import { RuthKoneReynoldsRegistrySounds } from "./Sounds";
import { RUTH_KONE_REYNOLDS_UNITS } from "../../../../../../Characters/Opossums/Ruth_Kone-Reynolds/Units";

export const RuthKoneReynoldsRegistry = {
  id: "ruth_kone_reynolds",
  name: "Ruth Kone-Reynolds",
  lastName: "Kone-Reynolds",
  General: RuthKoneReynoldsRegistryGeneral,
  Animations: RuthKoneReynoldsRegistryAnimations,
  Description: RuthKoneReynoldsRegistryDescription,
  Dimensions: RuthKoneReynoldsRegistryDimensions,
  Sounds: RuthKoneReynoldsRegistrySounds,
  Units: RUTH_KONE_REYNOLDS_UNITS
};

export default RuthKoneReynoldsRegistry;

