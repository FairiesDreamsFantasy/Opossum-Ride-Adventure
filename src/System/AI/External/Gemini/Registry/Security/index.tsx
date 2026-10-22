/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiRegistrySecurityGeneral } from "./General";
import { GeminiSecurity } from "../../Security";

export * from "./General";

export const GeminiRegistrySecurity = {
  General: GeminiRegistrySecurityGeneral,
  Security: GeminiSecurity,
  getStatus: () => ({
    active: true,
    antiBot: true,
    teapotHoneypot: true,
    standard: "40,000,000,000%_ULTRA_BROAD"
  })
};
