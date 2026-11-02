/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JaredAndrewsRegistryGeneral } from "./General";
export * from "./General";

export const JaredAndrewsRegistry = {
  id: "jared_andrews",
  name: "Jared Andrews",
  troop: "Andrews",
  category: "Monkeys",
  general: JaredAndrewsRegistryGeneral,
  timestamp: new Date().toISOString()
};
