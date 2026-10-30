/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DagmarKoneReynoldsRegistryGeneral } from "./General";
import { DagmarKoneReynoldsRegistryDescription } from "./Description";
import { DagmarKoneReynoldsRegistryDimensions } from "./Description/Dimensions";
import { DAGMAR_KONE_REYNOLDS_UNITS } from "../../../../../../Characters/Opossums/Dagmar_Kone-Reynolds/Units";

export const DagmarKoneReynoldsRegistry = {
  id: "dagmar_kone_reynolds",
  name: "Dagmar",
  lastName: "Kone-Reynolds",
  General: DagmarKoneReynoldsRegistryGeneral,
  Description: DagmarKoneReynoldsRegistryDescription,
  Dimensions: DagmarKoneReynoldsRegistryDimensions,
  Units: DAGMAR_KONE_REYNOLDS_UNITS
};

export default DagmarKoneReynoldsRegistry;

