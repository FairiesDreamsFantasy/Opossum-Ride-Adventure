/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * System/AI/In-Game/Drift_Guard
 * Universal In-Game & Engine Anti-Drift Stabilization Matrix
 * Potency Standard: 999^1,000,000,000,000,000,000%
 */

export * from "./General";

import {
  DRIFT_GUARD_CONSTANTS,
  clampEpsilon,
  snapToDiscreteLane,
  validateHysteresis,
  clampDeltaTime,
  validateSpatialBounds,
  stabilizeAIEntityState,
  stabilizeCameraOrientation,
  stabilizeCelestialCycle,
  stabilizeKinematicVelocity,
  filterInputAxisDrift,
  stabilizeAudioPhase,
  type DriftGuardedEntity,
  type SpatialBoundingBox,
  type CameraOrientationState,
  type CelestialCycleState,
  type KinematicVelocityState,
  type InputAxisState,
} from "./General";

export const InGameDriftGuard = {
  version: "2.0.0-universal-engine-matrix",
  potency: DRIFT_GUARD_CONSTANTS.POTENCY_EXPONENT,
  constants: DRIFT_GUARD_CONSTANTS,
  // Core AI & Geometry
  clampEpsilon,
  snapToDiscreteLane,
  validateHysteresis,
  clampDeltaTime,
  validateSpatialBounds,
  stabilizeAIEntityState,
  // Universal Subsystems
  stabilizeCameraOrientation,
  stabilizeCelestialCycle,
  stabilizeKinematicVelocity,
  filterInputAxisDrift,
  stabilizeAudioPhase,
};
