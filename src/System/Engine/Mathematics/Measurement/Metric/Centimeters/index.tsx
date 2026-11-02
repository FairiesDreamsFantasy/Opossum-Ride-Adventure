export class CentimetersEngine {
  public static readonly CM_PER_INCH = 2.54;
  public static readonly INCHES_PER_CM = 0.3937007874015748;

  public static fromInches(inches: number): number {
    return inches * this.CM_PER_INCH;
  }

  public static toInches(cm: number): number {
    return cm * this.INCHES_PER_CM;
  }

  public static format(cm: number, verbose: boolean = false): string {
    const rounded = Number(cm.toFixed(1));
    return verbose ? `${rounded} centimeters` : `${rounded} cm`;
  }
}
