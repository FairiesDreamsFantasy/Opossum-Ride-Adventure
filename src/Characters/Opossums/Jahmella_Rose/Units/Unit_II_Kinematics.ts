/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * JAHMELLA ROSE - UNIT II: KINEMATICS & QUADRUPED GAIT MECHANICS
 * ============================================================================
 * Computational kinematics, quadruped trot footfall timing matrix,
 * 4th-order Runge-Kutta (RK4) spring-damper suspension integration, and
 * dynamic Zero-Moment Point (ZMP) stability envelope for Jahmella Rose.
 *
 * Biomechanical Specifications:
 * - Leg Length (Hip/Shoulder to Paw): 36.0 inches (0.9144 m)
 * - Trot Cadence: High-shoulder commanding diagonal gait (LF + RH, RF + LH)
 * - Nominal Duty Factor (beta): 0.59
 * - Target Trot Velocity Range: 2.3 m/s to 4.8 m/s
 * - Gravity Constant g: 9.80665 m/s^2
 */

export interface LimbSuspensionState {
  displacement: number; // Vertical deflection from rest (meters)
  velocity: number;     // Vertical velocity of deflection (m/s)
}

export interface GaitPhaseState {
  timeSeconds: number;
  strideFraction: number; // [0.0, 1.0)
  leftForeContact: boolean;
  rightForeContact: boolean;
  leftHindContact: boolean;
  rightHindContact: boolean;
  verticalGroundReactionForceN: number;
  zmpX: number; // Lateral zero-moment point offset (meters)
  zmpZ: number; // Longitudinal zero-moment point offset (meters)
  dynamicStabilityMargin: number; // Distance from ZMP to support polygon edge (meters)
}

export interface QuadrupedKinematicConstants {
  massKg: number;
  legLengthMeters: number;
  nominalStrideFrequencyHz: number;
  dutyFactor: number;
  suspensionSpringConstantK: number; // N/m
  suspensionDampingConstantC: number; // N*s/m
  supportPolygonHalfWidthM: number;
  supportPolygonHalfLengthM: number;
}

export const JAHMELLA_ROSE_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  massKg: 1742.6,
  legLengthMeters: 0.9144,
  nominalStrideFrequencyHz: 1.38,
  dutyFactor: 0.59,
  suspensionSpringConstantK: 37200.0,
  suspensionDampingConstantC: 4100.0,
  supportPolygonHalfWidthM: 0.5080,  // Half of 40-inch body width
  supportPolygonHalfLengthM: 1.26365 // Half of 99.5-inch body length
};

/**
 * Computes the dimensionless Froude number for quadruped locomotion.
 * Fr = v^2 / (g * L0)
 */
export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 0.9144): number {
  const g = 9.80665;
  return Math.pow(velocityMs, 2) / (g * legLengthMeters);
}

/**
 * 4th-Order Runge-Kutta (RK4) numerical integrator for damped spring-mass suspension
 * under vertical shock acceleration during paw ground contact:
 * d^2 y / dt^2 = (F_ext - c * v - k * y) / m
 */
export function integrateSuspensionRK4(
  initialState: LimbSuspensionState,
  externalForceN: number,
  dt: number,
  massKg: number = JAHMELLA_ROSE_KINEMATIC_CONSTANTS.massKg,
  k: number = JAHMELLA_ROSE_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = JAHMELLA_ROSE_KINEMATIC_CONSTANTS.suspensionDampingConstantC
): LimbSuspensionState {
  const acceleration = (y: number, v: number): number => {
    return (externalForceN - c * v - k * y) / massKg;
  };

  // Stage 1
  const k1_y = initialState.velocity;
  const k1_v = acceleration(initialState.displacement, initialState.velocity);

  // Stage 2
  const y2 = initialState.displacement + 0.5 * dt * k1_y;
  const v2 = initialState.velocity + 0.5 * dt * k1_v;
  const k2_y = v2;
  const k2_v = acceleration(y2, v2);

  // Stage 3
  const y3 = initialState.displacement + 0.5 * dt * k2_y;
  const v3 = initialState.velocity + 0.5 * dt * k2_v;
  const k3_y = v3;
  const k3_v = acceleration(y3, v3);

  // Stage 4
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

/**
 * Evaluates instantaneous gait phase, diagonal limb contacts, and Zero-Moment Point (ZMP).
 * Jahmella Rose exhibits a commanding stride with elongated forward reach:
 */
export function evaluateJahmellaGaitState(
  timeSeconds: number,
  forwardVelocityMs: number = 3.4,
  constants: QuadrupedKinematicConstants = JAHMELLA_ROSE_KINEMATIC_CONSTANTS
): GaitPhaseState {
  const g = 9.80665;
  const cyclePeriod = 1.0 / constants.nominalStrideFrequencyHz;
  const strideFraction = (timeSeconds % cyclePeriod) / cyclePeriod;

  const beta = constants.dutyFactor;
  
  // Diagonal Pair 1: LF & RH
  const pair1Active = strideFraction < beta;
  // Diagonal Pair 2: RF & LH
  const pair2Fraction = (strideFraction + 0.50) % 1.0;
  const pair2Active = pair2Fraction < beta;

  const lf = pair1Active;
  const rh = pair1Active;
  const rf = pair2Active;
  const lh = pair2Active;

  const staticWeight = constants.massKg * g;
  const dynamicHarmonic = Math.sin(strideFraction * 2.0 * Math.PI);
  const verticalGroundReactionForceN = staticWeight * (1.0 + 0.20 * dynamicHarmonic);

  // ZMP calculations:
  // Jahmella's narrower 40" body width results in tighter lateral sway (+/- 0.038m)
  // and extended longitudinal stride oscillation (+/- 0.075m)
  const zmpX = 0.038 * Math.sin(strideFraction * 2.0 * Math.PI);
  const zmpZ = 0.075 * Math.cos(strideFraction * 2.0 * Math.PI);

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
  JAHMELLA_ROSE_KINEMATIC_CONSTANTS,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  evaluateJahmellaGaitState
};
