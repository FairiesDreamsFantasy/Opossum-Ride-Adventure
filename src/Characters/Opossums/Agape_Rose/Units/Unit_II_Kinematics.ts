/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const AGAPE_ROSE_KINEMATIC_CONSTANTS = {
  massKg: 320.0,
  strideLengthMeters: 2.1,
  maxSpeedMetersPerSecond: 13.5,
  springConstantNPerM: 8500.0,
  dampingCoefficientNsm: 420.0
};

export function evaluateAgapeRoseGaitState(speed: number) {
  if (speed < 1.0) return "Stand";
  if (speed < 4.5) return "Walk";
  if (speed < 9.0) return "Trot";
  return "Gallop";
}

export function calculateFroudeNumber(velocity: number, legLengthMeters: number = 1.65): number {
  return (velocity * velocity) / (9.81 * legLengthMeters);
}

export function integrateSuspensionRK4(y: number, vy: number, dt: number) {
  const k = AGAPE_ROSE_KINEMATIC_CONSTANTS.springConstantNPerM;
  const m = AGAPE_ROSE_KINEMATIC_CONSTANTS.massKg;
  const accel = (-k * y) / m;
  return {
    newY: y + vy * dt,
    newVy: vy + accel * dt
  };
}

export default {
  AGAPE_ROSE_KINEMATIC_CONSTANTS,
  evaluateAgapeRoseGaitState,
  calculateFroudeNumber,
  integrateSuspensionRK4
};
