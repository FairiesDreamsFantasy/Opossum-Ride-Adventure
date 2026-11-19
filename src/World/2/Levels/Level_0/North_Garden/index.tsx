/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GardenFlowerFeature {
  id: number;
  x: number;
  y: number;
  radiusFeet: number;
  petalColor: string;
  centerColor: string;
}

const PETAL_COLORS = ["#f472b6", "#fb7185", "#c084fc", "#facc15", "#38bdf8", "#fb923c"];

export const NORTH_GARDEN_LARGE_FLOWERS: GardenFlowerFeature[] = Array.from({ length: 36 }, (_, idx) => {
  const col = idx % 9;
  const row = Math.floor(idx / 9);
  return {
    id: idx + 1,
    x: 320 + col * 420 + ((idx * 37) % 90) - 45,
    y: 3260 + row * 420 + ((idx * 53) % 80) - 40,
    radiusFeet: 18 + (idx % 4) * 5,
    petalColor: PETAL_COLORS[idx % PETAL_COLORS.length],
    centerColor: "#fde047"
  };
});

export const WORLD2_NORTH_GARDEN_SPEC = {
  zoneId: "north_garden" as const,
  name: "Temple North Flower Garden",
  isOutdoor: true,
  surfaceType: "grass" as const,
  dimensionsFeet: { width: 4000, depth: 2000, southWallHeight: 10, northWallHeight: 10 },
  bounds: { xMin: 0, xMax: 4000, yMin: 3000, yMax: 5000 },
  entranceGate: { y: 3000, xRange: [2990, 3010] as const, widthFeet: 20 },
  walls: {
    southDividerHeightFeet: 10,
    northWallHeightFeet: 10,
    overlooksNorth: "Green horizon under consistent game sky",
    westWall: { hasOpening: true, overlooks: "Distant World 1 crop field horizon" },
    eastWall: { isTempleWall: true, hasLargeWindowOpening: true, windowYRange: [3700, 4300] as const }
  },
  largeFlowers: NORTH_GARDEN_LARGE_FLOWERS
};

export default WORLD2_NORTH_GARDEN_SPEC;
