/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SaffordChinOpossum } from "../../../../../../../Characters/Opossums/Safford_Chin";
import { SaffordChinRegistryGeneral } from "./General";
import { SAFFORD_CHIN_REGISTRY_DESCRIPTION } from "./Description";

export * from "./General";
export * from "./Description";

export const SaffordChinCompactCraftedEntry = {
  general: SaffordChinRegistryGeneral,
  description: SAFFORD_CHIN_REGISTRY_DESCRIPTION,
  character: SaffordChinOpossum
};

export default SaffordChinCompactCraftedEntry;
