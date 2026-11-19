/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FeralPigBehaviorState } from "../../Behaviors";
import { isWildernessPlaceId } from "../../../../Accessibility/Narration/Arena/Wilderness";

export interface ArenaNavigationBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  arenaType: "garden" | "cave" | "orchard" | "farm" | "trail";
}

export interface CourseArenaEnvelope {
  minLateralX: number;
  maxLateralX: number;
  minCourseZ: number;
  maxCourseZ: number;
  allowOutsidePath: boolean;
}

export class FeralPigNavigator {
  /**
   * Computes true course lateral & longitudinal bounds based on arena geometry.
   * Wilderness arenas allow feral pigs to roam freely outside the 3-lane track (-11.8m .. +11.8m);
   * standard course arenas keep pigs mobile across all 3 lanes and inner verges (-5.6m .. +5.6m).
   */
  public static resolveCourseArenaEnvelope(
    placeId: string,
    patrolOriginZ: number,
    targetDistance: number
  ): CourseArenaEnvelope {
    const isWilderness = isWildernessPlaceId(placeId);
    const maxLateralX = isWilderness ? 11.8 : 5.6;
    const halfCorridorZ = isWilderness ? 46 : 34;

    const minCourseZ = Math.max(18, patrolOriginZ - halfCorridorZ);
    const maxCourseZ = Math.max(minCourseZ + 16, Math.min(Math.max(80, targetDistance - 18), patrolOriginZ + halfCorridorZ));

    return {
      minLateralX: -maxLateralX,
      maxLateralX,
      minCourseZ,
      maxCourseZ,
      allowOutsidePath: isWilderness
    };
  }

  /**
   * Maps continuous world X coordinate back onto closest canonical course lane [-1, 0, 1] plus residual xOffset.
   */
  public static decomposeWorldX(worldX: number): { lane: number; xOffset: number } {
    const lane = Math.max(-1, Math.min(1, Math.round(worldX / 4)));
    return {
      lane,
      xOffset: worldX - lane * 4
    };
  }

  /**
   * Continuous SI kinematics integrator (meters & seconds) for 3D course movement.
   */
  public static stepCourseKinematics(params: {
    worldX: number;
    z: number;
    vx: number;
    vz: number;
    desiredVx: number;
    desiredVz: number;
    envelope: CourseArenaEnvelope;
    deltaSec: number;
    accelRate?: number;
  }): {
    nextWorldX: number;
    nextZ: number;
    nextVx: number;
    nextVz: number;
    reboundedX: boolean;
    reboundedZ: boolean;
  } {
    const {
      worldX,
      z,
      vx,
      vz,
      desiredVx,
      desiredVz,
      envelope,
      deltaSec,
      accelRate = 4.6
    } = params;

    const alpha = 1 - Math.exp(-accelRate * Math.max(0.001, deltaSec));
    let nextVx = vx + (desiredVx - vx) * alpha;
    let nextVz = vz + (desiredVz - vz) * alpha;

    let nextWorldX = worldX + nextVx * deltaSec;
    let nextZ = z + nextVz * deltaSec;
    let reboundedX = false;
    let reboundedZ = false;

    if (nextWorldX <= envelope.minLateralX) {
      nextWorldX = envelope.minLateralX;
      nextVx = Math.abs(nextVx) * 0.6;
      reboundedX = true;
    } else if (nextWorldX >= envelope.maxLateralX) {
      nextWorldX = envelope.maxLateralX;
      nextVx = -Math.abs(nextVx) * 0.6;
      reboundedX = true;
    }

    if (nextZ <= envelope.minCourseZ) {
      nextZ = envelope.minCourseZ;
      nextVz = Math.abs(nextVz) * 0.65;
      reboundedZ = true;
    } else if (nextZ >= envelope.maxCourseZ) {
      nextZ = envelope.maxCourseZ;
      nextVz = -Math.abs(nextVz) * 0.65;
      reboundedZ = true;
    }

    return {
      nextWorldX,
      nextZ,
      nextVx,
      nextVz,
      reboundedX,
      reboundedZ
    };
  }

  /**
   * Updates positional coordinates dynamically using SI time-step kinematics (zero FPS assumptions).
   */
  public static computeNextPosition(
    x: number,
    y: number,
    speed: number,
    direction: 1 | -1,
    behaviorState: FeralPigBehaviorState,
    bounds: ArenaNavigationBounds,
    deltaSec: number
  ): { nextX: number; nextY: number; nextDirection: 1 | -1 } {
    if (behaviorState === "smashed" || behaviorState === "stunned") {
      return { nextX: x, nextY: y, nextDirection: direction };
    }

    let effectiveSpeed = speed;
    if (behaviorState === "rooting") effectiveSpeed *= 0.35;
    else if (behaviorState === "alert") effectiveSpeed *= 0.65;
    else if (behaviorState === "charging") effectiveSpeed *= 1.55;
    else if (behaviorState === "evading") effectiveSpeed *= 1.35;

    let nextX = x + effectiveSpeed * direction * deltaSec;
    let nextDirection = direction;

    if (nextX <= bounds.minX) {
      nextX = bounds.minX;
      nextDirection = 1;
    } else if (nextX >= bounds.maxX) {
      nextX = bounds.maxX;
      nextDirection = -1;
    }

    let nextY = y;
    if (bounds.arenaType === "garden" && behaviorState === "patrolling") {
      nextY = y + Math.sin(nextX * 0.15) * 0.4;
    }

    return { nextX, nextY, nextDirection };
  }
}
