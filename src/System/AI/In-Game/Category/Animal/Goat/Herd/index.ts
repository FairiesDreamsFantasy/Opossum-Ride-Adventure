/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimalItem } from "../../../../../../../types";
import { getGoatCameoById } from "../../../../../../../Characters/Goats";

export type GoatPastureBehaviorState = "grazing" | "socializing" | "trotting" | "perched" | "idle";

export interface GoatAITickResult {
  distanceToPlayer: number;
  shouldEmitBleat: boolean;
  shouldEmitStepClop: boolean;
  shouldEmitGrazeRustle: boolean;
  isKid: boolean;
  onWoodRamp: boolean;
}

/**
 * Off-Path Pasture Boundaries (meters from road center):
 * - Track lanes are -4 m, 0 m, +4 m (roadHalfWidth = 6.0 m).
 * - Caprine cameos stay strictly outside [-7.8 m, +7.8 m] on left/right hillside pastures.
 */
export const GOAT_PASTURE_BOUNDS = {
  MIN_ABS_X_FROM_CENTER: 8.2,
  MAX_ABS_X_FROM_CENTER: 17.4,
  DEFAULT_HEIGHT_RAMP: 0.72,
  DEFAULT_HEIGHT_KNOLL: 0.45
};

export function clampOffPathPastureX(totalX: number, preferredSide: "left" | "right"): number {
  const minAbs = GOAT_PASTURE_BOUNDS.MIN_ABS_X_FROM_CENTER;
  const maxAbs = GOAT_PASTURE_BOUNDS.MAX_ABS_X_FROM_CENTER;
  if (preferredSide === "left") {
    return Math.max(-maxAbs, Math.min(-minAbs, totalX));
  }
  return Math.min(maxAbs, Math.max(minAbs, totalX));
}

/**
 * GoatHerdAIEngine
 * Orchestrates social herd/pack behavior, grazing head-dip animations,
 * kid-doe cohesion, wooden ramp/knoll climbing, and soft call-and-response bleats
 * exclusively off-path in The Goat Farm (goat_farm).
 */
