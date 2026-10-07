/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AntiBotMetrics {
  keystrokeDeltas: number[];
  pointerEntropy: number;
  inputCadenceVariance: number;
  isHumanVerified: boolean;
  totalValidInteractions: number;
  lastInteractionTimestamp: number;
}

export const AntiBotGeneralConfig = {
  minInputCadenceMs: 20, // Milliseconds below which input is flagged as inhuman machine burst
  maxCadenceVarianceThreshold: 0.0001, // Zero variance indicates non-human constant timer script
  sampleWindowSize: 30,
  humanVerificationThreshold: 5,
  antiScraperRateLimitPerSec: 60,
  status: "ACTIVE_MONITORING"
};
