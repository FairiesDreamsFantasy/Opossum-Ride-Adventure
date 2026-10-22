/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PaginationRegistryGeneral } from "./General";
export * from "./General";

export const PaginationRegistry = {
  ...PaginationRegistryGeneral,
  timestamp: new Date().toISOString()
};
