/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * ARDEN-ROSIE KONE-REYNOLDS - UNIT II: KINEMATICS & QUADRUPED GAIT MECHANICS
 * ============================================================================
 * Computational kinematics, quadruped trot footfall timing matrix,
 * 4th-order Runge-Kutta (RK4) spring-damper suspension integration, and
 * dynamic Zero-Moment Point (ZMP) stability envelope for Arden-Rosie.
 *
 * Biomechanical Specifications:
 * - Leg Length (Hip/Shoulder to Paw): 30.75 inches (0.78105 m)
 * - Trot Cadence: High-agility rapid diagonal gait (LF + RH, RF + LH)
 * - Nominal Duty Factor (beta): 0.58
 * - Target Trot Velocity Range: 2.2 m/s to 4.6 m/s
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

export const ARDEN_ROSIE_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  massKg: 1109.0,
  legLengthMeters: 0.78105,
  nominalStrideFrequencyHz: 1.56,
  dutyFactor: 0.58,
  suspensionSpringConstantK: 32000.0,
  suspensionDampingConstantC: 3600.0,
  supportPolygonHalfWidthM: 0.4826, // Half of 38-inch body width
  supportPolygonHalfLengthM: 0.9906 // Half of 78-inch body length
};

export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 0.78105): number {
  const g = 9.80665;
  return Math.pow(velocityMs, 2) / (g * legLengthMeters);
}

export function integrateSuspensionRK4(
  initialState: LimbSuspensionState,
  externalForceN: number,
  dt: number,
  massKg: number = ARDEN_ROSIE_KINEMATIC_CONSTANTS.massKg,
  k: number = ARDEN_ROSIE_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = ARDEN_ROSIE_KINEMATIC_CONSTANTS.suspensionDampingConstantC
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

export function evaluateArdenRosieGaitState(
  timeSeconds: number,
  forwardVelocityMs: number = 3.2,
  constants: QuadrupedKinematicConstants = ARDEN_ROSIE_KINEMATIC_CONSTANTS
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

  // Agile, tight turning radius:
  const zmpX = 0.035 * Math.sin(strideFraction * 2.0 * Math.PI);
  const zmpZ = 0.052 * Math.cos(strideFraction * 2.0 * Math.PI);

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
  ARDEN_ROSIE_KINEMATIC_CONSTANTS,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  evaluateArdenRosieGaitState
};
