/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoxanneKoneReynoldsRegistryGeneral } from "./General";
import { RoxanneKoneReynoldsRegistryDescription } from "./Description";
import { RoxanneKoneReynoldsRegistryDimensions } from "./Description/Dimensions";

export const RoxanneKoneReynoldsRegistry = {
  id: "roxanne_kone_reynolds",
  name: "Roxanne",
  lastName: "Kone-Reynolds",
  General: RoxanneKoneReynoldsRegistryGeneral,
  Description: RoxanneKoneReynoldsRegistryDescription,
  Dimensions: RoxanneKoneReynoldsRegistryDimensions
};

export default RoxanneKoneReynoldsRegistry;
