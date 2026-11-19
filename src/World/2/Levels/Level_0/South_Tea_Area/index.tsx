/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OutdoorTeaTable {
  id: number;
  x: number;
  y: number;
  radiusFeet: number;
  tableColor: string;
  pastryTint: string;
  teaColor: string;
}

export const SOUTH_TEA_TABLES: OutdoorTeaTable[] = [
  { id: 1, x: 700, y: -600, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#f59e0b", teaColor: "#22c55e" },
  { id: 2, x: 1450, y: -600, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#fb7185", teaColor: "#a855f7" },
  { id: 3, x: 2200, y: -600, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#eab308", teaColor: "#14b8a6" },
  { id: 4, x: 3500, y: -600, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#d97706", teaColor: "#38bdf8" },
  { id: 5, x: 700, y: -1400, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#f472b6", teaColor: "#10b981" },
  { id: 6, x: 1450, y: -1400, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#fbbf24", teaColor: "#8b5cf6" },
  { id: 7, x: 2200, y: -1400, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#f97316", teaColor: "#06b6d4" },
  { id: 8, x: 3500, y: -1400, radiusFeet: 16, tableColor: "#f8fafc", pastryTint: "#ec4899", teaColor: "#84cc16" }
];

export const WORLD2_SOUTH_TEA_AREA_SPEC = {
  zoneId: "south_tea_area" as const,
  name: "Temple Outdoor Tea Garden",
  isOutdoor: true,
  surfaceType: "tile" as const,
  dimensionsFeet: { width: 4000, depth: 2000, canopyHeight: 20 },
  bounds: { xMin: 0, xMax: 4000, yMin: -2000, yMax: 0 },
  entranceGate: { y: 0, xRange: [2990, 3010] as const, widthFeet: 20 },
  canopy: {
    heightFeet: 20,
    hasSkylights: true,
    skylightBays: [
      { xCenter: 1000, yCenter: -1000, widthFeet: 650, depthFeet: 650 },
      { xCenter: 2000, yCenter: -1000, widthFeet: 650, depthFeet: 650 },
      { xCenter: 3000, yCenter: -1000, widthFeet: 650, depthFeet: 650 }
    ]
  },
  walls: {
    southOverlooks: "Green horizon under consistent game sky",
    eastWall: { isTempleWall: true },
    westWall: { hasOpening: true, overlooks: "Distant World 1 crop field horizon" }
  },
  teaTables: SOUTH_TEA_TABLES
};

export default WORLD2_SOUTH_TEA_AREA_SPEC;
