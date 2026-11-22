/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * FrameBudgetGovernorAI — EWMA Frame-Time Controller for Adaptive Visual LOD & Effect Scaling.
 */

export interface VisualBudgetDecision {
  smoothedDeltaMs: number;
  particleDensityScale: number;
  maxDynamicLights: number;
  recommendedPixelSize: number;
  thermalTier: "optimal" | "balanced" | "conserve";
}

export class VisualFrameBudgetGovernorAI {
  private static ewmaMs = 16.6667;

  public static evaluateBudget(rawDeltaMs: number, currentPixelSize: number = 1): VisualBudgetDecision {
    const clampedDelta = Math.max(1.0, Math.min(250.0, Number.isFinite(rawDeltaMs) ? rawDeltaMs : 16.6667));
    this.ewmaMs = 0.85 * this.ewmaMs + 0.15 * clampedDelta;
    const basePixel = Math.max(1, Math.min(8, Math.floor(Number.isFinite(currentPixelSize) ? currentPixelSize : 1)));

    if (this.ewmaMs <= 19.0) {
      return {
        smoothedDeltaMs: this.ewmaMs,
        particleDensityScale: 1.0,
        maxDynamicLights: 8,
        recommendedPixelSize: basePixel,
        thermalTier: "optimal"
      };
    }

    if (this.ewmaMs <= 28.0) {
      return {
        smoothedDeltaMs: this.ewmaMs,
        particleDensityScale: 0.72,
        maxDynamicLights: 4,
        recommendedPixelSize: basePixel,
        thermalTier: "balanced"
      };
    }

    return {
      smoothedDeltaMs: this.ewmaMs,
      particleDensityScale: 0.45,
      maxDynamicLights: 2,
      recommendedPixelSize: Math.max(2, basePixel),
      thermalTier: "conserve"
    };
  }

  public static reset(): void {
    this.ewmaMs = 16.6667;
  }
}
