export class InchesEngine {
  public static readonly MM_PER_INCH = 25.4;
  public static readonly CM_PER_INCH = 2.54;

  public static fromMetric(cm: number): number {
    return cm * 0.3937007874015748;
  }

  public static format(inches: number, verbose: boolean = false): string {
    const rounded = Number(inches.toFixed(1));
    return verbose ? `${rounded} inches` : `${rounded} in`;
  }
}