export const GoatHerdAIEngine = {
  resolveBehavior(random: number): { action: GoatPastureBehaviorState; duration: number } {
    if (random < 0.46) {
      return { action: "grazing", duration: 3600 + random * 3200 };
    }
    if (random < 0.70) {
      return { action: "socializing", duration: 2200 + random * 2000 };
    }
    if (random < 0.86) {
      return { action: "trotting", duration: 1800 + random * 1800 };
    }
    return { action: "idle", duration: 2000 + random * 2200 };
  },

  updatePastureGoatAI(
    goat: AnimalItem,
    allGoats: AnimalItem[],
    playerZ: number,
    deltaSeconds: number,
    nowMs: number
  ): GoatAITickResult {
    const profile = getGoatCameoById(goat.goatId);
    const isKid = Boolean(goat.isKid || profile.ageClass === "kid");
    const side: "left" | "right" =
      goat.herdSide || ((goat.xOffset || 0) < 0 ? "left" : "right");

    const dt = Math.min(0.1, Math.max(0.001, deltaSeconds));
    const currentX = goat.xOffset ?? (side === "left" ? -10.5 : 10.5);
    const homeX = goat.pastureHomeX ?? currentX;
    const homeZ = goat.pastureHomeZ ?? goat.z;

    // 1. Finite state timer
    goat.stateElapsedMs = (goat.stateElapsedMs || 0) + dt * 1000;
    const cycleLimitMs =
      goat.state === "grazing"
        ? 4500 * profile.grazePreference.grazeFrequencyMultiplier
        : goat.state === "socializing"
          ? 2600
          : goat.state === "perched"
            ? 4200
            : 2400;

    if (goat.stateElapsedMs >= cycleLimitMs) {
      goat.stateElapsedMs = 0;
      const roll = Math.abs(Math.sin((nowMs * 0.001 + goat.id * 1.73) * 1.37));
      if (goat.onRamp) {
        goat.state = roll < 0.55 ? "perched" : roll < 0.82 ? "socializing" : "grazing";
      } else {
        const next = GoatHerdAIEngine.resolveBehavior(roll);
        goat.state = next.action;
      }
    }

    // 2. Social herd attraction: stay softly grouped with herdId mates (kids stick close to herd adults)
    let flockTargetX = homeX;
    let flockTargetZ = homeZ;
    let herdNeighborCount = 0;

    if (goat.herdId !== undefined) {
      let sumX = 0;
      let sumZ = 0;
      for (let i = 0; i < allGoats.length; i++) {
        const other = allGoats[i];
        if (other.id === goat.id || other.species !== "goat" || other.herdId !== goat.herdId) continue;
        // Kids weight toward adult goats in their same herd
        const weight = isKid && !other.isKid ? 2.2 : 1.0;
        sumX += (other.xOffset ?? homeX) * weight;
        sumZ += other.z * weight;
        herdNeighborCount += weight;
      }
      if (herdNeighborCount > 0) {
        flockTargetX = sumX / herdNeighborCount;
        flockTargetZ = sumZ / herdNeighborCount;
      }
    }

    // Keep gentle personal spacing around herd centroid so goats don't stack on identical pixels
    const angle = goat.id * 2.39996 + (nowMs * 0.00018);
    const orbitRadius = isKid ? 1.45 : 2.35;
    const desiredX = clampOffPathPastureX(flockTargetX + Math.cos(angle) * orbitRadius, side);
    const desiredZ = flockTargetZ + Math.sin(angle) * orbitRadius;

    // 3. Movement speed by posture
    const stepFactor =
      goat.state === "trotting"
        ? (isKid ? 1.45 : 1.2)
        : goat.state === "grazing"
          ? 0.22
          : goat.state === "socializing"
            ? 0.45
            : 0.08;

    const dx = desiredX - currentX;
    const dz = desiredZ - goat.z;
    const dist = Math.hypot(dx, dz);

    let movedStep = false;
    if (dist > 0.18) {
      const moveAmt = Math.min(dist, stepFactor * dt);
      goat.xOffset = clampOffPathPastureX(currentX + (dx / dist) * moveAmt, side);
      // Anchor within +/- 8m of homeZ along track so herd stays spread across farm
      const nextZ = goat.z + (dz / dist) * moveAmt;
      goat.z = Math.max(homeZ - 8.5, Math.min(homeZ + 8.5, nextZ));
      movedStep = stepFactor >= 0.4;
    } else {
      goat.xOffset = clampOffPathPastureX(currentX, side);
    }

    // Keep lane = 0 so xOffset expresses true world X directly outside [-7.8, +7.8]
    goat.lane = 0;

    // 4. Head dip & chew phase during grazing
    goat.grazePhase = ((goat.grazePhase || 0) + dt * (goat.state === "grazing" ? 4.2 : 1.6)) % (Math.PI * 2);
    const targetHeadDip = goat.state === "grazing" ? 1.0 : 0.0;
    const currentDip = goat.headDip ?? 0;
    goat.headDip = currentDip + (targetHeadDip - currentDip) * Math.min(1, dt * 4.5);

    // 5. Audio triggers (soft, spaced generously)
    const distanceToPlayer = Math.abs(goat.z - playerZ);
    const audibleWindow = distanceToPlayer < 85;

    if (goat.nextVocalTime === undefined) {
      goat.nextVocalTime = 2.5 + (goat.id % 7) * 1.4;
    }
    goat.nextVocalTime -= dt;

    let shouldEmitBleat = false;
    if (goat.nextVocalTime <= 0) {
      // Generous cooldown (7–15 seconds) keeps farm serene & prevents overlapping noise
      const chatterMult = 1 / Math.max(0.6, profile.grazePreference.socialChatterRate);
      goat.nextVocalTime = (7.5 + ((goat.id * 1.9 + (nowMs % 500) * 0.01) % 7.5)) * chatterMult;
      if (audibleWindow && (goat.state === "socializing" || goat.state === "idle" || isKid)) {
        shouldEmitBleat = true;
      }
    }

    let shouldEmitStepClop = false;
    let shouldEmitGrazeRustle = false;

    const gaitIntervalSec = Math.max(0.35, (profile.gait.interval || 300) / 1000 * 1.4);
    const prevTickBucket = Math.floor(((goat.stateElapsedMs || 0) - dt * 1000) / (gaitIntervalSec * 1000));
    const currTickBucket = Math.floor((goat.stateElapsedMs || 0) / (gaitIntervalSec * 1000));
    if (audibleWindow && distanceToPlayer < 48 && currTickBucket > prevTickBucket) {
      if (movedStep && goat.state === "trotting") {
        shouldEmitStepClop = true;
      } else if (goat.state === "grazing" && currTickBucket % 5 === 0) {
        shouldEmitGrazeRustle = true;
      }
    }

    return {
      distanceToPlayer,
      shouldEmitBleat,
      shouldEmitStepClop,
      shouldEmitGrazeRustle,
      isKid,
      onWoodRamp: Boolean(goat.onRamp || (goat.heightOffset || 0) > 0.35)
    };
  }
};
