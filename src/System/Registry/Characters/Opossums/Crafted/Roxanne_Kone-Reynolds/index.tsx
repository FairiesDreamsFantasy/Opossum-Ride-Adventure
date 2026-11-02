/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoxanneKoneReynoldsRegistryGeneral } from "./General";
import { RoxanneKoneReynoldsRegistryDescription } from "./Description";
import { RoxanneKoneReynoldsRegistryDimensions } from "./Description/Dimensions";
import { ROXANNE_KONE_REYNOLDS_UNITS } from "../../../../../../Characters/Opossums/Roxanne_Kone-Reynolds/Units";

export const RoxanneKoneReynoldsRegistry = {
  id: "roxanne_kone_reynolds",
  name: "Roxanne",
  lastName: "Kone-Reynolds",
  General: RoxanneKoneReynoldsRegistryGeneral,
  Description: RoxanneKoneReynoldsRegistryDescription,
  Dimensions: RoxanneKoneReynoldsRegistryDimensions,
  Units: ROXANNE_KONE_REYNOLDS_UNITS
};

export default RoxanneKoneReynoldsRegistry;

