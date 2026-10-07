/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ColtGrayRegistryGeneral } from "./General";
export * from "./General";

export const ColtGrayRegistry = {
  id: "colt_gray",
  name: "Colt Gray",
  troop: "Gray",
  category: "Monkeys",
  general: ColtGrayRegistryGeneral,
  timestamp: new Date().toISOString()
};
