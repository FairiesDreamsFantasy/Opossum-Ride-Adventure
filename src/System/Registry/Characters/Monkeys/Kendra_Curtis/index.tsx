/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KendraCurtisRegistryGeneral } from "./General";
export * from "./General";

export const KendraCurtisRegistry = {
  id: "kendra_curtis",
  name: "Kendra Curtis",
  troop: "Curtis",
  category: "Monkeys",
  general: KendraCurtisRegistryGeneral,
  timestamp: new Date().toISOString()
};
