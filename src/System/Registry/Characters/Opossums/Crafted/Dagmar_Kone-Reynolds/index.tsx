/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DagmarKoneReynoldsRegistryGeneral } from "./General";
import { DagmarKoneReynoldsRegistryDescription } from "./Description";
import { DagmarKoneReynoldsRegistryDimensions } from "./Description/Dimensions";

export const DagmarKoneReynoldsRegistry = {
  id: "dagmar_kone_reynolds",
  name: "Dagmar",
  lastName: "Kone-Reynolds",
  General: DagmarKoneReynoldsRegistryGeneral,
  Description: DagmarKoneReynoldsRegistryDescription,
  Dimensions: DagmarKoneReynoldsRegistryDimensions
};

export default DagmarKoneReynoldsRegistry;
