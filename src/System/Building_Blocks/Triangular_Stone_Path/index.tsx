/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Triangular Slate Stone Path Building Block
 *
 * Defines the ground-oriented triangular flat Slate paving system used in Crop Fields:
 * - Main path blocks: Flat triangular Slate stones cycling through the 36 curated block colors
 *   (including corrected "Caramel").
 * - Edge divider stones: 12-inch (0.3048 m) triangular Slate border stones along both left and
 *   right shoulders cycling strictly in Red, Gold, and Green.
 * - Acoustic surface binding: "slate" (1650 Hz resonant bandpass, Q = 4.8, 105 Hz thud).
 */

export interface TriangularStoneColorSwatch {
  name: string;
  hex: string;
  strokeHex: string;
}

export const CROP_FIELD_BORDER_TRIANGLE_COLORS: readonly TriangularStoneColorSwatch[] = [
  { name: "Red", hex: "#DC2626", strokeHex: "#991B1B" },
  { name: "Gold", hex: "#EAB308", strokeHex: "#A16207" },
  { name: "Green", hex: "#16A34A", strokeHex: "#166534" }
] as const;

export const CROP_FIELD_PATH_36_BLOCK_COLORS: readonly TriangularStoneColorSwatch[] = [
  { name: "White", hex: "#FFFFFF", strokeHex: "#CBD5E1" },
  { name: "Pink", hex: "#F472B6", strokeHex: "#BE185D" },
  { name: "Blue", hex: "#2563EB", strokeHex: "#1E40AF" },
  { name: "Green", hex: "#16A34A", strokeHex: "#14532D" },
  { name: "Yellow", hex: "#FACC15", strokeHex: "#A16207" },
  { name: "Red", hex: "#DC2626", strokeHex: "#7F1D1D" },
  { name: "Orange", hex: "#F97316", strokeHex: "#9A3412" },
  { name: "Purple", hex: "#9333EA", strokeHex: "#581C87" },
  { name: "Indigo", hex: "#4F46E5", strokeHex: "#312E81" },
  { name: "Lavender", hex: "#C4B5FD", strokeHex: "#7C3AED" },
  { name: "Silver", hex: "#CBD5E1", strokeHex: "#64748B" },
  { name: "Gold", hex: "#EAB308", strokeHex: "#854D0E" },
  { name: "Bronze", hex: "#CD7F32", strokeHex: "#78350F" },
  { name: "Platinum", hex: "#E5E4E2", strokeHex: "#94A3B8" },
  { name: "Brass", hex: "#B5A642", strokeHex: "#713F12" },
  { name: "Gray", hex: "#6B7280", strokeHex: "#374151" },
  { name: "Black", hex: "#111827", strokeHex: "#334155" },
  { name: "Red-Orange", hex: "#EA580C", strokeHex: "#7C2D12" },
  { name: "Yellow-Orange", hex: "#F59E0B", strokeHex: "#92400E" },
  { name: "Blue-Green", hex: "#0D9488", strokeHex: "#115E59" },
  { name: "Blue-Violet", hex: "#6366F1", strokeHex: "#3730A3" },
  { name: "Red-Violet", hex: "#C026D3", strokeHex: "#701A75" },
  { name: "Violet", hex: "#7C3AED", strokeHex: "#4C1D95" },
  { name: "Yellow-Green", hex: "#84CC16", strokeHex: "#3F6212" },
  { name: "Coral", hex: "#FB7185", strokeHex: "#BE123C" },
  { name: "Amber", hex: "#D97706", strokeHex: "#78350F" },
  { name: "Brown", hex: "#78350F", strokeHex: "#451A03" },
  { name: "Caramel", hex: "#C68642", strokeHex: "#78350F" },
  { name: "Toffee", hex: "#9A5B25", strokeHex: "#5C3317" },
  { name: "Tan", hex: "#D2B48C", strokeHex: "#8B6F47" },
  { name: "Peach", hex: "#FDBA74", strokeHex: "#C2410C" },
  { name: "Ocean", hex: "#0284C7", strokeHex: "#075985" },
  { name: "Light-Green", hex: "#86EFAC", strokeHex: "#16A34A" },
  { name: "Light-Blue", hex: "#7DD3FC", strokeHex: "#0284C7" },
  { name: "Sky Blue", hex: "#38BDF8", strokeHex: "#0369A1" },
  { name: "Emerald", hex: "#10B981", strokeHex: "#065F46" }
] as const;

export const TRIANGULAR_SLATE_PATH_SPEC = {
  id: "path_triangular_slate_stone",
  name: "Triangular Slate Stone Path",
  category: "Paths",
  orientation: "ground" as const,
  surfaceMaterial: "slate",
  surfaceType: "flat triangular slate stone blocks",
  acoustics: {
    profileKey: "slate",
    resonantFreqHz: 1650,
    qFactor: 4.8,
    gain: 1.18,
    thudFreqHz: 105,
    kineticFrictionMu: 0.74
  },
  borderDividerStones: {
    sizeInches: 12,
    sizeMeters: 0.3048,
    shape: "triangular" as const,
    colors: CROP_FIELD_BORDER_TRIANGLE_COLORS
  },
  paverBlocks: {
    shape: "flat_triangular" as const,
    material: "Slate",
    palette: CROP_FIELD_PATH_36_BLOCK_COLORS
  }
};

export default TRIANGULAR_SLATE_PATH_SPEC;
