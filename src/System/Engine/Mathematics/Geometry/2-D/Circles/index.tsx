export class CirclesEngine {
  public static area(radius: number): number {
    return Math.PI * radius * radius;
  }

  public static circumference(radius: number): number {
    return 2 * Math.PI * radius;
  }

  public static arcLength(radius: number, angleRadians: number): number {
    return radius * angleRadians;
  }

  public static sectorArea(radius: number, angleRadians: number): number {
    return 0.5 * radius * radius * angleRadians;
  }

  public static isPointInside(px: number, py: number, cx: number, cy: number, radius: number): boolean {
    const dx = px - cx;
    const dy = py - cy;
    return dx * dx + dy * dy <= radius * radius;
  }
}
