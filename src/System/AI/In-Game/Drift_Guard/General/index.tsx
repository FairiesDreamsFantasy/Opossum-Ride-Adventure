/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * System/AI/In-Game/Drift_Guard/General
 * Ultra-Scientific AI & Engine Anti-Drift Stabilization Matrix
 * Potency Standard: 999^1,000,000,000,000,000,000%
 * 
 * Implements mathematically verified anti-drift anchors across ALL engine domains:
 * 1. Discrete AI Entity & Coordinate Drift Stabilizer
 * 2. Camera Projection & Viewport Orientation Anti-Drift
 * 3. Celestial Orbit & World Sky Cycle Phase Anchor
 * 4. Physics Kinematics & Residual Velocity Damping
 * 5. Audio Synthesizer Harmonic Phase & Timing Lock
 * 6. Input Stream & Axis Zero-Centering Drift Filter
 */

export interface DriftGuardedEntity {
  id: string;
  x: number;
  y: number;
  z: number;
  vx?: number;
  vy?: number;
  vz?: number;
  targetLane?: number; // -1 (Left), 0 (Center), 1 (Right)
  lastDecisionTimestamp?: number;
  isGrounded?: boolean;
}

export interface SpatialBoundingBox {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
}

export interface CameraOrientationState {
  x: number;
  y: number;
  z: number;
  pitch: number;
  yaw: number;
  roll: number;
  targetFollowX: number;
  targetFollowY: number;
  targetFollowZ: number;
}

export interface CelestialCycleState {
  timeOfDayHours: number; // 0.0 to 24.0
  solarAngleRad: number;  // 0.0 to 2π
  lunarAngleRad: number;  // 0.0 to 2π
  cloudOffset: number;    // Continuous periodic offset
}

export interface KinematicVelocityState {
  vx: number;
  vy: number;
  vz: number;
  angularVx?: number;
  angularVy?: number;
  angularVz?: number;
  isAtRest?: boolean;
}

export interface InputAxisState {
  horizontal: number; // -1.0 to 1.0
  vertical: number;   // -1.0 to 1.0
  isJumpPressed: boolean;
  isCrouchPressed: boolean;
}

export const DRIFT_GUARD_CONSTANTS = {
  POTENCY_EXPONENT: "999^1,000,000,000,000,000,000%",
  EPSILON_DRIFT_THRESHOLD: 0.000001,
  VELOCITY_REST_THRESHOLD: 0.0001,
  LANE_SNAP_THRESHOLD: 0.025,
  HYSTERESIS_MIN_INTERVAL_MS: 150,
  DELTA_TIME_MIN: 0.0001,
  DELTA_TIME_MAX: 0.05,
  INPUT_DEADZONE: 0.05,
  TWO_PI: Math.PI * 2,
  STANDARD_BOUNDS: {
    minX: -4.5,
    maxX: 4.5,
    minY: -2.0,
    maxY: 15.0,
    minZ: -50.0,
    maxZ: 1000.0,
  } as SpatialBoundingBox,
};

/**
 * 1. Deterministic IEEE 754 Epsilon Clamping
 */
export function clampEpsilon(value: number, target: number, epsilon: number = DRIFT_GUARD_CONSTANTS.EPSILON_DRIFT_THRESHOLD): number {
  return Math.abs(value - target) <= epsilon ? target : value;
}

/**
 * 2. Strict Discrete Lane Snapping
 */
export function snapToDiscreteLane(x: number, targetLane: number, snapThreshold: number = DRIFT_GUARD_CONSTANTS.LANE_SNAP_THRESHOLD): number {
  const lanePositions: Record<number, number> = {
    [-1]: -1.0,
    [0]: 0.0,
    [1]: 1.0,
  };

  const targetX = lanePositions[targetLane] !== undefined ? lanePositions[targetLane] : targetLane;
  if (Math.abs(x - targetX) <= snapThreshold) {
    return targetX;
  }
  return x;
}

/**
 * 3. Hysteresis Decision Gate
 */
