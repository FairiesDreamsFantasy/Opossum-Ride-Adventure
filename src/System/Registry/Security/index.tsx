/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecurityRegistryGeneral } from "./General";
import { AntiBotRegistry } from "./Anti-Bot";
import { APMRegistry } from "./APM";
import { SystemSecurity } from "../../Security";

export * from "./General";
export * from "./Anti-Bot";
export * from "./APM";

export const SecurityRegistry = {
  General: SecurityRegistryGeneral,
  AntiBot: AntiBotRegistry,
  APM: APMRegistry,
  SystemSecurity: SystemSecurity,
  Engine: SystemSecurity.Engine,
  getStatus: () => SystemSecurity.getStatus()
};
