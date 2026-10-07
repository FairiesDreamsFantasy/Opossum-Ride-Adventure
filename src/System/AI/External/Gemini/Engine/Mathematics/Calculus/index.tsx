/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class GeminiMathCalculus {
  /**
   * Numerically approximates the derivative of a function at x.
   */
  public static approximateDerivative(f: (x: number) => number, x: number, h: number = 0.000001): number {
    return (f(x + h) - f(x)) / h;
  }

  /**
   * Numerically approximates the integral of a function from a to b using Simpson's rule.
   */
  public static approximateIntegral(f: (x: number) => number, a: number, b: number, n: number = 100): number {
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      sum += f(a + i * h) * (i % 2 === 0 ? 2 : 4);
    }
    return (h / 3) * sum;
  }
}
