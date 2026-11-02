/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ROXANNE KONE-REYNOLDS - UNIT II: KINEMATICS & QUADRUPED GAIT MECHANICS
 * ============================================================================
 * Computational kinematics, quadruped trot footfall timing matrix,
 * 4th-order Runge-Kutta (RK4) spring-damper suspension integration, and
 * dynamic Zero-Moment Point (ZMP) stability envelope for Roxanne.
 *
 * Biomechanical Specifications:
 * - Leg Length (Hip/Shoulder to Paw): 36.0 inches (0.9144 m)
 * - Trot Cadence: Heavy, authoritative diagonal gait (LF + RH, RF + LH)
 * - Nominal Duty Factor (beta): 0.59
 * - Target Trot Velocity Range: 2.2 m/s to 4.5 m/s
 * - Gravity Constant g: 9.80665 m/s^2
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

export const ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  massKg: 1894.1,
  legLengthMeters: 0.9144,
  nominalStrideFrequencyHz: 1.42,
  dutyFactor: 0.59,
  suspensionSpringConstantK: 39000.0,
  suspensionDampingConstantC: 4300.0,
  supportPolygonHalfWidthM: 0.5715, // Half of 45-inch body width
  supportPolygonHalfLengthM: 1.2192 // Half of 96-inch body length
};

export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 0.9144): number {
  const g = 9.80665;
  return Math.pow(velocityMs, 2) / (g * legLengthMeters);
}

export function integrateSuspensionRK4(
  initialState: LimbSuspensionState,
  externalForceN: number,
  dt: number,
  massKg: number = ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS.massKg,
  k: number = ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS.suspensionDampingConstantC
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

  return {
    displacement: nextDisplacement,
    velocity: nextVelocity
  };
}

export function evaluateRoxanneGaitState(
  timeSeconds: number,
  forwardVelocityMs: number = 3.3,
  constants: QuadrupedKinematicConstants = ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS
): GaitPhaseState {
  const g = 9.80665;
  const cyclePeriod = 1.0 / constants.nominalStrideFrequencyHz;
  const strideFraction = (timeSeconds % cyclePeriod) / cyclePeriod;

  const beta = constants.dutyFactor;
  
  const pair1Active = strideFraction < beta;
  const pair2Fraction = (strideFraction + 0.50) % 1.0;
  const pair2Active = pair2Fraction < beta;

  const lf = pair1Active;
  const rh = pair1Active;
  const rf = pair2Active;
  const lh = pair2Active;

  const staticWeight = constants.massKg * g;
  const dynamicHarmonic = Math.sin(strideFraction * 2.0 * Math.PI);
  const verticalGroundReactionForceN = staticWeight * (1.0 + 0.22 * dynamicHarmonic);

  // Broad, heavy authoritative stride:
  const zmpX = 0.044 * Math.sin(strideFraction * 2.0 * Math.PI);
  const zmpZ = 0.068 * Math.cos(strideFraction * 2.0 * Math.PI);

  const lateralMargin = constants.supportPolygonHalfWidthM - Math.abs(zmpX);
  const longitudinalMargin = constants.supportPolygonHalfLengthM - Math.abs(zmpZ);
  const dynamicStabilityMargin = Math.max(0.0, Math.min(lateralMargin, longitudinalMargin));

  return {
    timeSeconds,
    strideFraction,
    leftForeContact: lf,
    rightForeContact: rf,
    leftHindContact: lh,
    rightHindContact: rh,
    verticalGroundReactionForceN,
    zmpX,
    zmpZ,
    dynamicStabilityMargin
  };
}

export default {
  ROXANNE_KONE_REYNOLDS_KINEMATIC_CONSTANTS,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  evaluateRoxanneGaitState
};
