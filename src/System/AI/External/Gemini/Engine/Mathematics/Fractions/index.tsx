/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Fraction {
  numerator: number;
  denominator: number;
}

export class GeminiMathFractions {
  public static gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x;
  }

  public static simplify(f: Fraction): Fraction {
    if (f.denominator === 0) return { numerator: 0, denominator: 1 };
    const divisor = this.gcd(f.numerator, f.denominator);
    return {
      numerator: f.numerator / divisor,
      denominator: f.denominator / divisor
    };
  }
}
