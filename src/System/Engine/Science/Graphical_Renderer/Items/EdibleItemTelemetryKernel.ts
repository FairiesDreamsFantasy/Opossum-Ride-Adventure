/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * EdibleItemTelemetryKernel — Finite-Safe Harmonic Bobbing & Radius Scaling for Edible Items.
 */

export class EdibleItemTelemetryKernel {
  /**
   * Computes bounded, singularity-safe item render radius from base scale and level type.
   */
  public static computeItemRadius(size: number, isTick: boolean): number {
    const safeSize = Number.isFinite(size) ? Math.max(0.5, Math.min(256, size)) : 6;
    return isTick ? safeSize * 0.8 : safeSize;
  }

  /**
   * Evaluates smooth sinusoidal hover modulation for collectible items.
   */
  public static computeBobOffset(timeMs: number, phaseSeed: number = 0, amplitude: number = 1.5): number {
    const t = Number.isFinite(timeMs) ? timeMs : 0;
    const seed = Number.isFinite(phaseSeed) ? phaseSeed : 0;
    const amp = Number.isFinite(amplitude) ? Math.max(0, Math.min(16, amplitude)) : 1.5;
    return Math.sin(t * 0.005 + seed) * amp;
  }
}
