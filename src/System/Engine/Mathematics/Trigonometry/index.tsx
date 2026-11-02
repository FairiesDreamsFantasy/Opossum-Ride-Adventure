/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SphericalCoordinates {
  radius: number;
  theta: number; // azimuthal angle in radians
  phi: number;   // polar angle from zenith in radians
}

export interface CartesianCoordinates3D {
  x: number;
  y: number;
  z: number;
}

export class TrigonometryEngine {
  /**
   * Sine function.
   */
  public static calculateSine(angleRad: number): number {
    return Math.sin(angleRad);
  }

  /**
   * Cosine function.
   */
  public static calculateCosine(angleRad: number): number {
    return Math.cos(angleRad);
  }

  /**
   * Tangent function.
   */
  public static calculateTangent(angleRad: number): number {
    return Math.tan(angleRad);
  }

  /**
   * Secant: 1 / cos(x).
   */
  public static calculateSecant(angleRad: number): number {
    const cosVal = Math.cos(angleRad);
    if (Math.abs(cosVal) < 1e-12) return 0;
    return 1 / cosVal;
  }

  /**
   * Cosecant: 1 / sin(x).
   */
  public static calculateCosecant(angleRad: number): number {
    const sinVal = Math.sin(angleRad);
    if (Math.abs(sinVal) < 1e-12) return 0;
    return 1 / sinVal;
  }

  /**
   * Cotangent: 1 / tan(x) = cos(x) / sin(x).
   */
  public static calculateCotangent(angleRad: number): number {
    const sinVal = Math.sin(angleRad);
    if (Math.abs(sinVal) < 1e-12) return 0;
    return Math.cos(angleRad) / sinVal;
  }

  /**
   * Arcsine with clamped domain [-1, 1].
   */
  public static calculateArcSine(val: number): number {
    return Math.asin(Math.max(-1, Math.min(1, val)));
  }

  /**
   * Arccosine with clamped domain [-1, 1].
   */
  public static calculateArcCosine(val: number): number {
    return Math.acos(Math.max(-1, Math.min(1, val)));
  }

  /**
   * Arctangent.
   */
  public static calculateArcTangent(val: number): number {
    return Math.atan(val);
  }

  /**
   * Four-quadrant arctangent atan2(y, x).
   */
  public static calculateAtan2(y: number, x: number): number {
    return Math.atan2(y, x);
  }

  /**
   * Hyperbolic sine.
   */
  public static sinh(x: number): number {
    return Math.sinh(x);
  }

  /**
   * Hyperbolic cosine.
   */
  public static cosh(x: number): number {
    return Math.cosh(x);
  }

  /**
   * Hyperbolic tangent.
   */
  public static tanh(x: number): number {
    return Math.tanh(x);
  }

  /**
   * Converts degrees to radians.
   */
  public static degToRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  /**
   * Converts radians to degrees.
   */
  public static radToDeg(rad: number): number {
    return (rad * 180) / Math.PI;
  }

  /**
   * Normalizes an angle in radians to [0, 2*PI).
   */
  public static normalizeAngleRad(rad: number): number {
    const twoPi = 2 * Math.PI;
    return ((rad % twoPi) + twoPi) % twoPi;
  }

  /**
   * Normalizes an angle in degrees to [0, 360).
   */
  public static normalizeAngleDeg(deg: number): number {
    return ((deg % 360) + 360) % 360;
  }

  /**
   * Converts Cartesian (x, y, z) coordinates to spherical (radius, theta, phi).
   */
  public static cartesianToSpherical(x: number, y: number, z: number): SphericalCoordinates {
    const radius = Math.sqrt(x * x + y * y + z * z);
    if (radius === 0) return { radius: 0, theta: 0, phi: 0 };
    const theta = Math.atan2(y, x);
    const phi = Math.acos(Math.max(-1, Math.min(1, z / radius)));
    return { radius, theta, phi };
  }

  /**
   * Converts Spherical coordinates to Cartesian (x, y, z).
   */
  public static sphericalToCartesian(r: number, theta: number, phi: number): CartesianCoordinates3D {
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi)
    };
  }

  /**
   * Great-circle Haversine distance between two latitude/longitude points on a sphere.
   */
  public static haversineDistance(
    lat1Deg: number,
    lon1Deg: number,
    lat2Deg: number,
    lon2Deg: number,
    radius: number = 6371000 // Earth radius in meters
  ): number {
    const dLat = this.degToRad(lat2Deg - lat1Deg);
    const dLon = this.degToRad(lon2Deg - lon1Deg);
    const lat1Rad = this.degToRad(lat1Deg);
    const lat2Rad = this.degToRad(lat2Deg);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return radius * c;
  }
}

