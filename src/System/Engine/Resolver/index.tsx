/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PlaceResolver } from "./Place";
import { EngineResolverGeneral } from "./General";

export const EngineResolver = {
  Place: PlaceResolver,
  General: EngineResolverGeneral,
  systemName: "System Engine Resolver Subsystem"
};

export * from "./Place";
export * from "./General";
export default EngineResolver;
