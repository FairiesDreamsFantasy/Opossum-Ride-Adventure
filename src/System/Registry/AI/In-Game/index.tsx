/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./Category";
export * from "./Smart_Sky";
export * from "./Drift_Guard";

import { AICategoryRegistry } from "./Category";
import { SmartSkyRegistry } from "./Smart_Sky";
import { DriftGuardRegistry } from "./Drift_Guard";

export const InGameAIRegistry = {
  Category: AICategoryRegistry,
  SmartSky: SmartSkyRegistry,
  DriftGuard: DriftGuardRegistry,
};
