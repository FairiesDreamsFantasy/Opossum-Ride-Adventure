/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * NumericalIntegrators — RK4, Symplectic Euler, Velocity Verlet, and Simpson's 1/3 Solvers.
 */

import { MathStabilizer } from "./NumericalStabilizer";

export class NumericalIntegratorKernel {
  public static stepRK4(
    pos: number,
    vel: number,
    accelFn: (x: number, v: number, t: number) => number,
    tSec: number,
    dtSec: number
  ): { pos: number; vel: number } {
    const safeDt = MathStabilizer.clampFinite(dtSec, 0.0001, 0.05, 0.016667);
    const safePos = MathStabilizer.sanitizeFinite(pos, 0);
    const safeVel = MathStabilizer.sanitizeFinite(vel, 0);
    const safeT = MathStabilizer.sanitizeFinite(tSec, 0);

    const k1x = safeVel;
    const k1v = MathStabilizer.sanitizeFinite(accelFn(safePos, safeVel, safeT), 0);

    const halfDt = safeDt * 0.5;
    const x2 = safePos + k1x * halfDt;
    const v2 = safeVel + k1v * halfDt;
    const k2x = v2;
    const k2v = MathStabilizer.sanitizeFinite(accelFn(x2, v2, safeT + halfDt), 0);

    const x3 = safePos + k2x * halfDt;
    const v3 = safeVel + k2v * halfDt;
    const k3x = v3;
    const k3v = MathStabilizer.sanitizeFinite(accelFn(x3, v3, safeT + halfDt), 0);

    const x4 = safePos + k3x * safeDt;
    const v4 = safeVel + k3v * safeDt;
    const k4x = v4;
    const k4v = MathStabilizer.sanitizeFinite(accelFn(x4, v4, safeT + safeDt), 0);

    return {
      pos: MathStabilizer.flushDenormal(safePos + (safeDt / 6.0) * (k1x + 2 * k2x + 2 * k3x + k4x)),
      vel: MathStabilizer.flushDenormal(safeVel + (safeDt / 6.0) * (k1v + 2 * k2v + 2 * k3v + k4v))
    };
  }

  public static stepSymplecticEuler(
    pos: number,
    vel: number,
    acceleration: number,
    dtSec: number
  ): { pos: number; vel: number } {
    const safeDt = MathStabilizer.clampFinite(dtSec, 0.0001, 0.05, 0.016667);
    const nextVel = MathStabilizer.flushDenormal(
      MathStabilizer.sanitizeFinite(vel, 0) + MathStabilizer.sanitizeFinite(acceleration, 0) * safeDt
    );
    const nextPos = MathStabilizer.flushDenormal(
      MathStabilizer.sanitizeFinite(pos, 0) + nextVel * safeDt
    );
    return { pos: nextPos, vel: nextVel };
  }

  public static simpsonOneThird(
    fn: (x: number) => number,
    a: number,
    b: number,
    intervals: number = 32
  ): number {
    const start = MathStabilizer.sanitizeFinite(a, 0);
    const end = MathStabilizer.sanitizeFinite(b, 0);
    if (MathStabilizer.nearlyEqual(start, end)) return 0;
    const evenN = Math.max(2, Math.floor(MathStabilizer.clampFinite(intervals, 2, 2048, 32) / 2) * 2);
    const h = (end - start) / evenN;
    let sum = MathStabilizer.sanitizeFinite(fn(start), 0) + MathStabilizer.sanitizeFinite(fn(end), 0);
    for (let i = 1; i < evenN; i++) {
      const weight = i % 2 === 0 ? 2 : 4;
      sum += weight * MathStabilizer.sanitizeFinite(fn(start + i * h), 0);
    }
    return MathStabilizer.flushDenormal((h / 3.0) * sum);
  }
}
