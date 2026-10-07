export interface Point2D {
  x: number;
  y: number;
}

export interface PolarPoint {
  radius: number;
  angleRadians: number;
}

export class CoordinatesEngine {
  public static cartesianToPolar(point: Point2D): PolarPoint {
    return {
      radius: Math.hypot(point.x, point.y),
      angleRadians: Math.atan2(point.y, point.x)
    };
  }

  public static polarToCartesian(polar: PolarPoint): Point2D {
    return {
      x: polar.radius * Math.cos(polar.angleRadians),
      y: polar.radius * Math.sin(polar.angleRadians)
    };
  }

  public static translatePoint(p: Point2D, dx: number, dy: number): Point2D {
    return { x: p.x + dx, y: p.y + dy };
  }

  public static scalePoint(p: Point2D, sx: number, sy: number): Point2D {
    return { x: p.x * sx, y: p.y * sy };
  }
}
