import { Vector3D, VectorEngine } from "../Vectors";

export interface Ray3D {
  origin: Vector3D;
  direction: Vector3D; // Normalized
}

export interface RayHit {
  hit: boolean;
  distance: number;
  point?: Vector3D;
  normal?: Vector3D;
}

export class RaycastingEngine {
  /** Tests ray intersection with a sphere at center with given radius */
  public static intersectSphere(ray: Ray3D, sphereCenter: Vector3D, radius: number): RayHit {
    const oc = VectorEngine.sub3D(ray.origin, sphereCenter);
    const a = VectorEngine.dot3D(ray.direction, ray.direction);
    const b = 2.0 * VectorEngine.dot3D(oc, ray.direction);
    const c = VectorEngine.dot3D(oc, oc) - radius * radius;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) {
      return { hit: false, distance: Infinity };
    }

    const dist = (-b - Math.sqrt(discriminant)) / (2.0 * a);
    if (dist < 0) {
      return { hit: false, distance: Infinity };
    }

    const hitPoint = VectorEngine.add3D(ray.origin, VectorEngine.scale3D(ray.direction, dist));
    const normal = VectorEngine.normalize3D(VectorEngine.sub3D(hitPoint, sphereCenter));

    return {
      hit: true,
      distance: dist,
      point: hitPoint,
      normal
    };
  }

  /** Tests ray intersection with an Axis-Aligned Bounding Box (AABB) */
  public static intersectAABB(ray: Ray3D, min: Vector3D, max: Vector3D): RayHit {
    let tmin = (min.x - ray.origin.x) / (ray.direction.x || 1e-9);
    let tmax = (max.x - ray.origin.x) / (ray.direction.x || 1e-9);

    if (tmin > tmax) [tmin, tmax] = [tmax, tmin];

    let tymin = (min.y - ray.origin.y) / (ray.direction.y || 1e-9);
    let tymax = (max.y - ray.origin.y) / (ray.direction.y || 1e-9);

    if (tymin > tymax) [tymin, tymax] = [tymax, tymin];

    if (tmin > tymax || tymin > tmax) return { hit: false, distance: Infinity };

    if (tymin > tmin) tmin = tymin;
    if (tymax < tmax) tmax = tymax;

    let tzmin = (min.z - ray.origin.z) / (ray.direction.z || 1e-9);
    let tzmax = (max.z - ray.origin.z) / (ray.direction.z || 1e-9);

    if (tzmin > tzmax) [tzmin, tzmax] = [tzmax, tzmin];

    if (tmin > tzmax || tzmin > tmax) return { hit: false, distance: Infinity };

    if (tzmin > tmin) tmin = tzmin;
    if (tzmax < tmax) tmax = tzmax;

    if (tmin < 0) return { hit: false, distance: Infinity };

    const hitPoint = VectorEngine.add3D(ray.origin, VectorEngine.scale3D(ray.direction, tmin));
    return {
      hit: true,
      distance: tmin,
      point: hitPoint
    };
  }
}
