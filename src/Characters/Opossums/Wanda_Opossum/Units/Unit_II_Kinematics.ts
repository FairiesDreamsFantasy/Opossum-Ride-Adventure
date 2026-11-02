/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * WANDA OPOSSUM - UNIT II: KINEMATICS & QUADRUPED GAIT MECHANICS
 * ============================================================================
 * Rigorous computational kinematics, quadruped trot footfall timing matrix,
 * 4th-order Runge-Kutta (RK4) spring-damper suspension integration, and
 * dynamic Zero-Moment Point (ZMP) stability envelope for Wanda Opossum.
 */

export interface LimbSuspensionState {
  displacement: number;
  velocity: number;
}

export interface GaitPhaseState {
  timeSeconds: number;
  strideFraction: number;
  leftForeContact: boolean;
  rightForeContact: boolean;
  leftHindContact: boolean;
  rightHindContact: boolean;
  verticalGroundReactionForceN: number;
  zmpX: number;
  zmpZ: number;
  dynamicStabilityMargin: number;
}

export interface QuadrupedKinematicConstants {
  massKg: number;
  legLengthMeters: number;
  nominalStrideFrequencyHz: number;
  dutyFactor: number;
  suspensionSpringConstantK: number;
  suspensionDampingConstantC: number;
  supportPolygonHalfWidthM: number;
  supportPolygonHalfLengthM: number;
}

export const WANDA_OPOSSUM_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  massKg: 1186.0,
  legLengthMeters: 0.8001,
  nominalStrideFrequencyHz: 1.45,
  dutyFactor: 0.58,
  suspensionSpringConstantK: 35700.0,
  suspensionDampingConstantC: 3950.0,
  supportPolygonHalfWidthM: 0.4572,
  supportPolygonHalfLengthM: 1.0668
};

export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 0.8001): number {
  const g = 9.80665;
  return Math.pow(velocityMs, 2) / (g * legLengthMeters);
}

export function integrateSuspensionRK4(
  initialState: LimbSuspensionState,
  externalForceN: number,
  dt: number,
  massKg: number = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.massKg,
  k: number = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.suspensionDampingConstantC
): LimbSuspensionState {
  const acceleration = (y: number, v: number): number => {
    return (externalForceN - c * v - k * y) / massKg;
  };

  const k1_y = initialState.velocity;
  const k1_v = acceleration(initialState.displacement, initialState.velocity);

  const y2 = initialState.displacement + 0.5 * dt * k1_y;
  const v2 = initialState.velocity + 0.5 * dt * k1_v;
  const k2_y = v2;
  const k2_v = acceleration(y2, v2);

  const y3 = initialState.displacement + 0.5 * dt * k2_y;
  const v3 = initialState.velocity + 0.5 * dt * k2_v;
  const k3_y = v3;
  const k3_v = acceleration(y3, v3);

  const y4 = initialState.displacement + dt * k3_y;
  const v4 = initialState.velocity + dt * k3_v;
  const k4_y = v4;
  const k4_v = acceleration(y4, v4);

  const nextDisplacement = initialState.displacement + (dt / 6.0) * (k1_y + 2.0 * k2_y + 2.0 * k3_y + k4_y);
  const nextVelocity = initialState.velocity + (dt / 6.0) * (k1_v + 2.0 * k2_v + 2.0 * k3_v + k4_v);

  return { displacement: nextDisplacement, velocity: nextVelocity };
}

export function evaluateWandaOpossumGaitState(timeSeconds: number, velocityMs: number): GaitPhaseState {
  const freq = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.nominalStrideFrequencyHz;
  const strideFraction = (timeSeconds * freq) % 1.0;
  const beta = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.dutyFactor;

  const leftForeContact = strideFraction < beta;
  const rightForeContact = (strideFraction >= 0.5) && (strideFraction < (0.5 + beta) % 1.0);
  const leftHindContact = (strideFraction >= 0.5) && (strideFraction < (0.5 + beta) % 1.0);
  const rightHindContact = strideFraction < beta;

  const g = 9.80665;
  const baseForce = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.massKg * g;
  const oscillation = Math.sin(timeSeconds * freq * 2.0 * Math.PI) * 175.0 * (velocityMs + 0.5);
  const verticalGroundReactionForceN = Math.max(0.0, baseForce + oscillation);

  const zmpX = Math.sin(timeSeconds * freq * 2.0 * Math.PI) * 0.04;
  const zmpZ = Math.cos(timeSeconds * freq * 2.0 * Math.PI) * 0.08;

  const dynamicStabilityMargin = WANDA_OPOSSUM_KINEMATIC_CONSTANTS.supportPolygonHalfWidthM - Math.abs(zmpX);

  return {
    timeSeconds,
    strideFraction,
    leftForeContact,
    rightForeContact,
    leftHindContact,
    rightHindContact,
    verticalGroundReactionForceN,
    zmpX,
    zmpZ,
    dynamicStabilityMargin
  };
}

export default WANDA_OPOSSUM_KINEMATIC_CONSTANTS;
