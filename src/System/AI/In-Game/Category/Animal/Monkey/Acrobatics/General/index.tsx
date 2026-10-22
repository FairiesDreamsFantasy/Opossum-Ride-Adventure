/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MonkeyAcrobaticVector {
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  rotationDegrees: number;
  tailCurlFactor: number;
}

export class MonkeyAcrobaticsEngine {
  /**
   * Mathematical pendulum and ballistic trajectory calculation for swings and flips
   */
  public static computeAcrobaticMotion(
    action: "swing" | "flip" | "climb" | "perch",
    timeSec: number,
    pivotPoint: { x: number; y: number; z: number } = { x: 0, y: 0, z: 120 }
  ): MonkeyAcrobaticVector {
    switch (action) {
      case "swing": {
        // Pendulum harmonics: theta(t) = theta_0 * cos(sqrt(g/L) * t)
        const angularFreq = 3.5; // rad/s
        const amplitudeRad = Math.PI / 3.2; // ~56 degrees
        const currentAngle = amplitudeRad * Math.sin(timeSec * angularFreq);
        const pendulumLength = 48; // inches

        return {
          offsetX: pivotPoint.x + Math.sin(currentAngle) * pendulumLength,
          offsetY: pivotPoint.y,
          offsetZ: pivotPoint.z - Math.cos(currentAngle) * pendulumLength,
          rotationDegrees: (currentAngle * 180) / Math.PI,
          tailCurlFactor: 1.0 + Math.abs(currentAngle) * 0.5
        };
      }

      case "flip": {
        const flipProgress = (timeSec * 2.5) % 1.0;
        const jumpHeight = Math.sin(flipProgress * Math.PI) * 36;
        return {
          offsetX: pivotPoint.x + (flipProgress - 0.5) * 60,
          offsetY: pivotPoint.y,
          offsetZ: pivotPoint.z + jumpHeight,
          rotationDegrees: flipProgress * 360,
          tailCurlFactor: 1.8
        };
      }

      case "climb": {
        const verticalBob = (timeSec * 4.0) % 1.0;
        return {
          offsetX: pivotPoint.x,
          offsetY: pivotPoint.y,
          offsetZ: pivotPoint.z + verticalBob * 20,
          rotationDegrees: Math.sin(timeSec * 8) * 8,
          tailCurlFactor: 0.9
        };
      }

      case "perch":
      default:
        return {
          offsetX: pivotPoint.x,
          offsetY: pivotPoint.y,
          offsetZ: pivotPoint.z,
          rotationDegrees: Math.sin(timeSec * 1.5) * 3.5,
          tailCurlFactor: 1.0
        };
    }
  }
}
