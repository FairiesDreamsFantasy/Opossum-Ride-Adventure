import { Vector3D } from "../../Vectors";

export interface AABB3D {
  min: Vector3D;
  max: Vector3D;
}

export class BoundingBoxesEngine {
  public static createAABB(min: Vector3D, max: Vector3D): AABB3D {
    return { min, max };
  }

  public static volume(box: AABB3D): number {
    const dx = Math.max(0, box.max.x - box.min.x);
    const dy = Math.max(0, box.max.y - box.min.y);
    const dz = Math.max(0, box.max.z - box.min.z);
    return dx * dy * dz;
  }

  public static intersects(a: AABB3D, b: AABB3D): boolean {
    return (
      a.min.x <= b.max.x &&
      a.max.x >= b.min.x &&
      a.min.y <= b.max.y &&
      a.max.y >= b.min.y &&
      a.min.z <= b.max.z &&
      a.max.z >= b.min.z
    );
  }

  public static containsPoint(box: AABB3D, p: Vector3D): boolean {
    return (
      p.x >= box.min.x &&
      p.x <= box.max.x &&
      p.y >= box.min.y &&
      p.y <= box.max.y &&
      p.z >= box.min.z &&
      p.z <= box.max.z
    );
  }
}
