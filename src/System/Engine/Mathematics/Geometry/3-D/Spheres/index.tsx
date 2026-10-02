import { Vector3D, VectorEngine } from "../../Vectors";

export class SpheresEngine {
  public static volume(radius: number): number {
    return (4 / 3) * Math.PI * Math.pow(radius, 3);
  }

  public static surfaceArea(radius: number): number {
    return 4 * Math.PI * radius * radius;
  }

  public static isPointInside(p: Vector3D, center: Vector3D, radius: number): boolean {
    return VectorEngine.distance3D(p, center) <= radius;
  }

  public static intersectsSphere(c1: Vector3D, r1: number, c2: Vector3D, r2: number): boolean {
    const dist = VectorEngine.distance3D(c1, c2);
    return dist <= r1 + r2;
  }
}
