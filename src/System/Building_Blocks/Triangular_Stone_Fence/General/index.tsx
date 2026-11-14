/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Stacked Triangular Stone Fence General Specification
 * Categorized as an obstacle constructed from stacked triangular slate stone blocks.
 * Calibrated with meaningful jump height matching opossum jump arcs (peak Y = 3.0m, jumpable threshold > 0.8m)
 * and spacing strictly bounded between 500m minimum and 2000m maximum.
 */
export interface TriangularStoneFenceSpec {
  id: string;
  name: string;
  category: "Obstacle";
  material: "Slate";
  dimensions: {
    width: number;       // Blueprint width unit
    height: number;      // Blueprint height unit
    depth: number;       // Blueprint depth unit
    worldWidthM: number; // Course collision width in meters
    worldHeightM: number;// Course collision height in meters (calibrated for comfortable opossum jump)
    stoneSideInches: number;
    stackedTiers: number;
  };
  spacing: {
    minMeters: number;   // 500 meters minimum
    maxMeters: number;   // 2000 meters maximum
  };
  physics: {
    mass: number;
    restitution: number;
    friction: number;
    jumpClearanceY: number;
  };
  audio: {
    collision: "slate_stone_fence_clatter";
    surface: "slate";
    resonantFreqHz: number;
    thudFreqHz: number;
  };
  visuals: {
    stoneShape: "triangular";
    borderColors: ["Red", "Gold", "Green"];
    tierPaletteHex: [string, string, string];
  };
}

export const TRIANGULAR_STONE_FENCE_SPEC: TriangularStoneFenceSpec = {
  id: "obstacle_triangular_stone_fence",
  name: "Triangular Stone Fence",
  category: "Obstacle",
  material: "Slate",
  dimensions: {
    width: 128,
    height: 32,
    depth: 10,
    worldWidthM: 2.5,
    worldHeightM: 1.4,
    stoneSideInches: 12,
    stackedTiers: 3
  },
  spacing: {
    minMeters: 500,
    maxMeters: 2000
  },
  physics: {
    mass: 185,
    restitution: 0.25,
    friction: 0.68,
    jumpClearanceY: 0.8
  },
  audio: {
    collision: "slate_stone_fence_clatter",
    surface: "slate",
    resonantFreqHz: 1650,
    thudFreqHz: 105
  },
  visuals: {
    stoneShape: "triangular",
    borderColors: ["Red", "Gold", "Green"],
    tierPaletteHex: ["#475569", "#64748b", "#94a3b8"]
  }
};