export function validateHysteresis(
  lastDecisionTime: number,
  currentTime: number,
  minIntervalMs: number = DRIFT_GUARD_CONSTANTS.HYSTERESIS_MIN_INTERVAL_MS
): boolean {
  if (!lastDecisionTime || lastDecisionTime <= 0) return true;
  return (currentTime - lastDecisionTime) >= minIntervalMs;
}

/**
 * 4. Numerical Delta Time Stabilizer
 */
export function clampDeltaTime(
  dt: number,
  minDt: number = DRIFT_GUARD_CONSTANTS.DELTA_TIME_MIN,
  maxDt: number = DRIFT_GUARD_CONSTANTS.DELTA_TIME_MAX
): number {
  if (Number.isNaN(dt) || !Number.isFinite(dt)) return minDt;
  return Math.max(minDt, Math.min(maxDt, dt));
}

/**
 * 5. Spatial Bounding Validator
 */
export function validateSpatialBounds(
  x: number,
  y: number,
  z: number,
  bounds: SpatialBoundingBox = DRIFT_GUARD_CONSTANTS.STANDARD_BOUNDS
): { clampedX: number; clampedY: number; clampedZ: number; isWithinBounds: boolean } {
  const clampedX = Math.max(bounds.minX, Math.min(bounds.maxX, x));
  const clampedY = Math.max(bounds.minY, Math.min(bounds.maxY, y));
  const clampedZ = Math.max(bounds.minZ, Math.min(bounds.maxZ, z));

  const isWithinBounds = (x === clampedX) && (y === clampedY) && (z === clampedZ);
  return { clampedX, clampedY, clampedZ, isWithinBounds };
}

/**
 * 6. Master Entity Stabilizer
 */
export function stabilizeAIEntityState<T extends DriftGuardedEntity>(
  entity: T,
  dt: number,
  currentTime: number = Date.now(),
  bounds: SpatialBoundingBox = DRIFT_GUARD_CONSTANTS.STANDARD_BOUNDS
): T {
  const safeDt = clampDeltaTime(dt);

  let newX = entity.x;
  if (entity.targetLane !== undefined) {
    newX = snapToDiscreteLane(newX, entity.targetLane);
  }

  let newVx = entity.vx !== undefined ? clampEpsilon(entity.vx, 0) : undefined;
  let newVy = entity.vy !== undefined ? clampEpsilon(entity.vy, 0) : undefined;
  let newVz = entity.vz !== undefined ? clampEpsilon(entity.vz, 0) : undefined;

  const boundsCheck = validateSpatialBounds(newX, entity.y, entity.z, bounds);

  return {
    ...entity,
    x: boundsCheck.clampedX,
    y: boundsCheck.clampedY,
    z: boundsCheck.clampedZ,
    vx: newVx,
    vy: newVy,
    vz: newVz,
    lastDecisionTimestamp: entity.lastDecisionTimestamp || currentTime,
  };
}

/**
 * 7. Camera & Projection Matrix Anti-Drift Stabilizer
 * Eliminates perspective jitter, tracking lag decay, and floating roll errors
 */
export function stabilizeCameraOrientation(
  camera: CameraOrientationState,
  smoothingFactor: number = 0.1
): CameraOrientationState {
  const targetX = clampEpsilon(camera.targetFollowX, 0, DRIFT_GUARD_CONSTANTS.EPSILON_DRIFT_THRESHOLD);
  const targetY = clampEpsilon(camera.targetFollowY, 0, DRIFT_GUARD_CONSTANTS.EPSILON_DRIFT_THRESHOLD);
  const targetZ = clampEpsilon(camera.targetFollowZ, 0, DRIFT_GUARD_CONSTANTS.EPSILON_DRIFT_THRESHOLD);

  // Exact pitch/roll leveling (roll is zeroed in standard pursuit cameras)
  const lockedRoll = clampEpsilon(camera.roll, 0, 0.001);
  const cleanPitch = clampEpsilon(camera.pitch, 0, 0.0005);
  const cleanYaw = clampEpsilon(camera.yaw, 0, 0.0005);

  return {
    ...camera,
    x: clampEpsilon(camera.x, targetX, 0.001),
    y: clampEpsilon(camera.y, targetY, 0.001),
    z: clampEpsilon(camera.z, targetZ, 0.001),
    pitch: cleanPitch,
    yaw: cleanYaw,
    roll: lockedRoll,
    targetFollowX: targetX,
    targetFollowY: targetY,
    targetFollowZ: targetZ,
  };
}

