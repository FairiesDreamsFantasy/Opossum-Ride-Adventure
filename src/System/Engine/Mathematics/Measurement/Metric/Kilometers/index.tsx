export class KilometersEngine {
  public static readonly KM_PER_MILE = 1.609344;
  public static readonly MILES_PER_KM = 0.621371192237334;

  public static fromMiles(miles: number): number {
    return miles * this.KM_PER_MILE;
  }

  public static toMiles(km: number): number {
    return km * this.MILES_PER_KM;
  }

  public static format(km: number, verbose: boolean = false): string {
    const rounded = Number(km.toFixed(2));
    return verbose ? `${rounded} kilometers` : `${rounded} km`;
  }
}
