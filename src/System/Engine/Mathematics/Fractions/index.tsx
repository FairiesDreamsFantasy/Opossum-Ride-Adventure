import { FractionsGeneral } from "./General";

export interface Fraction {
  numerator: number;
  denominator: number;
}

export class FractionsEngine {
  /**
   * Euclidean Greatest Common Divisor.
   */
  public static gcd(a: number, b: number): number {
    let x = Math.abs(Math.round(a));
    let y = Math.abs(Math.round(b));
    while (y !== 0) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  }

  /**
   * Least Common Multiple of two integers.
   */
  public static lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs(Math.round(a * b)) / this.gcd(a, b);
  }

  /**
   * Reduces fraction to lowest integer terms, ensuring positive denominator.
   */
  public static simplify(f: Fraction): Fraction {
    if (f.denominator === 0) return { numerator: 0, denominator: 1 };
    const sign = (f.numerator < 0 !== f.denominator < 0) ? -1 : 1;
    const num = Math.abs(Math.round(f.numerator));
    const den = Math.abs(Math.round(f.denominator));
    const divisor = this.gcd(num, den);

    return {
      numerator: sign * (num / divisor),
      denominator: den / divisor
    };
  }

  /**
   * Rational addition: a/b + c/d = (ad + bc) / bd.
   */
  public static add(a: Fraction, b: Fraction): Fraction {
    const num = a.numerator * b.denominator + b.numerator * a.denominator;
    const den = a.denominator * b.denominator;
    return this.simplify({ numerator: num, denominator: den });
  }

  /**
   * Rational subtraction: a/b - c/d = (ad - bc) / bd.
   */
  public static subtract(a: Fraction, b: Fraction): Fraction {
    const num = a.numerator * b.denominator - b.numerator * a.denominator;
    const den = a.denominator * b.denominator;
    return this.simplify({ numerator: num, denominator: den });
  }

  /**
   * Rational multiplication: (a * c) / (b * d).
   */
  public static multiply(a: Fraction, b: Fraction): Fraction {
    const num = a.numerator * b.numerator;
    const den = a.denominator * b.denominator;
    return this.simplify({ numerator: num, denominator: den });
  }

  /**
   * Rational division: (a/b) / (c/d) = (ad) / (bc).
   */
  public static divide(a: Fraction, b: Fraction): Fraction {
    if (b.numerator === 0) return { numerator: 0, denominator: 1 };
    const num = a.numerator * b.denominator;
    const den = a.denominator * b.numerator;
    return this.simplify({ numerator: num, denominator: den });
  }

  /**
   * Converts floating point decimal into rational fraction using Farey sequence / continued fractions.
   */
  public static fromDecimal(val: number, maxDenominator: number = 10000): Fraction {
    if (isNaN(val)) return { numerator: 0, denominator: 1 };
    const sign = val < 0 ? -1 : 1;
    const absVal = Math.abs(val);

    let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
    let b = absVal;
    do {
      const a = Math.floor(b);
      let aux = h1;
      h1 = a * h1 + h2;
      h2 = aux;
      aux = k1;
      k1 = a * k1 + k2;
      k2 = aux;
      b = 1 / (b - a);
    } while (Math.abs(absVal - h1 / k1) > absVal * 1e-6 && k1 <= maxDenominator && isFinite(b));

    return {
      numerator: sign * h1,
      denominator: k1
    };
  }

  /**
   * Converts fraction to decimal number.
   */
  public static toDecimal(f: Fraction): number {
    return f.denominator !== 0 ? f.numerator / f.denominator : 0;
  }

  /**
   * Pretty-prints a fraction (e.g. "3/4" or "1 1/2" for mixed fractions).
   */
  public static formatFraction(f: Fraction, mixed: boolean = false): string {
    const s = this.simplify(f);
    if (s.denominator === 1) return `${s.numerator}`;
    if (!mixed) return `${s.numerator}/${s.denominator}`;

    const whole = Math.trunc(s.numerator / s.denominator);
    const rem = Math.abs(s.numerator % s.denominator);
    if (whole === 0) return `${s.numerator}/${s.denominator}`;
    if (rem === 0) return `${whole}`;
    return `${whole} ${rem}/${s.denominator}`;
  }

  public static getGeneralConfig() {
    return FractionsGeneral;
  }
}

