/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TwoDEasingCurves — C2 Smoothstep, Cubic Bezier, and Critically Damped Spring 2D Solver.
 */

export class TwoDEasingCurves {
  public static lerp(start: number, end: number, t: number): number {
    const s = Number.isFinite(start) ? start : 0;
    const e = Number.isFinite(end) ? end : s;
    const ct = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    return s * (1.0 - ct) + e * ct;
  }

  public static smoothstep(t: number): number {
    const ct = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    return ct * ct * (3.0 - 2.0 * ct);
  }

  public static smootherstep(t: number): number {
    const ct = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    return ct * ct * ct * (ct * (ct * 6.0 - 15.0) + 10.0);
  }

  public static stepCriticallyDampedSpring(
    current: number,
    velocity: number,
    target: number,
    omegaRadPerSec: number,
    dtSec: number
  ): { value: number; velocity: number } {
    const dt = Math.max(0.0001, Math.min(0.05, Number.isFinite(dtSec) ? dtSec : 0.016667));
    const omega = Math.max(0.5, Math.min(60, Number.isFinite(omegaRadPerSec) ? omegaRadPerSec : 12));
    const cur = Number.isFinite(current) ? current : 0;
    const vel = Number.isFinite(velocity) ? velocity : 0;
    const tgt = Number.isFinite(target) ? target : cur;

    const expTerm = Math.exp(-omega * dt);
    const delta = cur - tgt;
    const temp = (vel + omega * delta) * dt;
    const nextVel = (vel - omega * temp) * expTerm;
    const nextVal = tgt + (delta + temp) * expTerm;
    return {
      value: Math.abs(nextVal) < 1e-15 ? 0 : nextVal,
      velocity: Math.abs(nextVel) < 1e-15 ? 0 : nextVel
    };
  }
}
