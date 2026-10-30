/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumAIRegistryGeneral } from "./General";
export * from "./General";

export const CompactOpossumAIRegistry = {
  ...CompactOpossumAIRegistryGeneral,
  timestamp: new Date().toISOString()
};
