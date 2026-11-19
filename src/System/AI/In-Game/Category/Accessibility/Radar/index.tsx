/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Opponent, AnimalItem } from "../../../../../../types";
import { projectTrajectory } from "../../Predictors";

export type RadarHorizonBand = "close" | "mid" | "far";

export interface RadarScanTarget {
  key: string;
  id: number;
  type: "opponent" | "feral_pig" | "monkey";
  z: number;
  worldX: number;
  data: Opponent | AnimalItem;
  distance: number; // Euclidean separation in meters
  longitudinalDelta: number; // Positive = ahead, Negative = behind
  closingSpeed: number; // Positive when gap is closing (m/s)
  etaSeconds: number; // Infinity if diverging/stationary gap
  horizon: RadarHorizonBand;
  laneDescription: string;
  motionState: string;
  summaryLabel: string;
}

export interface RadarCursorState {
  cursorIndex: number;
  lastScanTimestampMs: number;
  lastScannedTargetId: number;
  lastScannedTargetKey: string;
}

export interface DynamicRadarScanResult {
  target: RadarScanTarget | null;
  targetsAhead: RadarScanTarget[];
  cursorState: RadarCursorState;
  mode: "nearest_with_horizon" | "cycle_target" | "empty";
  reportText: string;
}

export function createInitialRadarCursorState(): RadarCursorState {
  return {
    cursorIndex: 0,
    lastScanTimestampMs: 0,
    lastScannedTargetId: -1,
    lastScannedTargetKey: ""
  };
}

export class InGameRadarScanner {
  public static readonly CYCLE_WINDOW_MS = 2800;

  /**
   * Resolves human-readable spatial corridor from continuous lateral world coordinate X.
   */
  public static describeLateralCorridor(worldX: number): string {
    if (worldX < -6.2) return "far left off-path wilderness";
    if (worldX > 6.2) return "far right off-path wilderness";
    if (worldX < -2.0) return "left lane";
    if (worldX > 2.0) return "right lane";
    return "center lane";
  }

  /**
   * Classifies target into dynamic proximity horizons.
   */
  public static classifyHorizon(distanceMeters: number): RadarHorizonBand {
    if (distanceMeters <= 50) return "close";
    if (distanceMeters <= 180) return "mid";
    return "far";
  }

