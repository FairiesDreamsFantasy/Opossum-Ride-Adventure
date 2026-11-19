/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimalItem } from "../../../../../../../types";
import {
  FeralPigBehaviorEngine,
  FeralPigBehaviorState,
  FeralPigGaitMode,
  DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG
} from "../Behaviors";
import { FeralPigNavigator, ArenaNavigationBounds } from "../Navigation";
import { FeralPigCollisionDetector } from "../Collision";
import { FeralPigArenaInclusionEngine } from "../Included_Via_Any_Arena";
import { PseudorandomGenerator } from "../../../Psudorandom_Functions";

export interface CoursePigAITickResult {
  switchedLane: boolean;
  distanceToPlayer: number;
  lateralOffsetMeters: number;
  recoveredFromStun: boolean;
  shouldEmitFootfall: boolean;
  gaitMode: FeralPigGaitMode;
  surfaceAcoustics: "soil" | "stone" | "grass" | "dirt" | "wood";
  shouldEmitBehaviorVocal: boolean;
  behaviorVocalKind: "forage_snuffle" | "alert_chuff" | "snort" | "squeal" | "grunt";
}

export class FeralPigAIController {
  public static Behaviors = FeralPigBehaviorEngine;
  public static Navigation = FeralPigNavigator;
  public static Collision = FeralPigCollisionDetector;

