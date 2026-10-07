/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CalculusEngine {
  /**
   * High-precision central-difference numerical derivative: f'(x) ~ (f(x+h) - f(x-h)) / (2h).
   */
  public static calculateDerivative(f: (x: number) => number, x: number, h: number = 0.00001): number {
    return (f(x + h) - f(x - h)) / (2 * h);
  }

  /**
   * Second derivative: f''(x) ~ (f(x+h) - 2f(x) + f(x-h)) / h^2.
   */
  public static calculateSecondDerivative(f: (x: number) => number, x: number, h: number = 0.0001): number {
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h);
  }

  /**
   * Definite numerical integration using Simpson's 1/3 rule.
   */
  public static integrateSimpson(f: (x: number) => number, a: number, b: number, n: number = 100): number {
    // Ensure even number of intervals
    const steps = n % 2 === 0 ? n : n + 1;
    const h = (b - a) / steps;
    let sum = f(a) + f(b);

    for (let i = 1; i < steps; i++) {
      const x = a + i * h;
      sum += (i % 2 === 0 ? 2 : 4) * f(x);
    }

    return (h / 3) * sum;
  }

  /**
   * Definite numerical integration using the Trapezoidal rule.
   */
  public static integrateTrapezoidal(f: (x: number) => number, a: number, b: number, n: number = 100): number {
    const h = (b - a) / n;
    let sum = 0.5 * (f(a) + f(b));
    for (let i = 1; i < n; i++) {
      sum += f(a + i * h);
    }
    return sum * h;
  }

  /**
   * Partial derivative of a multivariable function f(point) along axis index.
   */
  public static partialDerivative(
    f: (point: number[]) => number,
    point: number[],
    axis: number,
    h: number = 0.00001
  ): number {
    const forward = [...point];
    const backward = [...point];
    forward[axis] += h;
    backward[axis] -= h;
    return (f(forward) - f(backward)) / (2 * h);
  }

  /**
   * Multivariable Gradient vector: ∇f(point).
   */
  public static gradient(f: (point: number[]) => number, point: number[], h: number = 0.00001): number[] {
    return point.map((_, axis) => this.partialDerivative(f, point, axis, h));
  }

  /**
   * Runge-Kutta 4th Order (RK4) single-step numerical ODE solver: dy/dt = f(t, y).
   */
  public static rk4Step(
    f: (t: number, y: number) => number,
    t: number,
    y: number,
    dt: number
  ): number {
    const k1 = f(t, y);
    const k2 = f(t + 0.5 * dt, y + 0.5 * dt * k1);
    const k3 = f(t + 0.5 * dt, y + 0.5 * dt * k2);
    const k4 = f(t + dt, y + dt * k3);
    return y + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
  }

  /**
   * Newton-Raphson root finding algorithm: f(x) = 0.
   */
  public static newtonRaphson(
    f: (x: number) => number,
    initialGuess: number,
    tolerance: number = 1e-7,
    maxIterations: number = 100
  ): number {
    let x = initialGuess;
    for (let i = 0; i < maxIterations; i++) {
      const fx = f(x);
      if (Math.abs(fx) < tolerance) return x;
      const dfx = this.calculateDerivative(f, x);
      if (Math.abs(dfx) < 1e-12) break; // Avoid division by near zero
      x = x - fx / dfx;
    }
    return x;
  }
}

