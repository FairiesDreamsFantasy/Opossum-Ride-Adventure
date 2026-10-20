export class ModularArithmeticEngine {
  /** True mathematical modulo that properly handles negative integers */
  public static mod(n: number, m: number): number {
    if (m === 0) return 0;
    return ((n % m) + m) % m;
  }

  /** Cyclic wrap within an integer range [min, max] inclusive */
  public static wrapRange(val: number, min: number, max: number): number {
    const range = max - min + 1;
    if (range <= 0) return min;
    return min + this.mod(val - min, range);
  }

  /** Greatest Common Divisor */
  public static gcd(a: number, b: number): number {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y !== 0) {
      const temp = y;
      y = x % y;
      x = temp;
    }
    return x;
  }

  /** Least Common Multiple */
  public static lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / this.gcd(a, b);
  }
}