  /**
   * Builds a spatially sorted, kinematically enriched index of all active threats.
   * Peacefully off-path cameo NPC goats are strictly excluded from opponent threat scans.
   */
  public static buildSpatialThreatIndex(
    playerZ: number,
    playerVisualX: number,
    playerSpeed: number,
    opponents: Opponent[],
    animals: AnimalItem[]
  ): RadarScanTarget[] {
    const candidates: RadarScanTarget[] = [];

    for (const opp of opponents) {
      if (opp.mooseState === "smashed") continue;
      const longitudinalDelta = opp.z - playerZ;
      if (longitudinalDelta < -1.0) continue; // Only active ahead or abreast threats

      const worldX = opp.lane * 4;
      const dx = worldX - playerVisualX;
      const distance = Math.sqrt(dx * dx + longitudinalDelta * longitudinalDelta);

      // Moose velocity along +Z when trotting forward (+speed * 0.2) or -Z when charging (-speed)
      const oppVelZ = opp.isCharging ? -Math.abs(opp.speed || 0) : Math.abs(opp.speed || 0) * 0.2;
      const closingSpeed = playerSpeed - oppVelZ;
      const trajectory = projectTrajectory(playerZ, playerSpeed, opp.z, oppVelZ);

      const isWild = opp.isWildMoose || !opp.mooseName || opp.mooseName.trim() === "";
      const hasRider = !!(opp.monkeyName && opp.monkeyName.trim() !== "");
      let summaryLabel: string;
      if (isWild || !hasRider) {
        summaryLabel = `wild ${opp.mooseType} Moose`;
      } else {
        const riderGender = (opp.monkeyGender || (opp.mooseType === "Bull" ? "Female" : "Male")).toLowerCase();
        summaryLabel = `${riderGender} monkey ${opp.monkeyName} riding ${opp.mooseType} Moose ${opp.mooseName}`;
      }

      const motionState = opp.isCleaning
        ? "sweeping right"
        : opp.isCharging
          ? "charging toward you"
          : (opp.speed || 0) > 0.5
            ? "trotting"
            : "holding";

      candidates.push({
        key: `opponent:${opp.id}`,
        id: opp.id,
        type: "opponent",
        z: opp.z,
        worldX,
        data: opp,
        distance,
        longitudinalDelta,
        closingSpeed,
        etaSeconds: trajectory.timeToCollision,
        horizon: this.classifyHorizon(distance),
        laneDescription: this.describeLateralCorridor(worldX),
        motionState,
        summaryLabel
      });
    }

    for (const animal of animals) {
      // Strictly exclude cameo NPC goats and already-smashed entities
      if (animal.species === "goat" || animal.state === "smashed") continue;
      if (animal.species !== "feral_pig" && animal.species !== "monkey") continue;

      const longitudinalDelta = animal.z - playerZ;
      if (longitudinalDelta < -1.0) continue;

      const worldX = animal.lane * 4 + (animal.xOffset || 0);
      const dx = worldX - playerVisualX;
      const distance = Math.sqrt(dx * dx + longitudinalDelta * longitudinalDelta);

      const targetVz = animal.vz ?? 0;
      const closingSpeed = playerSpeed - targetVz;
      const trajectory = projectTrajectory(playerZ, playerSpeed, animal.z, targetVz);

      if (animal.species === "feral_pig") {
        const genderLabel = animal.gender || "Boar";
        const coat = animal.coatColor || "Dark Brown";
        const gaitText = animal.behaviorState === "charging"
          ? "charging"
          : animal.behaviorState === "evading"
            ? "evading"
            : animal.behaviorState === "stunned"
              ? "stunned"
              : animal.gaitMode === "gallop"
                ? "galloping"
                : animal.gaitMode === "trot"
                  ? "trotting"
                  : animal.behaviorState === "rooting"
                    ? "foraging"
                    : "patrolling";

        candidates.push({
          key: `feral_pig:${animal.id}`,
          id: animal.id,
          type: "feral_pig",
          z: animal.z,
          worldX,
          data: animal,
          distance,
          longitudinalDelta,
          closingSpeed,
          etaSeconds: trajectory.timeToCollision,
          horizon: this.classifyHorizon(distance),
          laneDescription: this.describeLateralCorridor(worldX),
          motionState: gaitText,
          summaryLabel: `${genderLabel} Feral Pig (${coat})`
        });
      } else {
        const monkeyGender = animal.state === "roaming_female" ? "female" : "male";
        candidates.push({
          key: `monkey:${animal.id}`,
          id: animal.id,
          type: "monkey",
          z: animal.z,
          worldX,
          data: animal,
          distance,
          longitudinalDelta,
          closingSpeed,
          etaSeconds: trajectory.timeToCollision,
          horizon: this.classifyHorizon(distance),
          laneDescription: this.describeLateralCorridor(worldX),
          motionState: "roaming",
          summaryLabel: `loose ${monkeyGender} monkey`
        });
      }
    }

    // Spatial distance sort O(N log N)
    candidates.sort((a, b) => a.distance - b.distance);
    return candidates;
  }

  private static formatEtaClause(target: RadarScanTarget): string {
    if (!Number.isFinite(target.etaSeconds) || target.etaSeconds > 45 || target.etaSeconds <= 0.1) {
      return "";
    }
    return ` ETA ${target.etaSeconds.toFixed(1)} seconds.`;
  }

  private static formatTargetTelemetry(target: RadarScanTarget, formatDistance: (dist: number) => string): string {
    const distStr = formatDistance(target.distance);
    const etaStr = this.formatEtaClause(target);
    return `${target.summaryLabel} (${target.motionState}) in the ${target.laneDescription}, ${distStr} ahead.${etaStr}`;
  }

