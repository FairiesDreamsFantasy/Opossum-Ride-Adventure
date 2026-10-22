export interface Vector2D {
  x: number;
  y: number;
}

export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export class VectorEngine {
  /** 2D Vector Operations */
  public static add2D(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x + b.x, y: a.y + b.y };
  }

  public static sub2D(a: Vector2D, b: Vector2D): Vector2D {
    return { x: a.x - b.x, y: a.y - b.y };
  }

  public static scale2D(v: Vector2D, scalar: number): Vector2D {
    return { x: v.x * scalar, y: v.y * scalar };
  }

  public static dot2D(a: Vector2D, b: Vector2D): number {
    return a.x * b.x + a.y * b.y;
  }

  public static magnitude2D(v: Vector2D): number {
    return Math.hypot(v.x, v.y);
  }

  public static normalize2D(v: Vector2D): Vector2D {
    const mag = this.magnitude2D(v);
    if (mag === 0) return { x: 0, y: 0 };
    return { x: v.x / mag, y: v.y / mag };
  }

  public static distance2D(a: Vector2D, b: Vector2D): number {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  /** 3D Vector Operations */
  public static add3D(a: Vector3D, b: Vector3D): Vector3D {
    return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
  }

  public static sub3D(a: Vector3D, b: Vector3D): Vector3D {
    return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
  }

  public static scale3D(v: Vector3D, scalar: number): Vector3D {
    return { x: v.x * scalar, y: v.y * scalar, z: v.z * scalar };
  }

  public static dot3D(a: Vector3D, b: Vector3D): number {
    return a.x * b.x + a.y * b.y + a.z * b.z;
  }

  public static cross3D(a: Vector3D, b: Vector3D): Vector3D {
    return {
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    };
  }

  public static magnitude3D(v: Vector3D): number {
    return Math.hypot(v.x, v.y, v.z);
  }

  public static normalize3D(v: Vector3D): Vector3D {
    const mag = this.magnitude3D(v);
    if (mag === 0) return { x: 0, y: 0, z: 0 };
    return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
  }

  public static distance3D(a: Vector3D, b: Vector3D): number {
    return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
  }
}
