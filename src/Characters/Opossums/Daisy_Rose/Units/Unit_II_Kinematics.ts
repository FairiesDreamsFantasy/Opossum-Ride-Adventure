/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuadrupedKinematicConstants {
  trotFrequencyHz: number;
  dutyFactor: number;
  strideLengthMeters: number;
  massKg: number;
  suspensionSpringConstantK: number;
  suspensionDampingConstantC: number;
}

export const DAISY_ROSE_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  trotFrequencyHz: 1.58,
  dutyFactor: 0.58,
  strideLengthMeters: 2.88,
  massKg: 198.5,
  suspensionSpringConstantK: 36200.0,
  suspensionDampingConstantC: 1880.0
};

export function evaluateDaisyGaitState(timeSeconds: number) {
  const phase = (timeSeconds * DAISY_ROSE_KINEMATIC_CONSTANTS.trotFrequencyHz * 2 * Math.PI) % (2 * Math.PI);
  const verticalDisplacementMeters = 0.042 * Math.sin(phase);
  const pitchAngleRadians = 0.022 * Math.cos(phase);
  return { phase, verticalDisplacementMeters, pitchAngleRadians };
}

export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 1.854): number {
  const g = 9.80665;
  return (velocityMs * velocityMs) / (g * legLengthMeters);
}

export function integrateSuspensionRK4(
  y: number,
  v: number,
  dt: number,
  massKg: number = DAISY_ROSE_KINEMATIC_CONSTANTS.massKg,
  k: number = DAISY_ROSE_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = DAISY_ROSE_KINEMATIC_CONSTANTS.suspensionDampingConstantC
) {
  const f = (yVal: number, vVal: number) => (-k * yVal - c * vVal) / massKg;

  const k1v = f(y, v);
  const k1y = v;

  const k2v = f(y + 0.5 * dt * k1y, v + 0.5 * dt * k1v);
  const k2y = v + 0.5 * dt * k1v;

  const k3v = f(y + 0.5 * dt * k2y, v + 0.5 * dt * k2v);
  const k3y = v + 0.5 * dt * k2v;

  const k4v = f(y + dt * k3y, v + dt * k3v);
  const k4y = v + dt * k3v;

  const nextY = y + (dt / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
  const nextV = v + (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);

  return { nextY, nextV };
}

export default DAISY_ROSE_KINEMATIC_CONSTANTS;
