/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProceduralBlockConfig {
  width: number;
  height: number;
  roughness: number;
  materialType?: string;
  isWalkable?: boolean;
  soundSurfaceType?: string;
}

export function generateBlockMetrics(blockId: string): ProceduralBlockConfig {
  if (blockId.startsWith("pillar_")) {
    return { width: 45, height: 180, roughness: 0.15, materialType: "stone", isWalkable: false, soundSurfaceType: "stone" };
  }
  if (blockId.startsWith("bridge_")) {
    return { width: 120, height: 20, roughness: 0.08, materialType: "wood", isWalkable: true, soundSurfaceType: "wood" };
  }
  if (blockId.startsWith("garden_")) {
    return { width: 80, height: 15, roughness: 0.25, materialType: "dirt", isWalkable: true, soundSurfaceType: "dirt" };
  }
  if (blockId.startsWith("wall_")) {
    return { width: 30, height: 120, roughness: 0.1, materialType: "brick", isWalkable: false, soundSurfaceType: "brick" };
  }
  return { width: 60, height: 60, roughness: 0.05, materialType: "concrete", isWalkable: true, soundSurfaceType: "concrete" };
}

export const BuildingBlocksGeneral = {
  generateBlockMetrics,
  getSurfaceSoundForBlock: (blockId: string): string => generateBlockMetrics(blockId).soundSurfaceType || "dirt",
  isBlockObstacle: (blockId: string): boolean => !generateBlockMetrics(blockId).isWalkable
};
