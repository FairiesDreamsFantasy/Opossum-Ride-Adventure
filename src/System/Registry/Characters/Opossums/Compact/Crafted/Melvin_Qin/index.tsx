/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MelvinQinOpossum } from "../../../../../../../Characters/Opossums/Melvin_Qin";
import { MelvinQinRegistryGeneral } from "./General";
import { MELVIN_QIN_REGISTRY_DESCRIPTION } from "./Description";

export * from "./General";
export * from "./Description";

export const MelvinQinCompactCraftedEntry = {
  general: MelvinQinRegistryGeneral,
  description: MELVIN_QIN_REGISTRY_DESCRIPTION,
  character: MelvinQinOpossum
};

export default MelvinQinCompactCraftedEntry;
