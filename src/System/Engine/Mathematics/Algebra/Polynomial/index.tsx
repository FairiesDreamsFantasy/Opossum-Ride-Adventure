export class PolynomialEngine {
  /** Solves quadratic ax^2 + bx + c = 0 */
  public static solveQuadratic(a: number, b: number, c: number): { roots: number[]; discriminant: number } {
    if (a === 0) {
      if (b === 0) return { roots: [], discriminant: 0 };
      return { roots: [-c / b], discriminant: 0 };
    }

    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
      return { roots: [], discriminant };
    } else if (discriminant === 0) {
      return { roots: [-b / (2 * a)], discriminant: 0 };
    } else {
      const sqrtD = Math.sqrt(discriminant);
      return {
        roots: [(-b + sqrtD) / (2 * a), (-b - sqrtD) / (2 * a)],
        discriminant
      };
    }
  }

  /** Evaluates polynomial given coefficients [c0, c1, c2, ... cn] for c0 + c1*x + c2*x^2 + ... */
  public static evaluatePolynomial(coefficients: number[], x: number): number {
    let result = 0;
    let power = 1;
    for (const c of coefficients) {
      result += c * power;
      power *= x;
    }
    return result;
  }
}
