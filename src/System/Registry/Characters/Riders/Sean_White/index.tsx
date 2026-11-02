/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SeanWhiteRegistryGeneral } from "./General";
export * from "./General";

export const SeanWhiteRiderRegistry = {
  ...SeanWhiteRegistryGeneral,
  timestamp: new Date().toISOString()
};

export const SeanRiderRegistry = SeanWhiteRiderRegistry;
