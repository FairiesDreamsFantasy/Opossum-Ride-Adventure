export class AnglesEngine {
  public static degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public static radToDeg(radians: number): number {
    return radians * (180 / Math.PI);
  }

  public static normalizeDegrees(degrees: number): number {
    return ((degrees % 360) + 360) % 360;
  }

  public static normalizeRadians(radians: number): number {
    const tau = Math.PI * 2;
    return ((radians % tau) + tau) % tau;
  }

  /** Shortest angular difference between two degree angles (-180 to 180) */
  public static angleDeltaDeg(from: number, to: number): number {
    const diff = (to - from + 180) % 360 - 180;
    return diff < -180 ? diff + 360 : diff;
  }
}
