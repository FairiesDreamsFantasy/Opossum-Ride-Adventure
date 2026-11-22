/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SpatialBinauralSolver — 3D Binaural Localization, Woodworth-Schlosser ITD,
 * Constant-Power Stereophonic Panning, and Atmospheric High-Frequency Shadowing.
 */

import { AcousticStabilizer } from "./AcousticStabilizer";
import { WavePropagationPhysics } from "./WavePropagationPhysics";

export interface SpatialAcousticVector {
  distanceMeters: number;
  pan: number;
  leftGain: number;
  rightGain: number;
  distanceGain: number;
  lowPassCutoffHz: number;
  itdSeconds: number;
  azimuthRad: number;
  elevationRad: number;
}

export class SpatialBinauralSolver {
  public static readonly HUMAN_HEAD_RADIUS_M = 0.0875;

  /**
   * Computes Equal-Power Stereophonic [leftGain, rightGain] for normalized pan in [-1, 1].
   */
  public static computeEqualPowerPan(pan: number): [number, number] {
    const clampedPan = AcousticStabilizer.clampFinite(pan, -1.0, 1.0, 0);
    const theta = (clampedPan + 1.0) * (Math.PI * 0.25); // [0, pi/2]
    const left = AcousticStabilizer.flushDenormal(Math.cos(theta));
    const right = AcousticStabilizer.flushDenormal(Math.sin(theta));
    return [
      AcousticStabilizer.clampFinite(left, 0, 1.0, 0.7071),
      AcousticStabilizer.clampFinite(right, 0, 1.0, 0.7071)
    ];
  }

  /**
   * Woodworth-Schlosser Spherical Head Interaural Time Difference (ITD in seconds):
   * tau = (r_head / c) * (sin(theta) + theta)
   */
  public static computeWoodworthITD(azimuthRad: number, tempCelsius: number = 20.0): number {
    const c = WavePropagationPhysics.speedOfSoundAir(tempCelsius);
    const clampedAz = AcousticStabilizer.clampFinite(azimuthRad, -Math.PI, Math.PI, 0);
    // Fold azimuth into [-pi/2, pi/2] lateral hemisphere for Woodworth arc
    const folded = Math.asin(Math.max(-1, Math.min(1, Math.sin(clampedAz))));
    const itd = (this.HUMAN_HEAD_RADIUS_M / c) * (Math.sin(folded) + folded);
    return AcousticStabilizer.flushDenormal(AcousticStabilizer.clampFinite(itd, -0.00075, 0.00075, 0));
  }

  /**
   * Complete zero-allocation-friendly 3D spatial localization & atmospheric filter calculation.
   */
  public static calculate3DSpatialAcoustics(
    sourceX: number,
    sourceY: number,
    sourceZ: number,
    listenerX: number,
    listenerY: number,
    listenerZ: number,
    tempCelsius: number = 20.0,
    slewChannelKey?: string,
    nowSec: number = 0
  ): SpatialAcousticVector {
    const dx = AcousticStabilizer.sanitizeFinite(sourceX, 0) - AcousticStabilizer.sanitizeFinite(listenerX, 0);
    const dy = AcousticStabilizer.sanitizeFinite(sourceY, 0) - AcousticStabilizer.sanitizeFinite(listenerY, 0);
    const dz = AcousticStabilizer.sanitizeFinite(sourceZ, 0) - AcousticStabilizer.sanitizeFinite(listenerZ, 0);

    const horizDistSq = dx * dx + dz * dz;
    const distSq = horizDistSq + dy * dy;
    const distanceMeters = Math.max(0.1, Math.sqrt(distSq));
    const horizDist = Math.max(0.05, Math.sqrt(horizDistSq));

    const azimuthRad = Math.atan2(dx, dz);
    const elevationRad = Math.atan2(dy, horizDist);

    const rawPan = Math.max(-1.0, Math.min(1.0, Math.sin(azimuthRad)));
    const pan = slewChannelKey
      ? AcousticStabilizer.smoothParameter(`${slewChannelKey}:pan`, rawPan, nowSec, 0.025)
      : rawPan;

    const [eqLeft, eqRight] = this.computeEqualPowerPan(pan);
    const baseDistanceGain = AcousticStabilizer.applySoftKneeLimiter(1.0 / (1.0 + 0.08 * distanceMeters));
    const itdSeconds = this.computeWoodworthITD(azimuthRad, tempCelsius);

    // Subtle elevation & head-shadowing tilt + Stokes-Kirchhoff air damping
    const rearShadowFactor = dz < 0 ? 0.82 : 1.0;
    const rawCutoff = Math.max(1200, (20000 * rearShadowFactor) / (1.0 + 0.025 * distanceMeters * distanceMeters));
    const lowPassCutoffHz = slewChannelKey
      ? AcousticStabilizer.clampNyquistFrequency(
          AcousticStabilizer.smoothParameter(`${slewChannelKey}:lpf`, rawCutoff, nowSec, 0.04)
        )
      : AcousticStabilizer.clampNyquistFrequency(rawCutoff);

    return {
      distanceMeters,
      pan,
      leftGain: AcousticStabilizer.clampFinite(eqLeft * baseDistanceGain, 0, 1.0, 0),
      rightGain: AcousticStabilizer.clampFinite(eqRight * baseDistanceGain, 0, 1.0, 0),
      distanceGain: baseDistanceGain,
      lowPassCutoffHz,
      itdSeconds,
      azimuthRad,
      elevationRad
    };
  }
}
