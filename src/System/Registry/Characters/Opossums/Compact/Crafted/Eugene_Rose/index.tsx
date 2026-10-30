/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EugeneRoseOpossum } from "../../../../../../../Characters/Opossums/Eugene_Rose";
import { EugeneRoseRegistryGeneral } from "./General";
import { EUGENE_ROSE_REGISTRY_DESCRIPTION } from "./Description";

export * from "./General";
export * from "./Description";

export const EugeneRoseCompactCraftedEntry = {
  general: EugeneRoseRegistryGeneral,
  description: EUGENE_ROSE_REGISTRY_DESCRIPTION,
  character: EugeneRoseOpossum
};

export default EugeneRoseCompactCraftedEntry;
