export interface Rect2D {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class RectanglesEngine {
  public static area(width: number, height: number): number {
    return width * height;
  }

  public static perimeter(width: number, height: number): number {
    return 2 * (width + height);
  }

  public static diagonal(width: number, height: number): number {
    return Math.hypot(width, height);
  }

  public static containsPoint(rect: Rect2D, px: number, py: number): boolean {
    return (
      px >= rect.x &&
      px <= rect.x + rect.width &&
      py >= rect.y &&
      py <= rect.y + rect.height
    );
  }

  public static intersects(r1: Rect2D, r2: Rect2D): boolean {
    return !(
      r2.x > r1.x + r1.width ||
      r2.x + r2.width < r1.x ||
      r2.y > r1.y + r1.height ||
      r2.y + r2.height < r1.y
    );
  }
}
