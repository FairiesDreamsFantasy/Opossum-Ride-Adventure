/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const WORLD2_TEMPLE_FOYER_SPEC = {
  zoneId: "temple_foyer" as const,
  name: "Temple Entrance Foyer",
  isOutdoor: false,
  surfaceType: "tile" as const,
  dimensionsFeet: { width: 3000, depth: 3000, ceilingHeight: 40 },
  bounds: { xMin: 4000, xMax: 7000, yMin: 0, yMax: 3000 },
  localBounds: { xMin: 0, xMax: 3000, yMin: 0, yMax: 3000 },
  floorDesign: {
    pattern: "checkerboard",
    tileSizeInches: 24, // 24-inch x 24-inch (2 ft x 2 ft)
    tileSizeFeet: 2,
    colors: ["#111827", "#15803d"] as const // Black and Green
  },
  carvingFreeMarkersFeet: [1490, 1510] as const,
  walls: {
    ceilingHeightFeet: 40,
    skyColor: "#7dd3fc", // Seamless light-blue sky motif
    cloudColor: "#ffffff",
    pyramidGoldColor: "#facc15",
    horizonGreenColor: "#22c55e",
    west: { motifs: ["light_blue_sky", "white_clouds", "gold_pyramids"], entranceYRange: [1490, 1510] as const },
    east: { motifs: ["light_blue_sky", "white_clouds", "gold_pyramids"], exitArchwayYRange: [1490, 1510] as const },
    south: { motifs: ["light_blue_sky", "white_clouds", "gold_pyramids"], markerClearXRange: [1490, 1510] as const },
    north: { motifs: ["light_blue_sky", "green_horizon"], markerClearXRange: [1490, 1510] as const }
  },
  exitArchway: {
    wall: "east" as const,
    globalX: 7000,
    yRange: [1490, 1510] as const,
    widthFeet: 20,
    heightFeet: 20,
    leadsToWorld: 2,
    leadsToLevel: 1
  }
};

/**
 * Computes analytical checkerboard parity (0 = Black, 1 = Green) for 24"x24" (2 ft x 2 ft) tiles.
 */
export function getTempleFoyerTileColor(localXFeet: number, localYFeet: number): string {
  const ix = Math.floor(localXFeet / WORLD2_TEMPLE_FOYER_SPEC.floorDesign.tileSizeFeet);
  const iy = Math.floor(localYFeet / WORLD2_TEMPLE_FOYER_SPEC.floorDesign.tileSizeFeet);
  return (ix + iy) % 2 === 0
    ? WORLD2_TEMPLE_FOYER_SPEC.floorDesign.colors[0]
    : WORLD2_TEMPLE_FOYER_SPEC.floorDesign.colors[1];
}

export default WORLD2_TEMPLE_FOYER_SPEC;
