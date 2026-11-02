/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseMovementsRegistry } from "./Movements";
import { MooseAccessoriesRegistry } from "./Accessories";

export * from "./Movements";
export * from "./Accessories";

export const MooseTemplatesRegistry = {
  movements: MooseMovementsRegistry,
  accessories: MooseAccessoriesRegistry
};
