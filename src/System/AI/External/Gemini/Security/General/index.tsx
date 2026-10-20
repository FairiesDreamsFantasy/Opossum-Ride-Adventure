/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GeminiSecurityConfigModel {
  name: "Gemini AI Security Subsystem";
  version: "0.2.7.0";
  standard: "40,000,000,000%_ULTRA_BROAD";
  antiBotEnabled: boolean;
  teapotFilterEnabled: boolean;
  tpmBypassMode: "OPEN_SOURCE_CLIENT_ONLY";
}

export const GeminiSecurityGeneralConfig: GeminiSecurityConfigModel = {
  name: "Gemini AI Security Subsystem",
  version: "0.2.7.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  antiBotEnabled: true,
  teapotFilterEnabled: true,
  tpmBypassMode: "OPEN_SOURCE_CLIENT_ONLY"
};
