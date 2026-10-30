/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * SAFFRON ROSE - UNIT II: KINEMATICS & QUADRUPED GAIT MECHANICS
 * ============================================================================
 * Rigorous computational kinematics, quadruped trot footfall timing matrix,
 * 4th-order Runge-Kutta (RK4) spring-damper suspension integration, and
 * dynamic Zero-Moment Point (ZMP) stability envelope for Saffron Rose.
 *
 * Biomechanical Specifications:
 * - Leg Length (Hip/Shoulder to Paw): 35.5 inches (0.9017 m)
 * - Trot Cadence: Symmetrical diagonal gait (Left-Fore + Right-Hind, Right-Fore + Left-Hind)
 * - Nominal Duty Factor (beta): 0.58
 * - Target Trot Velocity Range: 2.2 m/s to 4.5 m/s
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

export const SAFFRON_ROSE_KINEMATIC_CONSTANTS: QuadrupedKinematicConstants = {
  massKg: 1970.0,
  legLengthMeters: 0.9017,
  nominalStrideFrequencyHz: 1.45,
  dutyFactor: 0.58,
  suspensionSpringConstantK: 38500.0,
  suspensionDampingConstantC: 4200.0,
  supportPolygonHalfWidthM: 0.6096,  // Half of 48-inch body width
  supportPolygonHalfLengthM: 1.2065  // Half of 95-inch body length
};

/**
 * Computes the dimensionless Froude number for quadruped locomotion.
 * Fr = v^2 / (g * L0)
 * Trotting typically dominates within the Froude range 0.5 < Fr < 2.5.
 */
export function calculateFroudeNumber(velocityMs: number, legLengthMeters: number = 0.9017): number {
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
  massKg: number = SAFFRON_ROSE_KINEMATIC_CONSTANTS.massKg,
  k: number = SAFFRON_ROSE_KINEMATIC_CONSTANTS.suspensionSpringConstantK,
  c: number = SAFFRON_ROSE_KINEMATIC_CONSTANTS.suspensionDampingConstantC
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
 * Saffron Rose uses an ipsilateral/diagonal trot synchronization with 50% diagonal phase shift:
 * - Pair A: Left Fore (LF) + Right Hind (RH) contact [0.0 <= phi < 0.58]
 * - Pair B: Right Fore (RF) + Left Hind (LH) contact [0.50 <= phi < 1.08 mod 1.0]
 */
export function evaluateSaffronGaitState(
  timeSeconds: number,
  forwardVelocityMs: number = 3.2,
  constants: QuadrupedKinematicConstants = SAFFRON_ROSE_KINEMATIC_CONSTANTS
): GaitPhaseState {
  const g = 9.80665;
  const cyclePeriod = 1.0 / constants.nominalStrideFrequencyHz;
  const strideFraction = (timeSeconds % cyclePeriod) / cyclePeriod;

  // Stance phase durations based on duty factor beta = 0.58
  const beta = constants.dutyFactor;
  
  // Diagonal Pair 1: LF & RH
  const pair1Active = strideFraction < beta;
  // Diagonal Pair 2: RF & LH (phase-shifted by 0.50)
  const pair2Fraction = (strideFraction + 0.50) % 1.0;
  const pair2Active = pair2Fraction < beta;

  const lf = pair1Active;
  const rh = pair1Active;
  const rf = pair2Active;
  const lh = pair2Active;

  // Total active limbs supporting mass
  const activeLimbsCount = (lf ? 1 : 0) + (rh ? 1 : 0) + (rf ? 1 : 0) + (lh ? 1 : 0);
  const effectiveCount = Math.max(1, activeLimbsCount);

  // Ground reaction force oscillates around static weight (m * g) with sinusoidal peak in mid-stance
  const staticWeight = constants.massKg * g;
  const dynamicHarmonic = Math.sin(strideFraction * 2.0 * Math.PI);
  const verticalGroundReactionForceN = staticWeight * (1.0 + 0.22 * dynamicHarmonic);

  // Zero-Moment Point (ZMP) calculations:
  // x_ZMP = x_CoM - (z_ddot_x / (z_ddot + g)) * z_CoM
  // Saffron maintains lateral sway +/- 0.045m and longitudinal oscillation +/- 0.065m
  const zmpX = 0.045 * Math.sin(strideFraction * 2.0 * Math.PI);
  const zmpZ = 0.065 * Math.cos(strideFraction * 2.0 * Math.PI);

  // Distance to boundary of support polygon:
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
  SAFFRON_ROSE_KINEMATIC_CONSTANTS,
  calculateFroudeNumber,
  integrateSuspensionRK4,
  evaluateSaffronGaitState
};
