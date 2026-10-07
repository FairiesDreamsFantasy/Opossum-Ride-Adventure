/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Pattern Palette Definition
 * Declares geometric fill patterns, tiling frequencies, and vector alignments.
 */
export const PatternPalette = {
  checkers: {
    type: "checkerboard",
    size: 32,
    colors: ["#222222", "#333333"],
    description: "Alternating dual-tone tiles."
  },
  stripes: {
    type: "linear",
    angle: 45,
    spacing: 16,
    color: "#444444",
    description: "Serrated safety warning stripes."
  },
  grid: {
    type: "orthogonal",
    spacing: 24,
    color: "#555555",
    description: "Orthogonal structural wire grid."
  }
};
