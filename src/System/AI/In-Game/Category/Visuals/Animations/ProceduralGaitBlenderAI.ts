/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ProceduralGaitBlenderAI — Phase-Locked Quadruped/Biped Stride & Lean Weight Solver.
 */

export interface GaitBlendOutput {
  strideFrequencyHz: number;
  bobAmplitudeMeters: number;
  pitchLeanRad: number;
  phase0ToTwoPi: number;
}

export class ProceduralGaitBlenderAI {
  public static blendGait(
    speedMetersPerSec: number,
    shoulderHeightMeters: number = 1.65,
    previousPhaseRad: number = 0,
    dtSeconds: number = 0.016667
  ): GaitBlendOutput {
    const v = Math.max(0, Math.min(60, Number.isFinite(speedMetersPerSec) ? Math.abs(speedMetersPerSec) : 0));
    const h = Math.max(0.25, Math.min(4.0, Number.isFinite(shoulderHeightMeters) ? shoulderHeightMeters : 1.65));
    const dt = Math.max(0, Math.min(0.2, Number.isFinite(dtSeconds) ? dtSeconds : 0.016667));
    const prevPhase = Number.isFinite(previousPhaseRad) ? previousPhaseRad : 0;

    // Froude-inspired natural stride frequency scaling
    const strideFreqHz = v < 0.05 ? 0.4 : Math.max(0.8, Math.min(6.5, 0.55 * Math.sqrt(9.81 / h) + 0.14 * v));
    const nextPhase = (prevPhase + 2 * Math.PI * strideFreqHz * dt) % (2 * Math.PI);
    const bobAmplitude = v < 0.05 ? 0.012 : Math.min(0.14, 0.02 + 0.0065 * v);
    const pitchLean = Math.max(-0.28, Math.min(0.28, -0.014 * v));

    return {
      strideFrequencyHz: strideFreqHz,
      bobAmplitudeMeters: bobAmplitude,
      pitchLeanRad: pitchLean,
      phase0ToTwoPi: nextPhase >= 0 ? nextPhase : nextPhase + 2 * Math.PI
    };
  }
}
