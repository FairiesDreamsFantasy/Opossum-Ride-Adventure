/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SecurityEngineConfigModel {
  name: "System Security Engine";
  version: "0.1.0.2";
  standard: "40,000,000,000%_ULTRA_BROAD";
  entropyThresholdBits: number;
  burstThresholdEventsPerSec: number;
  cryptographicDigestAlgorithm: "SHA-256-SIMULATED_DETERMINISTIC_WEB_CRYPTO";
  tpmBypassMode: "PURE_OPEN_SOURCE_CLIENT_SIDE";
}

export const SecurityEngineGeneralConfig: SecurityEngineConfigModel = {
  name: "System Security Engine",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  entropyThresholdBits: 3.2,
  burstThresholdEventsPerSec: 45,
  cryptographicDigestAlgorithm: "SHA-256-SIMULATED_DETERMINISTIC_WEB_CRYPTO",
  tpmBypassMode: "PURE_OPEN_SOURCE_CLIENT_SIDE"
};
