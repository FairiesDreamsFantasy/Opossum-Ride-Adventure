export class YardsEngine {
  public static readonly FEET_PER_YARD = 3;

  public static fromFeet(feet: number): number {
    return feet / this.FEET_PER_YARD;
  }

  public static toFeet(yards: number): number {
    return yards * this.FEET_PER_YARD;
  }

  public static format(yards: number, verbose: boolean = false): string {
    const rounded = Number(yards.toFixed(1));
    return verbose ? `${rounded} yards` : `${rounded} yd`;
  }
}