  /**
   * Executes multi-horizon Opponent Scan ('o' and Shift-O target toggling):
   * - Single 'o' (cycleTarget = false): Announces Nearest threat + dynamic far-horizon summary across mid & far bands.
   * - 'Shift-O' (cycleTarget = true): Cycles sequentially through 2nd, 3rd, ..., farthest, back to 1st without a timer limit.
   */
  public static executeDynamicScan(params: {
    levelId: number;
    playerZ: number;
    playerVisualX?: number;
    playerSpeed?: number;
    opponents: Opponent[];
    animals: AnimalItem[];
    formatDistance: (dist: number) => string;
    cursorState: RadarCursorState;
    nowMs?: number;
    cycleTarget?: boolean;
  }): DynamicRadarScanResult {
    const {
      levelId,
      playerZ,
      playerVisualX = 0,
      playerSpeed = 0,
      opponents,
      animals,
      formatDistance,
      cursorState,
      nowMs = Date.now(),
      cycleTarget = false
    } = params;

    if (levelId <= 0) {
      return {
        target: null,
        targetsAhead: [],
        cursorState: createInitialRadarCursorState(),
        mode: "empty",
        reportText: "Floor foyer sanctuary: zero course opponents present."
      };
    }

    const sorted = this.buildSpatialThreatIndex(
      playerZ,
      playerVisualX,
      playerSpeed,
      opponents,
      animals
    );

    if (sorted.length === 0) {
      return {
        target: null,
        targetsAhead: [],
        cursorState: createInitialRadarCursorState(),
        mode: "empty",
        reportText: "Radar clear: zero opponents detected ahead along this course."
      };
    }

    if (!cycleTarget) {
      const nearest = sorted[0];
      const nextCursor: RadarCursorState = {
        cursorIndex: 0,
        lastScanTimestampMs: nowMs,
        lastScannedTargetId: nearest.id,
        lastScannedTargetKey: nearest.key
      };

      let horizonSummary = "";
      if (sorted.length > 1) {
        const remaining = sorted.length - 1;
        const nextTarget = sorted[1];
        const farthestTarget = sorted[sorted.length - 1];
        const midCount = sorted.filter((t) => t.horizon === "mid").length;
        const farCount = sorted.filter((t) => t.horizon === "far").length;

        if (sorted.length === 2) {
          horizonSummary = ` 1 more target farther ahead: ${nextTarget.summaryLabel} in the ${nextTarget.laneDescription} at ${formatDistance(nextTarget.distance)}. Press Shift-O to toggle.`;
        } else {
          horizonSummary = ` ${remaining} more targets ahead (${midCount} mid-range, ${farCount} far-horizon): next at ${formatDistance(nextTarget.distance)} in the ${nextTarget.laneDescription}; farthest is ${farthestTarget.summaryLabel} in the ${farthestTarget.laneDescription} at ${formatDistance(farthestTarget.distance)}. Press Shift-O to toggle.`;
        }
      }

      return {
        target: nearest,
        targetsAhead: sorted,
        cursorState: nextCursor,
        mode: "nearest_with_horizon",
        reportText: `Scan reports nearest target: ${this.formatTargetTelemetry(nearest, formatDistance)}${horizonSummary}`
      };
    }

    // Sequential Shift-O cycling through sorted targets (2nd -> 3rd -> ... -> farthest -> wrap)
    const prevIdx = sorted.findIndex((t) => t.key === cursorState.lastScannedTargetKey);
    const baseIdx = prevIdx >= 0
      ? prevIdx
      : cursorState.lastScanTimestampMs > 0
        ? cursorState.cursorIndex
        : -1;
    const nextIdx = sorted.length === 1 ? 0 : (baseIdx + 1) % sorted.length;
    const chosen = sorted[nextIdx];

    const horizonLabel =
      chosen.horizon === "close"
        ? "close range"
        : chosen.horizon === "mid"
          ? "mid range"
          : "far horizon";

    const rankTag = nextIdx === 0
      ? `Target 1 of ${sorted.length} (nearest, ${horizonLabel})`
      : nextIdx === sorted.length - 1
        ? `Target ${nextIdx + 1} of ${sorted.length} (farthest, ${horizonLabel})`
        : `Target ${nextIdx + 1} of ${sorted.length} (${horizonLabel})`;

    const nextCursor: RadarCursorState = {
      cursorIndex: nextIdx,
      lastScanTimestampMs: nowMs,
      lastScannedTargetId: chosen.id,
      lastScannedTargetKey: chosen.key
    };

    return {
      target: chosen,
      targetsAhead: sorted,
      cursorState: nextCursor,
      mode: "cycle_target",
      reportText: `Radar ${rankTag}: ${this.formatTargetTelemetry(chosen, formatDistance)}`
    };
  }

  /**
   * Backward-compatible wrapper preserving single-call immediate surroundings queries.
   */
  public static scanImmediateSurroundings(
    playerZ: number,
    opponents: Opponent[],
    animals: AnimalItem[],
    formatDistance: (dist: number) => string
  ): { target: RadarScanTarget | null; reportText: string } {
    const res = this.executeDynamicScan({
      levelId: 1,
      playerZ,
      opponents,
      animals,
      formatDistance,
      cursorState: createInitialRadarCursorState()
    });
    return { target: res.target, reportText: res.reportText };
  }
}

export const InGameRadar = InGameRadarScanner;
export default InGameRadar;