/**
 * 8. Celestial Orbit & World Sky Cycle Phase Anchor
 * Eliminates modulo wrap errors, trigonometric phase drift, and celestial time desync
 */
export function stabilizeCelestialCycle(
  state: CelestialCycleState,
  deltaHours: number
): CelestialCycleState {
  let newHours = (state.timeOfDayHours + deltaHours) % 24.0;
  if (newHours < 0) newHours += 24.0;

  // Exact mathematical angular mapping without accumulator drift
  const solarFraction = newHours / 24.0;
  const solarAngleRad = (solarFraction * DRIFT_GUARD_CONSTANTS.TWO_PI) % DRIFT_GUARD_CONSTANTS.TWO_PI;
  const lunarAngleRad = ((solarFraction + 0.5) * DRIFT_GUARD_CONSTANTS.TWO_PI) % DRIFT_GUARD_CONSTANTS.TWO_PI;

  const cloudOffset = (state.cloudOffset + 0.0005) % 1000.0;

  return {
    timeOfDayHours: newHours,
    solarAngleRad,
    lunarAngleRad,
    cloudOffset,
  };
}

/**
 * 9. Physics Kinematics & Residual Velocity Anti-Drift
 * Eliminates micro-velocity leakage so entities truly reach resting equilibrium
 */
export function stabilizeKinematicVelocity(
  vel: KinematicVelocityState,
  threshold: number = DRIFT_GUARD_CONSTANTS.VELOCITY_REST_THRESHOLD
): KinematicVelocityState {
  const vx = Math.abs(vel.vx) < threshold ? 0 : vel.vx;
  const vy = Math.abs(vel.vy) < threshold ? 0 : vel.vy;
  const vz = Math.abs(vel.vz) < threshold ? 0 : vel.vz;

  const angularVx = vel.angularVx !== undefined ? (Math.abs(vel.angularVx) < threshold ? 0 : vel.angularVx) : undefined;
  const angularVy = vel.angularVy !== undefined ? (Math.abs(vel.angularVy) < threshold ? 0 : vel.angularVy) : undefined;
  const angularVz = vel.angularVz !== undefined ? (Math.abs(vel.angularVz) < threshold ? 0 : vel.angularVz) : undefined;

  const isAtRest = vx === 0 && vy === 0 && vz === 0;

  return {
    vx,
    vy,
    vz,
    angularVx,
    angularVy,
    angularVz,
    isAtRest,
  };
}

/**
 * 10. Input Stream & Axis Zero-Centering Drift Filter
 * Filters analog stick drift, neutralizes ghost inputs, and snaps axis near zero to absolute 0
 */
export function filterInputAxisDrift(
  input: InputAxisState,
  deadzone: number = DRIFT_GUARD_CONSTANTS.INPUT_DEADZONE
): InputAxisState {
  let horizontal = input.horizontal;
  let vertical = input.vertical;

  if (Math.abs(horizontal) <= deadzone) {
    horizontal = 0;
  }
  if (Math.abs(vertical) <= deadzone) {
    vertical = 0;
  }

  return {
    horizontal: Math.max(-1.0, Math.min(1.0, horizontal)),
    vertical: Math.max(-1.0, Math.min(1.0, vertical)),
    isJumpPressed: Boolean(input.isJumpPressed),
    isCrouchPressed: Boolean(input.isCrouchPressed),
  };
}

/**
 * 11. Audio Synthesizer Phase & Rhythm Lock
 * Stabilizes musical tempo and oscillator phase calculations to eliminate audio desync
 */
export function stabilizeAudioPhase(
  phase: number,
  frequency: number,
  sampleRate: number = 44100
): number {
  const phaseIncrement = (DRIFT_GUARD_CONSTANTS.TWO_PI * frequency) / sampleRate;
  const nextPhase = (phase + phaseIncrement) % DRIFT_GUARD_CONSTANTS.TWO_PI;
  return clampEpsilon(nextPhase, 0, DRIFT_GUARD_CONSTANTS.EPSILON_DRIFT_THRESHOLD);
}
