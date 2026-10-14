export class MilesEngine {
  public static readonly FEET_PER_MILE = 5280;
  public static readonly KM_PER_MILE = 1.609344;

  public static fromKilometers(km: number): number {
    return km * 0.621371192237334;
  }

  public static toKilometers(miles: number): number {
    return miles * this.KM_PER_MILE;
  }

  public static format(miles: number, verbose: boolean = false): string {
    const rounded = Number(miles.toFixed(2));
    return verbose ? `${rounded} miles` : `${rounded} mi`;
  }
}
