export class MillimetersEngine {
  public static fromInches(inches: number): number {
    return inches * 25.4;
  }

  public static toInches(mm: number): number {
    return mm / 25.4;
  }

  public static format(mm: number, verbose: boolean = false): string {
    const rounded = Number(mm.toFixed(1));
    return verbose ? `${rounded} millimeters` : `${rounded} mm`;
  }
}
