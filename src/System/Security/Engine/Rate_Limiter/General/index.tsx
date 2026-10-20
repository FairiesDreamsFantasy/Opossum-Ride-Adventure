/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BurstMetricsReport {
  currentEventRateHz: number;
  burstExceeded: boolean;
  leakyBucketLevel: number;
  anomalyScore: number;
}

export const RateLimiterGeneralConfig = {
  name: "Rate Limiter General",
  module: "System/Security/Engine/Rate_Limiter",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  bucketCapacity: 60,
  leakRatePerSec: 20
};
