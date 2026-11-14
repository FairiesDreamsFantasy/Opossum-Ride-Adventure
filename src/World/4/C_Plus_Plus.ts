/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class WorldSolarTensorCPP {
  public static computeSunPosition(timeOfDayHours: number, latitudeDeg: number): { azimuth: number; elevation: number } {
    const latRad = (latitudeDeg * Math.PI) / 180;
    const hourAngle = ((timeOfDayHours - 12) / 12) * Math.PI;
    const elevation = Math.asin(Math.sin(latRad) * Math.sin(0.409) + Math.cos(latRad) * Math.cos(0.409) * Math.cos(hourAngle));
    const azimuth = Math.atan2(-Math.sin(hourAngle), Math.tan(0.409) * Math.cos(latRad) - Math.sin(latRad) * Math.cos(hourAngle));
    return { azimuth, elevation: (elevation * 180) / Math.PI };
  }
}