  /**
   * Kinematic, level-scaled AI tick for feral pigs across both 3-lane courses and outside-path wilderness terrain.
   */
  public static updateCoursePigAI(
    animal: AnimalItem,
    playerZ: number,
    playerVisualX: number,
    levelId: number,
    deltaSec: number,
    nowMs: number,
    placeId: string = "trail",
    targetDistance: number = 2000
  ): CoursePigAITickResult {
    const pigWorldX0 = animal.lane * 4 + (animal.xOffset || 0);
    const lateralOffset0 = pigWorldX0 - playerVisualX;
    const zDelta = animal.z - playerZ;
    const dist3D = Math.sqrt(zDelta * zDelta + lateralOffset0 * lateralOffset0);

    const inclusion = FeralPigArenaInclusionEngine.getInclusionProfileForArena(placeId, placeId);
    const surfaceAcoustics = inclusion.rootingSurfaceAcoustics;

    if (animal.state === "smashed") {
      return {
        switchedLane: false,
        distanceToPlayer: dist3D,
        lateralOffsetMeters: lateralOffset0,
        recoveredFromStun: false,
        shouldEmitFootfall: false,
        gaitMode: "walk",
        surfaceAcoustics,
        shouldEmitBehaviorVocal: false,
        behaviorVocalKind: "grunt"
      };
    }

    const gender: "Boar" | "Sow" = animal.gender === "Sow" ? "Sow" : "Boar";
    const difficulty = FeralPigBehaviorEngine.computeLevelDifficulty(levelId);
    const config = DEFAULT_FERAL_PIG_BEHAVIOR_CONFIG[gender];

    // Initialize deterministic home corridor & velocities once per spawned pig
    if (animal.patrolOriginZ === undefined) {
      animal.patrolOriginZ = animal.z;
    }
    if (animal.patrolDirection === undefined) {
      animal.patrolDirection = animal.id % 2 === 0 ? -1 : 1;
    }
    if (animal.vx === undefined) {
      animal.vx = (animal.id % 2 === 0 ? 1 : -1) * 1.4;
    }
    if (animal.vz === undefined) {
      animal.vz = animal.patrolDirection * (2.6 + difficulty * 1.4);
    }
    if (animal.gaitPhase === undefined) {
      animal.gaitPhase = (animal.id * 1.37) % (Math.PI * 2);
    }
    if (animal.lastStepDistance === undefined) {
      animal.lastStepDistance = 0;
    }

    const envelope = FeralPigNavigator.resolveCourseArenaEnvelope(
      placeId,
      animal.patrolOriginZ,
      targetDistance
    );
    animal.isWildernessRoamer = envelope.allowOutsidePath;

    // 1. Stunned recovery handling (no TTS description on stunned pigs)
    if (animal.state === "stunned") {
      animal.behaviorState = "stunned";
      animal.vx *= Math.max(0, 1 - deltaSec * 6);
      animal.vz *= Math.max(0, 1 - deltaSec * 6);
      if (animal.stunnedUntil && nowMs >= animal.stunnedUntil) {
        animal.state = "patrolling";
        animal.behaviorState = "patrolling";
        animal.stunnedUntil = undefined;
        animal.stateElapsedMs = 0;
        animal.nextLaneSwitchTime = 0.8 + (animal.id % 3) * 0.4;
        return {
          switchedLane: false,
          distanceToPlayer: dist3D,
          lateralOffsetMeters: lateralOffset0,
          recoveredFromStun: true,
          shouldEmitFootfall: false,
          gaitMode: "walk",
          surfaceAcoustics,
          shouldEmitBehaviorVocal: false,
          behaviorVocalKind: "grunt"
        };
      }
      return {
        switchedLane: false,
        distanceToPlayer: dist3D,
        lateralOffsetMeters: lateralOffset0,
        recoveredFromStun: false,
        shouldEmitFootfall: false,
        gaitMode: "walk",
        surfaceAcoustics,
        shouldEmitBehaviorVocal: false,
        behaviorVocalKind: "grunt"
      };
    }

    // 2. Deterministic sensory & ethological behavior evaluation
    const prevBehavior: FeralPigBehaviorState = animal.behaviorState || "patrolling";
    animal.stateElapsedMs = (animal.stateElapsedMs || 0) + deltaSec * 1000;
    const transitionEpoch = Math.floor(animal.stateElapsedMs / 500);
    const seed = animal.id * 97 + transitionEpoch * 31 + levelId * 13;

    const evalRes = FeralPigBehaviorEngine.evaluateBehaviorState(
      prevBehavior,
      dist3D,
      animal.stateElapsedMs,
      gender,
      seed,
      config,
      difficulty
    );

    let enteredAlertOrCharge = false;
    if (evalRes.nextState !== prevBehavior) {
      animal.behaviorState = evalRes.nextState;
      animal.stateElapsedMs = 0;
      if (evalRes.nextState === "alert" || evalRes.nextState === "charging") {
        enteredAlertOrCharge = true;
      }
    } else {
      animal.behaviorState = evalRes.nextState;
    }

    if (evalRes.shouldChangeDirection) {
      animal.patrolDirection = animal.patrolDirection === 1 ? -1 : 1;
    }
    const activeBehavior: FeralPigBehaviorState = animal.behaviorState || "patrolling";
    animal.state = activeBehavior;

    // 3. Target lane / lateral roaming drift updates
    if (animal.nextLaneSwitchTime === undefined) {
      animal.nextLaneSwitchTime = 0.8 + ((animal.id * 0.63) % 2.4);
    }

    let switchedLane = false;
    const prevLane = animal.lane;
    animal.nextLaneSwitchTime -= deltaSec;
    if (animal.nextLaneSwitchTime <= 0) {
      const rng = new PseudorandomGenerator(animal.id * 313 + Math.floor(nowMs * 0.01) + levelId);
      const minInterval = Math.max(0.75, 2.2 - difficulty * 1.25);
      animal.nextLaneSwitchTime = minInterval + rng.next() * 1.9;

      if (activeBehavior === "charging") {
        // Track toward player's lateral trajectory
        animal.targetLane = Math.max(-1, Math.min(1, Math.round(playerVisualX / 4)));
      } else if (activeBehavior === "evading") {
        const awayDir = lateralOffset0 >= 0 ? 1 : -1;
        animal.targetLane = envelope.allowOutsidePath ? awayDir * 2 : awayDir;
      } else {
        // Freely roam anywhere along the path (or outside the path in wilderness arenas)
        const maxSlot = envelope.allowOutsidePath ? 3 : 1;
        const nextSlot = rng.intRange(-maxSlot, maxSlot);
        animal.targetLane = nextSlot;
      }
    }

    // 4. Compute desired continuous 2D course velocity (vx, vz) in SI m/s
    const agility = gender === "Sow" ? 1.18 : 1.0;
    const targetLateralWorldX = Math.max(
      envelope.minLateralX,
      Math.min(envelope.maxLateralX, (animal.targetLane ?? animal.lane) * 3.8)
    );
    const dxToTarget = targetLateralWorldX - pigWorldX0;

    let desiredVx = 0;
    let desiredVz = 0;

    if (activeBehavior === "charging") {
      // Aggressive Boar rush toward player vector (moves along track toward player + steers laterally)
      const chargeSpeed = (5.4 + difficulty * 4.6) * config.chargeSpeedMultiplier;
      const toPlayerZ = playerZ - animal.z;
      const zSign = Math.abs(toPlayerZ) > 0.6 ? Math.sign(toPlayerZ) : -1;
      desiredVz = zSign * chargeSpeed;
      desiredVx = Math.max(-4.8, Math.min(4.8, (playerVisualX - pigWorldX0) * 1.6));
    } else if (activeBehavior === "evading") {
      // Rapid diagonal getaway across lanes or off-path into wilderness cover
      const evadeSpeed = (4.6 + difficulty * 3.4) * config.chargeSpeedMultiplier;
      const awaySignZ = animal.z >= playerZ ? 1 : -1;
      const awaySignX = lateralOffset0 >= 0 ? 1 : -1;
      desiredVz = awaySignZ * evadeSpeed * 0.8;
      desiredVx = awaySignX * evadeSpeed * 0.72 * agility;
    } else if (activeBehavior === "alert") {
      // Alert lateral pacing + cautious forward/reverse stance
      const alertSpeed = (2.1 + difficulty * 1.4) * agility;
      desiredVx = Math.sign(dxToTarget || (animal.id % 2 === 0 ? 1 : -1)) * alertSpeed;
      desiredVz = (animal.z > playerZ ? -0.9 : 0.9);
    } else if (activeBehavior === "rooting") {
      // Active rooting forage walk: slow snout sweep back-and-forth while grazing
      const forageSway = Math.sin(nowMs * 0.0018 + animal.id * 1.7) * 1.15;
      desiredVx = Math.max(-1.4, Math.min(1.4, dxToTarget * 0.45 + forageSway));
      desiredVz = (animal.patrolDirection || 1) * (0.95 + difficulty * 0.45);
    } else {
      // Active patrolling trot across lanes, verges, and off-path wilderness terrain
      const patrolSpeed = (2.8 + difficulty * 2.1) * agility;
      desiredVx = Math.abs(dxToTarget) > 0.25
        ? Math.sign(dxToTarget) * Math.min(patrolSpeed * 0.9, Math.abs(dxToTarget) * 1.3 + 1.1)
        : Math.sin(nowMs * 0.0012 + animal.id) * 1.2;
      desiredVz = (animal.patrolDirection || 1) * patrolSpeed;
    }

    // 5. Integrate real SI kinematics and update animal world coordinates
    const step = FeralPigNavigator.stepCourseKinematics({
      worldX: pigWorldX0,
      z: animal.z,
      vx: animal.vx,
      vz: animal.vz,
      desiredVx,
      desiredVz,
      envelope,
      deltaSec
    });

    if (step.reboundedZ) {
      animal.patrolDirection = animal.patrolDirection === 1 ? -1 : 1;
    }
    if (step.reboundedX && animal.targetLane !== undefined) {
      animal.targetLane = -Math.sign(step.nextWorldX) * (envelope.allowOutsidePath ? 2 : 1);
    }

    const displacedMeters = Math.hypot(step.nextWorldX - pigWorldX0, step.nextZ - animal.z);
    const decomposed = FeralPigNavigator.decomposeWorldX(step.nextWorldX);

    animal.vx = step.nextVx;
    animal.vz = step.nextVz;
    animal.z = step.nextZ;
    animal.lane = decomposed.lane;
    animal.xOffset = decomposed.xOffset;
    animal.speed = Math.hypot(step.nextVx, step.nextVz);

    if (animal.lane !== prevLane && Math.abs(step.nextVx) > 1.8) {
      switchedLane = true;
    }

    // 6. Gait phase, animation drive, and real stride-locked hoofbeat emission
    const gaitMode = FeralPigBehaviorEngine.resolveGaitForMotion(activeBehavior, animal.speed);
    animal.gaitMode = gaitMode;
    animal.gaitPhase = (animal.gaitPhase + displacedMeters * 3.1) % (Math.PI * 2);
    animal.lastStepDistance += displacedMeters;

    const strideThreshold =
      gaitMode === "walk" ? 1.05 :
      gaitMode === "trot" ? 1.35 :
      gaitMode === "gallop" ? 1.85 : 1.55;

    let shouldEmitFootfall = false;
    if (animal.lastStepDistance >= strideThreshold && dist3D < 115) {
      animal.lastStepDistance = animal.lastStepDistance % strideThreshold;
      shouldEmitFootfall = true;
    }

    // 7. Ambient foraging snuffles & territorial alert vocals
    let shouldEmitBehaviorVocal = false;
    let behaviorVocalKind: CoursePigAITickResult["behaviorVocalKind"] = "grunt";
    if (enteredAlertOrCharge && dist3D < 95) {
      shouldEmitBehaviorVocal = true;
      behaviorVocalKind = activeBehavior === "charging" ? "alert_chuff" : (gender === "Sow" ? "squeal" : "snort");
    } else if (activeBehavior === "rooting" && dist3D < 85 && (animal.nextVocalTime ?? 3) <= 0.15) {
      shouldEmitBehaviorVocal = true;
      behaviorVocalKind = "forage_snuffle";
    }

    return {
      switchedLane,
      distanceToPlayer: dist3D,
      lateralOffsetMeters: step.nextWorldX - playerVisualX,
      recoveredFromStun: false,
      shouldEmitFootfall,
      gaitMode,
      surfaceAcoustics,
      shouldEmitBehaviorVocal,
      behaviorVocalKind
    };
  }

