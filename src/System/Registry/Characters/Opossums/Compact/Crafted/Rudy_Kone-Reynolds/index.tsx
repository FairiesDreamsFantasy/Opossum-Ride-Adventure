/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RudyKoneReynoldsRegistryGeneral } from "./General";
import { RudyKoneReynoldsRegistryDescription } from "./Description";
import { RudyKoneReynoldsRegistryDimensions } from "./Description/Dimensions";
import { RudyProfile } from "../../../../../../../Characters/Opossums/Rudy_Kone-Reynolds/profile";

export const RudyRegistryEntry = {
  ...RudyProfile,
  registryId: "Rudy_Kone-Reynolds_Compact_Crafted",
  lastUpdated: "2026-10-22"
};

export const RudyKoneReynoldsRegistry = {
  id: "rudy_kone_reynolds",
  name: "Rudy",
  lastName: "Kone-Reynolds",
  General: RudyKoneReynoldsRegistryGeneral,
  Description: RudyKoneReynoldsRegistryDescription,
  Dimensions: RudyKoneReynoldsRegistryDimensions
};

export default RudyKoneReynoldsRegistry;
