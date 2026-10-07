export class MetersEngine {
  public static readonly FEET_PER_METER = 3.280839895013123;
  public static readonly METERS_PER_FOOT = 0.3048;

  public static fromFeet(feet: number): number {
    return feet * this.METERS_PER_FOOT;
  }

  public static toFeet(meters: number): number {
    return meters * this.FEET_PER_METER;
  }

  public static format(meters: number, verbose: boolean = false): string {
    const rounded = Math.round(meters);
    return verbose ? `${rounded} meters` : `${rounded} m`;
  }
}
