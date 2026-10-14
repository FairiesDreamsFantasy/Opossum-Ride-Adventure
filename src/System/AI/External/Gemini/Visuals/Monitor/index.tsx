/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MonitorData } from "./Data";
import { GeminiVisualMonitorGeneralEngine, GeminiVisualMonitorGeneral } from "./General";

export const GeminiVisualMonitor = {
  systemName: "Gemini Visual Monitor System",
  Engine: GeminiVisualMonitorGeneralEngine,
  General: GeminiVisualMonitorGeneral,
  Data: MonitorData,
};

export * from "./Data";
export * from "./General";
export default GeminiVisualMonitor;
