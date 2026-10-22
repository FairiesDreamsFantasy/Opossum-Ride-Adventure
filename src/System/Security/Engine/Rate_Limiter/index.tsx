/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RateLimiterGeneralConfig, BurstMetricsReport } from "./General";

export * from "./General";

/**
 * Mathematical Leaky-Bucket Rate Limiter & Burst Controller
 * 
 * Uses continuous fluid-dynamics leaky bucket modeling:
 * Level(t) = max(0, Level(t_prev) - LeakRate * (t - t_prev)) + 1
 * to throttle aggressive automated event floods while allowing natural human double-taps.
 */
export class RateLimiterEngineController {
  private static instance: RateLimiterEngineController;
  private currentWaterLevel: number = 0;
  private lastLeakTimestamp: number = Date.now();
  private eventTimes: number[] = [];

  private constructor() {}

  public static getInstance(): RateLimiterEngineController {
    if (!RateLimiterEngineController.instance) {
      RateLimiterEngineController.instance = new RateLimiterEngineController();
    }
    return RateLimiterEngineController.instance;
  }

  public registerEventAndEvaluate(): BurstMetricsReport {
    const now = Date.now();
    const deltaSec = (now - this.lastLeakTimestamp) / 1000;

    // Leak water over time
    this.currentWaterLevel = Math.max(
      0,
      this.currentWaterLevel - deltaSec * RateLimiterGeneralConfig.leakRatePerSec
    );
    this.lastLeakTimestamp = now;

    // Add current event
    this.currentWaterLevel += 1;

    // Maintain 1-second rolling event window
    this.eventTimes.push(now);
    this.eventTimes = this.eventTimes.filter((t) => now - t <= 1000);
    const currentHz = this.eventTimes.length;

    const burstExceeded = this.currentWaterLevel > RateLimiterGeneralConfig.bucketCapacity;
    const anomalyScore = Math.min(1.0, this.currentWaterLevel / RateLimiterGeneralConfig.bucketCapacity);

    return {
      currentEventRateHz: currentHz,
      burstExceeded,
      leakyBucketLevel: Number(this.currentWaterLevel.toFixed(2)),
      anomalyScore: Number(anomalyScore.toFixed(3))
    };
  }

  public resetBucket(): void {
    this.currentWaterLevel = 0;
    this.lastLeakTimestamp = Date.now();
    this.eventTimes = [];
  }
}

export const RateLimiterEngine = RateLimiterEngineController.getInstance();
