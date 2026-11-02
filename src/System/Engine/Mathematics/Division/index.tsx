import { DivisionGeneral } from "./General";

export class DivisionEngine {
  /**
   * Deterministic division with zero fallback to 0.
   */
  public static divide(numerator: number, denominator: number): number {
    if (denominator === 0) return 0;
    return numerator / denominator;
  }

  /**
   * Safe division with user-customizable fallback value on zero denominator.
   */
  public static safeDivide(numerator: number, denominator: number, fallback: number = 0): number {
    if (denominator === 0) return fallback;
    return numerator / denominator;
  }

  /**
   * Euclidean modulo that guarantees a strictly positive remainder.
   */
  public static modulo(dividend: number, divisor: number): number {
    if (divisor === 0) return 0;
    return ((dividend % divisor) + divisor) % divisor;
  }

  /**
   * Integer division returning the integer floor quotient.
   */
  public static integerDivide(numerator: number, denominator: number): number {
    if (denominator === 0) return 0;
    return Math.trunc(numerator / denominator);
  }

  /**
   * Safe reciprocal: 1 / n. Returns 0 if n === 0.
   */
  public static reciprocal(n: number): number {
    if (n === 0) return 0;
    return 1 / n;
  }

  /**
   * Calculates fractional ratio of part to total: part / total.
   */
  public static ratio(part: number, total: number): number {
    if (total === 0) return 0;
    return part / total;
  }

  /**
   * Calculates percentage: (part / total) * 100.
   */
  public static percentage(part: number, total: number): number {
    if (total === 0) return 0;
    return (part / total) * 100;
  }

  /**
   * Normalizes a scalar value into [0, 1] given min and max bounds.
   */
  public static normalizeRange(value: number, min: number, max: number): number {
    const range = max - min;
    if (range === 0) return 0;
    return (value - min) / range;
  }

  /**
   * Divides a total into N equal pieces, with remainders handled evenly.
   */
  public static splitEvenly(total: number, parts: number): number[] {
    if (parts <= 0) return [];
    const share = Math.floor(total / parts);
    const remainder = total % parts;
    const result = new Array(parts).fill(share);
    for (let i = 0; i < remainder; i++) {
      result[i] += 1;
    }
    return result;
  }

  public static getGeneralConfig() {
    return DivisionGeneral;
  }
}

