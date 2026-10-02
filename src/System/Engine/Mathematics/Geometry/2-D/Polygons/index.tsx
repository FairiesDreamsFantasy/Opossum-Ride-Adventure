import { Vector2D } from "../../Vectors";

export class PolygonsEngine {
  /** Calculates polygon area using the Shoelace formula */
  public static calculateArea(vertices: Vector2D[]): number {
    const n = vertices.length;
    if (n < 3) return 0;
    let area = 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += vertices[i].x * vertices[j].y;
      area -= vertices[j].x * vertices[i].y;
    }
    return Math.abs(area) * 0.5;
  }

  /** Point in polygon test using Jordan Curve Theorem (Ray casting) */
  public static isPointInPolygon(point: Vector2D, vertices: Vector2D[]): boolean {
    const n = vertices.length;
    let inside = false;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = vertices[i].x, yi = vertices[i].y;
      const xj = vertices[j].x, yj = vertices[j].y;
      const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }
}
