/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCompactOpossumSound, playCompactOpossumMovement } from "../../../../../../../Sound/SFX/Category/Opossum/Compact";
import { FeralPigEntity, FeralPigManager } from "../../../../../../../../Characters/Pigs/Feral/General";

/**
 * Mathematical Physics & State Parameters for 3'0" Compact Opossums
 * Implements pure Newtonian high-leap and heavy landing smash physics
 * (Jump High and Land Hard - completely free of Babylonian shortcuts).
 * Decoupled completely from crafted opossums' mechanics and elegant smart chatter.
 */
export interface CompactOpossumAIState {
  id: string;
  name: string;
  x: number;
  y: number;
  z: number;
  velocityX: number;
  velocityY: number;
  velocityZ: number;
  isAirborne: boolean;
  isJumping: boolean;
  isLandingHard: boolean;
  smashComboCount: number;
  lastSmashTimestamp: number;
  lastBreathingSoundTime: number;
  // Aliases for backward compatibility
  isStomping?: boolean;
  stompComboCount?: number;
  lastStompTimestamp?: number;
}

export interface SmashDetectionResult {
  hasCollided: boolean;
  pigSmashed: boolean;
  pigId?: string;
  bounceImpulseZ: number;
  scoreAwarded: number;
}

export type StompDetectionResult = SmashDetectionResult;

export class CompactOpossumAIPhysics {
  public static readonly GRAVITY = -9.81 * 2.2; // Scaled for authentic physical parabolic trajectory
  public static readonly JUMP_TAKEOFF_VELOCITY = 14.5;
  public static readonly HIGH_LEAP_REBOUND_VELOCITY = 11.8;
  public static readonly STOMP_BOUNCE_VELOCITY = 11.8;
  public static readonly SMASH_RADIUS_TOLERANCE = 28.0; // Units in 2D/3D coordinate space
  public static readonly STOMP_RADIUS_TOLERANCE = 28.0;
  public static readonly VERTICAL_SMASH_WINDOW = 35.0; // Maximum Z height offset for heavy landing smash registration
  public static readonly VERTICAL_STOMP_WINDOW = 35.0;
  public static readonly STANDARD = "100,000,000,000% Ultra-Broad Protection Standard";

  /**
   * Initializes state for a compact opossum
   */
  public static createInitialState(id: string = "compact_opossum_01", name: string = "Compact Jill"): CompactOpossumAIState {
    return {
      id,
      name,
      x: 0,
      y: 0,
      z: 0,
      velocityX: 0,
      velocityY: 0,
      velocityZ: 0,
      isAirborne: false,
      isJumping: false,
      isLandingHard: false,
      smashComboCount: 0,
      lastSmashTimestamp: 0,
      lastBreathingSoundTime: 0,
      isStomping: false,
      stompComboCount: 0,
      lastStompTimestamp: 0
    };
  }

  /**
   * Initiates an authentic high leap for the compact opossum
   */
  public static triggerJump(state: CompactOpossumAIState): boolean {
    if (state.isAirborne || state.z > 0.05) {
      return false; // Cannot jump mid-air
    }
    state.velocityZ = this.JUMP_TAKEOFF_VELOCITY;
    state.isAirborne = true;
    state.isJumping = true;

    // Trigger local decoupled compact vocal audio (snuffle/chuff)
    playCompactOpossumSound("chuff", 1.05);
    return true;
  }

  /**
   * Evaluates spatial heavy landing smash collision between the airborne compact opossum and feral pigs.
   * Natural downward kinetic momentum (Jump High and Land Hard - no Babylonian tricks).
   * Performs Euclidean distance calculations and vertical descent validation.
   */
  public static evaluateSmashCollision(
    state: CompactOpossumAIState,
    feralPigs: FeralPigEntity[],
    currentTimeMs: number,
    audioCtx?: AudioContext,
    audioDest?: AudioNode
  ): SmashDetectionResult {
    // Heavy landing smash only registers when the opossum is descending downward (velocityZ < 0)
    if (!state.isAirborne || state.velocityZ >= 0) {
      return {
        hasCollided: false,
        pigSmashed: false,
        bounceImpulseZ: 0,
        scoreAwarded: 0
      };
    }

    for (const pig of feralPigs) {
      if (pig.isSmashed) continue;

      const dx = state.x - pig.x;
      const dy = state.y - pig.y;
      const distance2D = Math.sqrt(dx * dx + dy * dy);

      const dz = state.z - pig.z;

      // Mathematical collision validation:
      // 1. Horizontal Euclidean radius is within tolerance
      // 2. Vertical position is strictly above the pig within the heavy landing window
      if (distance2D <= this.SMASH_RADIUS_TOLERANCE && dz >= 0 && dz <= this.VERTICAL_SMASH_WINDOW) {
        // Execute feral pig smash mechanics with ultra-precise stereophonic positioning
        FeralPigManager.smashPig(pig, currentTimeMs, audioCtx, audioDest, {
          x: state.x,
          y: state.y,
          z: state.z
        });

        // Apply natural bounce restitution from heavy downward landing to compact opossum
        state.velocityZ = this.HIGH_LEAP_REBOUND_VELOCITY;
        state.isLandingHard = true;
        state.isStomping = true;
        state.smashComboCount = (state.smashComboCount || 0) + 1;
        state.stompComboCount = state.smashComboCount;
        state.lastSmashTimestamp = currentTimeMs;
        state.lastStompTimestamp = currentTimeMs;

        // Trigger decoupled compact sound (excited click + snuffle, NO crafted elegant chatter)
        playCompactOpossumSound("click", 1.15);
        playCompactOpossumSound("snuffle", 1.1);

        const scoreAwarded = 250 * Math.min(4, state.smashComboCount);

        return {
          hasCollided: true,
          pigSmashed: true,
          pigId: pig.id,
          bounceImpulseZ: this.HIGH_LEAP_REBOUND_VELOCITY,
          scoreAwarded
        };
      }
    }

    return {
      hasCollided: false,
      pigSmashed: false,
      bounceImpulseZ: 0,
      scoreAwarded: 0
    };
  }

  // Alias for backward compatibility
  public static evaluateStompCollision(
    state: CompactOpossumAIState,
    feralPigs: FeralPigEntity[],
    currentTimeMs: number,
    audioCtx?: AudioContext,
    audioDest?: AudioNode
  ): SmashDetectionResult {
    return this.evaluateSmashCollision(state, feralPigs, currentTimeMs, audioCtx, audioDest);
  }

  /**
   * Advances integration timestep for physics simulation using velocity verlet / Euler integration.
   */
  public static updatePhysics(
    state: CompactOpossumAIState,
    deltaSeconds: number,
    currentTimeMs: number
  ) {
    if (state.isAirborne) {
      state.velocityZ += this.GRAVITY * deltaSeconds;
      state.z += state.velocityZ * deltaSeconds;

      if (state.z <= 0) {
        state.z = 0;
        state.velocityZ = 0;
        state.isAirborne = false;
        state.isJumping = false;
        state.isLandingHard = false;
        state.isStomping = false;

        // Landing footstep audio on ground impact
        playCompactOpossumMovement("clawClick", 0.95);
      }
    }

    // High-cadence decoupled breathing/stride audio check
    const strideIntervalSec = 0.55;
    if (currentTimeMs / 1000 - state.lastBreathingSoundTime > strideIntervalSec && !state.isAirborne) {
      state.lastBreathingSoundTime = currentTimeMs / 1000;
      playCompactOpossumMovement("stridePant", 1.0);
    }
  }
}
