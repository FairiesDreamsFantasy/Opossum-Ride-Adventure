/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Dynamic Forward Spatial Navigation & Obstacle Calculation Engine
 * Calculates real-time distance to doors, portals, boundaries, and obstacles
 * directly ahead of the player along their current directional facing vector.
 */

import { SystemRegistry } from "../../../../../../Registry";

const { Measurement: MeasurementEngine, Utils: MathUtils } = SystemRegistry.Engine.Mathematics;

export interface ForwardSpatialQuery {
  currentLevel: number;
  placeId?: string;
  foyerX: number;
  foyerY: number;
  foyerDirection: string;
  isImperial: boolean;
  courseProgressDistance?: number;
  currentPlaceName?: string;
}

export function computeForwardNavigationTarget(query: ForwardSpatialQuery): string {
  const { currentLevel, placeId, foyerX, foyerY, foyerDirection, isImperial } = query;

  if (placeId === "temple_courtyard") {
    const dir = foyerDirection.toLowerCase();
    const px = MathUtils.round(foyerX);
    const py = MathUtils.round(foyerY);

    if (px > 4000) {
      if (dir === "east") {
        const dist = MathUtils.max(0, 7000 - px);
        const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
        return py >= 1490 && py <= 1510
          ? `The 20-foot archway leading to World 2 Level 1 is ${distStr} directly ahead.`
          : `The east carved Temple Foyer wall with the Level 1 archway is ${distStr} ahead.`;
      }
      if (dir === "west") {
        const dist = MathUtils.max(0, px - 4000);
        const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
        return py >= 1490 && py <= 1510
          ? `The double carved stone sliding doors back to the Courtyard are ${distStr} directly ahead.`
          : `The west carved Temple Foyer wall is ${distStr} ahead.`;
      }
      if (dir === "north") {
        const dist = MathUtils.max(0, 3000 - py);
        return `The north green-horizon carved Temple Foyer wall is ${MeasurementEngine.formatDistance(dist, isImperial, true)} ahead.`;
      }
      const dist = MathUtils.max(0, py);
      return `The south gold-pyramid carved Temple Foyer wall is ${MeasurementEngine.formatDistance(dist, isImperial, true)} ahead.`;
    }

    if (dir === "east") {
      const dist = MathUtils.max(0, 4000 - px);
      const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
      if (py >= 1490 && py <= 1510) {
        return `The carved stone double sliding doors to the Temple Foyer are ${distStr} directly ahead.`;
      }
      return `The east temple facade wall is ${distStr} ahead.`;
    }
    if (dir === "west") {
      const dist = MathUtils.max(0, px);
      const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
      return py >= 1490 && py <= 1510 && py <= 3000 && py >= 0
        ? `The locked west exterior door overlooking the road and crop field horizon is ${distStr} ahead.`
        : `The west perimeter wall overlooking the crop field horizon is ${distStr} ahead.`;
    }
    if (dir === "north") {
      if (py <= 3000) {
        const dist = MathUtils.max(0, 3000 - py);
        const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
        return px >= 2990 && px <= 3010
          ? `The 20-foot gate into the North Flower Garden is ${distStr} directly ahead.`
          : `The 10-foot north divider wall to the Flower Garden is ${distStr} ahead.`;
      }
      const dist = MathUtils.max(0, 5000 - py);
      return `The north flower garden wall overlooking the green horizon is ${MeasurementEngine.formatDistance(dist, isImperial, true)} ahead.`;
    }
    if (py >= 0) {
      const dist = MathUtils.max(0, py);
      const distStr = MeasurementEngine.formatDistance(dist, isImperial, true);
      return px >= 2990 && px <= 3010
        ? `The 20-foot gate into the South Outdoor Tea Area is ${distStr} directly ahead.`
        : `The south courtyard boundary wall is ${distStr} ahead.`;
    }
    const dist = MathUtils.max(0, py - (-2000));
    return `The south tea area perimeter overlooking the green horizon is ${MeasurementEngine.formatDistance(dist, isImperial, true)} ahead.`;
  }

  // Level 0: Manor 1st Floor (Floor Foyer & Expanded Porch)
  if (currentLevel === 0) {
    const dir = foyerDirection.toLowerCase();
    const px = MathUtils.round(foyerX);
    const py = MathUtils.round(foyerY);

    if (dir === "north") {
      if (py <= 2000) {
        const distToBrassDoors = MathUtils.max(0, 2000 - py);
        const distStr = MeasurementEngine.formatDistance(distToBrassDoors, isImperial, true);
        if (px >= 990 && px <= 1010) {
          return `The double brass sliding doors are ${distStr} directly ahead leading to the porch.`;
        } else {
          return `The north perimeter wall with double brass sliding doors is ${distStr} ahead.`;
        }
      } else {
        // On expanded porch (2000 to 2200)
        const distToOpenAir = MathUtils.max(0, 2200 - py);
        const distStr = MeasurementEngine.formatDistance(distToOpenAir, isImperial, true);
        return `The open-air north boundary of the porch leading to Level 1 is ${distStr} ahead.`;
      }
    } else if (dir === "west") {
      const distToWestWall = MathUtils.max(0, px);
      const distStr = MeasurementEngine.formatDistance(distToWestWall, isImperial, true);
      if (py >= 990 && py <= 1010) {
        return `The grand 20-foot red door frame leading to the Grand Tea Room is ${distStr} directly ahead.`;
      } else {
        return `The west wall with the Grand Tea Room doorway is ${distStr} ahead.`;
      }
    } else if (dir === "east") {
      const distToEastWall = MathUtils.max(0, 2000 - px);
      const distStr = MeasurementEngine.formatDistance(distToEastWall, isImperial, true);
      return `The east perimeter wall is ${distStr} ahead.`;
    } else if (dir === "south") {
      const distToSouthWall = MathUtils.max(0, py);
      const distStr = MeasurementEngine.formatDistance(distToSouthWall, isImperial, true);
      if (py > 2000) {
        const distToFoyerEntrance = MathUtils.max(0, py - 2000);
        const entranceDistStr = MeasurementEngine.formatDistance(distToFoyerEntrance, isImperial, true);
        return `The double brass sliding doors returning to the Floor Foyer are ${entranceDistStr} ahead.`;
      }
      return `The south baseline perimeter wall is ${distStr} ahead.`;
    }
  }

  // Outdoor course paths (Level 1+)
  const courseDist = query.courseProgressDistance || 0;
  const nextCheckpoint = MathUtils.ceil((courseDist + 1) / 500) * 500;
  const distToCheckpoint = MathUtils.max(0, nextCheckpoint - courseDist);
  const checkpointDistStr = MeasurementEngine.formatDistance(distToCheckpoint, isImperial, true);
  return `The next course milestone is ${checkpointDistStr} ahead.`;
}

export default computeForwardNavigationTarget;
