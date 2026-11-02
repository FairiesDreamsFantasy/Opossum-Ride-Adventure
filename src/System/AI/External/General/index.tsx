/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExternalAISystemConfig {
  version: string;
  type: string;
  status: "ACTIVE" | "INACTIVE" | "TESTING";
  autoSenseTierEnabled: boolean;
}

export const AIExternalGeneral: ExternalAISystemConfig = {
  version: "1.0.0",
  type: "Scientific External AI General Component",
  status: "ACTIVE",
  autoSenseTierEnabled: true
};
