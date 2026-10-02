/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Bandwidth_Booster General: Ultra-Scientific High-Bandwidth Algorithms
 * 
 * Provides the mathematical foundations for Parallel Buffer Striping,
 * Zero-Copy Framepipe Mapping, and Deterministic Throughput Control.
 */

export interface BandwidthMetrix {
  throughputMbps: number;
  colorDepthBits: 8 | 10 | 12 | 16;
  sampling: "4:4:4" | "4:2:2" | "4:2:0";
  latencyMs: number;
}

export class BandwidthBoosterMath {
  /**
   * Calculates the exact uncompressed bandwidth required for high-fidelity delivery.
   * Formula: (Width * Height * RefreshRate * BitsPerPixel * SamplingFactor) / 10^6
   */
  public static calculatePeakThroughput(
    width: number,
    height: number,
    refreshRate: number,
    bitsPerPixel: number,
    sampling: "4:4:4" | "4:2:2" | "4:2:0"
  ): number {
    const samplingMultiplier = sampling === "4:4:4" ? 1.0 : sampling === "4:2:2" ? 0.66 : 0.5;
    const rawBitsPerSecond = width * height * refreshRate * bitsPerPixel * 3 * samplingMultiplier;
    return Number((rawBitsPerSecond / 1_000_000).toFixed(2));
  }

  /**
   * Models Parallel Buffer Striping by dividing a high-bandwidth frame across N logical channels.
   */
  public static calculateStripeAllocation(totalThroughput: number, channelCount: number): number[] {
    if (channelCount <= 0) return [totalThroughput];
    const stripeSize = totalThroughput / channelCount;
    return new Array(channelCount).fill(Number(stripeSize.toFixed(2)));
  }

  /**
   * Estimates Thermal-Aware Bandwidth Modulation to prevent hardware strain.
   * Returns a multiplier (0.0 to 1.0) based on throughput density.
   */
  public static getThermalModulationFactor(throughputMbps: number, maxCasingTempC: number): number {
    const threshold = 18000; // 18 Gbps threshold
    if (throughputMbps < threshold) return 1.0;
    const excess = throughputMbps - threshold;
    const reduction = (excess / threshold) * (maxCasingTempC / 100);
    return Math.max(0.5, 1.0 - reduction);
  }
}

export default BandwidthBoosterMath;
