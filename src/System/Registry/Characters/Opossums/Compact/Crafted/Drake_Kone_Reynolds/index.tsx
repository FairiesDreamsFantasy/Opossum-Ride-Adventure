/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DrakeKoneReynoldsRegistryGeneral } from "./General";
import { DrakeKoneReynoldsRegistryDescription } from "./Description";
import { DrakeKoneReynoldsRegistryDimensions } from "./Description/Dimensions";

export const DrakeKoneReynoldsRegistry = {
  id: "drake_kone_reynolds",
  name: "Drake",
  lastName: "Kone-Reynolds",
  General: DrakeKoneReynoldsRegistryGeneral,
  Description: DrakeKoneReynoldsRegistryDescription,
  Dimensions: DrakeKoneReynoldsRegistryDimensions
};

export default DrakeKoneReynoldsRegistry;
