/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Numerical Differential Equations Solver Engine.
 * Provides high-order numerical integration schemes for physics, kinetics, and mechanics.
 */
export class DifferentialEquationsEngine {
  /**
   * Symplectic Euler Integrator:
   * v(t+dt) = v(t) + a(x(t)) * dt
   * x(t+dt) = x(t) + v(t+dt) * dt
   * Preserves energy for oscillatory and Hamiltonian systems over long integration times.
   */
  public static symplecticEuler(
    x: number,
    v: number,
    accelerationFn: (x: number) => number,
    dt: number
  ): { nextX: number; nextV: number } {
    const nextV = v + accelerationFn(x) * dt;
    const nextX = x + nextV * dt;
    return { nextX, nextV };
  }

  /**
   * Velocity Verlet Integrator (Second-order symplectic method):
   * x(t+dt) = x(t) + v(t)*dt + 0.5*a(t)*dt^2
   * a(t+dt) = a(x(t+dt))
   * v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
   */
  public static velocityVerlet(
    x: number,
    v: number,
    accelerationFn: (x: number) => number,
    dt: number
  ): { nextX: number; nextV: number; nextA: number } {
    const currentA = accelerationFn(x);
    const nextX = x + v * dt + 0.5 * currentA * dt * dt;
    const nextA = accelerationFn(nextX);
    const nextV = v + 0.5 * (currentA + nextA) * dt;
    return { nextX, nextV, nextA };
  }

  /**
   * Coupled 2nd-Order Runge-Kutta (Midpoint Method)
   */
  public static rk2(
    x: number,
    v: number,
    accelerationFn: (x: number, v: number, t: number) => number,
    t: number,
    dt: number
  ): { nextX: number; nextV: number } {
    const k1x = v;
    const k1v = accelerationFn(x, v, t);

    const midX = x + k1x * (dt / 2);
    const midV = v + k1v * (dt / 2);

    const k2x = midV;
    const k2v = accelerationFn(midX, midV, t + dt / 2);

    return {
      nextX: x + k2x * dt,
      nextV: v + k2v * dt,
    };
  }

  /**
   * Damped Harmonic Oscillator Exact Solution:
   * m * x'' + c * x' + k * x = 0
   * Calculates displacement and velocity at time t based on damping ratio zeta.
   */
  public static dampedHarmonicOscillator(
    mass: number,
    dampingCoeff: number,
    springConst: number,
    initialX: number,
    initialV: number,
    t: number
  ): { x: number; v: number; regime: "underdamped" | "critically_damped" | "overdamped" } {
    const omega0 = Math.sqrt(springConst / mass);
    const zeta = dampingCoeff / (2 * Math.sqrt(mass * springConst));

    if (zeta < 1.0) {
      // Underdamped regime
      const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
      const decay = Math.exp(-zeta * omega0 * t);
      const A = initialX;
      const B = (initialV + zeta * omega0 * initialX) / omegaD;

      const x = decay * (A * Math.cos(omegaD * t) + B * Math.sin(omegaD * t));
      const v =
        -zeta * omega0 * x +
        decay * (-A * omegaD * Math.sin(omegaD * t) + B * omegaD * Math.cos(omegaD * t));

      return { x, v, regime: "underdamped" };
    } else if (Math.abs(zeta - 1.0) < 1e-6) {
      // Critically damped
      const decay = Math.exp(-omega0 * t);
      const C1 = initialX;
      const C2 = initialV + omega0 * initialX;

      const x = (C1 + C2 * t) * decay;
      const v = C2 * decay - omega0 * (C1 + C2 * t) * decay;

      return { x, v, regime: "critically_damped" };
    } else {
      // Overdamped
      const gamma1 = -omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
      const gamma2 = -omega0 * (zeta + Math.sqrt(zeta * zeta - 1));

      const C1 = (initialV - gamma2 * initialX) / (gamma1 - gamma2);
      const C2 = initialX - C1;

      const x = C1 * Math.exp(gamma1 * t) + C2 * Math.exp(gamma2 * t);
      const v = C1 * gamma1 * Math.exp(gamma1 * t) + C2 * gamma2 * Math.exp(gamma2 * t);

      return { x, v, regime: "overdamped" };
    }
  }
}
