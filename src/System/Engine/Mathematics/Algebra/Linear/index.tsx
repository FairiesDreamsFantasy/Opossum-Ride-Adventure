export class LinearAlgebraEngine {
  /** Solves y = mx + b for y */
  public static evaluateLine(m: number, x: number, b: number): number {
    return m * x + b;
  }

  /** Solves linear equation ax + b = 0 for x */
  public static solveLinear(a: number, b: number): number | null {
    if (a === 0) return null;
    return -b / a;
  }

  /** Solves 2x2 system: a1*x + b1*y = c1, a2*x + b2*y = c2 using Cramer's Rule */
  public static solve2x2System(
    a1: number, b1: number, c1: number,
    a2: number, b2: number, c2: number
  ): { x: number; y: number } | null {
    const det = a1 * b2 - a2 * b1;
    if (Math.abs(det) < 1e-12) return null;
    const detX = c1 * b2 - c2 * b1;
    const detY = a1 * c2 - a2 * c1;
    return { x: detX / det, y: detY / det };
  }
}
