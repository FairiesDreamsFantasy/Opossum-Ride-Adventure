/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShannonWhiteRegistryGeneral } from "./General";
export * from "./General";

export const ShannonWhiteRiderRegistry = {
  ...ShannonWhiteRegistryGeneral,
  timestamp: new Date().toISOString()
};

export const ShannonRiderRegistry = ShannonWhiteRiderRegistry;
