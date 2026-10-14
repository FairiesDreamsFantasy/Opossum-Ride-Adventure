/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class PigMovementEngine {
  public static computeTrotTrajectory(timeSec: number, baseSpeed: number = 4.5) {
    const trotCadence = 3.2; // steps/sec
    const verticalBob = Math.sin(timeSec * trotCadence * Math.PI * 2) * 1.8;
    const lateralSway = Math.cos(timeSec * trotCadence * Math.PI) * 0.9;
    return {
      verticalBob,
      lateralSway,
      speedMps: baseSpeed
    };
  }
}