  /**
   * Complete tick update method for in-game feral pig instances
   */
  public static updatePigAI(
    pig: {
      x: number;
      y: number;
      z: number;
      speed: number;
      direction: 1 | -1;
      behaviorState: FeralPigBehaviorState;
      stateElapsedMs: number;
      gender: "Boar" | "Sow";
      isSmashed: boolean;
    },
    player: { x: number; y: number; z: number; vy: number },
    bounds: ArenaNavigationBounds,
    deltaSec: number,
    currentTimeMs: number,
    seed: number
  ) {
    if (pig.isSmashed) return pig;

    // 1. Calculate distance to player
    const distToPlayer = Math.sqrt(
      Math.pow(player.x - pig.x, 2) + Math.pow(player.y - pig.y, 2)
    );

    // 2. Check for jump smash impact
    const isSmashHit = FeralPigCollisionDetector.checkJumpSmashHit(
      player.x, player.y, player.z, player.vy,
      pig.x, pig.y, pig.z
    );

    if (isSmashHit) {
      pig.isSmashed = true;
      pig.behaviorState = "smashed";
      return pig;
    }

    // 3. State update
    const { nextState, shouldChangeDirection } = FeralPigBehaviorEngine.evaluateBehaviorState(
      pig.behaviorState,
      distToPlayer,
      pig.stateElapsedMs,
      pig.gender,
      seed
    );

    if (nextState !== pig.behaviorState) {
      pig.behaviorState = nextState;
      pig.stateElapsedMs = 0;
    } else {
      pig.stateElapsedMs += deltaSec * 1000;
    }

    if (shouldChangeDirection) {
      pig.direction = (pig.direction === 1 ? -1 : 1) as 1 | -1;
    }

    // 4. Positional navigation
    const { nextX, nextY, nextDirection } = FeralPigNavigator.computeNextPosition(
      pig.x, pig.y, pig.speed, pig.direction,
      pig.behaviorState, bounds, deltaSec
    );

    pig.x = nextX;
    pig.y = nextY;
    pig.direction = nextDirection;

    return pig;
  }
}
