export class PrismsEngine {
  /** Rectangular cuboid volume */
  public static cuboidVolume(width: number, height: number, depth: number): number {
    return width * height * depth;
  }

  /** Rectangular cuboid surface area */
  public static cuboidSurfaceArea(width: number, height: number, depth: number): number {
    return 2 * (width * height + height * depth + width * depth);
  }

  /** Cylinder volume */
  public static cylinderVolume(radius: number, height: number): number {
    return Math.PI * radius * radius * height;
  }

  /** Cylinder surface area */
  public static cylinderSurfaceArea(radius: number, height: number): number {
    return 2 * Math.PI * radius * height + 2 * Math.PI * radius * radius;
  }
}
