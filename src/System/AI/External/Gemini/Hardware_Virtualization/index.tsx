/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiHardwareVirtualizationGeneral } from "./General";
import { GeminiHardwareVirtualizationData } from "./Data";

export * from "./General";
export * from "./Data";

export const GeminiHardwareVirtualization = {
  General: GeminiHardwareVirtualizationGeneral,
  Data: GeminiHardwareVirtualizationData,
  systemName: "Gemini Hardware Virtualization Subsystem",
};

export default GeminiHardwareVirtualization;
