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
  foyerX: number;
  foyerY: number;
  foyerDirection: string;
  isImperial: boolean;
  courseProgressDistance?: number;
  currentPlaceName?: string;
}

export function computeForwardNavigationTarget(query: ForwardSpatialQuery): string {
  const { currentLevel, foyerX, foyerY, foyerDirection, isImperial } = query;

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
