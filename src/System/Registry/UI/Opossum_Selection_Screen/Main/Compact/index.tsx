/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CompactOpossumUISelectionRegistryGeneral } from "./General";
export * from "./General";

export const CompactOpossumUISelectionRegistry = {
  ...CompactOpossumUISelectionRegistryGeneral,
  timestamp: new Date().toISOString()
};
