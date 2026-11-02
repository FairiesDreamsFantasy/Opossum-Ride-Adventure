export class FeetEngine {
  public static readonly METERS_PER_FOOT = 0.3048;

  public static fromMeters(meters: number): number {
    return meters * 3.280839895013123;
  }

  public static toMeters(feet: number): number {
    return feet * this.METERS_PER_FOOT;
  }

  public static format(feet: number, verbose: boolean = false): string {
    const rounded = Math.round(feet);
    return verbose ? `${rounded} feet` : `${rounded} ft`;
  }
}
