/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SkeletalGaitKinematics3D — Allometric Quadruped Stride, Spine Flex, and Tail Counterbalance.
 */

import { SpatialStabilizer3D } from "./SpatialStabilizer3D";

export interface QuadrupedPoseAngles {
  frontLeftSwingRad: number;
  frontRightSwingRad: number;
  hindLeftSwingRad: number;
  hindRightSwingRad: number;
  spinePitchRad: number;
  tailSwayRad: number;
  saddleBounceM: number;
}

export class SkeletalGaitKinematics3D {
  public static computeQuadrupedPose(
    gaitPhaseRad: number,
    speedRatio: number,
    shoulderHeightMeters: number = 1.6
  ): QuadrupedPoseAngles {
    const phase = SpatialStabilizer3D.sanitizeFinite(gaitPhaseRad, 0);
    const speed = SpatialStabilizer3D.clampFinite(Math.abs(speedRatio), 0, 2.5, 0);
    const scaleFactor = SpatialStabilizer3D.clampFinite(1.6 / Math.max(0.5, shoulderHeightMeters), 0.5, 2.0, 1.0);
    const amplitude = 0.42 * Math.min(1.0, speed) * scaleFactor;

    // Diagonal trot / gallop coupling
    const gallopShift = speed > 1.1 ? 0.45 : Math.PI;
    return {
      frontLeftSwingRad: Math.sin(phase) * amplitude,
      frontRightSwingRad: Math.sin(phase + Math.PI) * amplitude,
      hindLeftSwingRad: Math.sin(phase + gallopShift) * amplitude,
      hindRightSwingRad: Math.sin(phase + gallopShift + Math.PI) * amplitude,
      spinePitchRad: Math.cos(phase * 2.0) * 0.08 * speed,
      tailSwayRad: Math.sin(phase + 0.6) * 0.16 * Math.max(0.25, speed),
      saddleBounceM: Math.abs(Math.sin(phase)) * 0.06 * speed
    };
  }
}
