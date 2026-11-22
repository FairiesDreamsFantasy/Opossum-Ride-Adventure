/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProceduralPatternSampler } from "./ProceduralPatternSampler";
import { TilingFrequencyStabilizer } from "./TilingFrequencyStabilizer";

export * from "./ProceduralPatternSampler";
export * from "./TilingFrequencyStabilizer";

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

export const PatternPaletteSolver = {
  Sampler: ProceduralPatternSampler,
  Stabilizer: TilingFrequencyStabilizer,

  samplePatternColor: (
    kind: "checkers" | "stripes" | "grid",
    x: number,
    y: number
  ): string => {
    if (kind === "checkers") {
      const cell = ProceduralPatternSampler.sampleCheckerboard(x, y, PatternPalette.checkers.size);
      return PatternPalette.checkers.colors[cell] ?? PatternPalette.checkers.colors[0];
    }
    if (kind === "stripes") {
      const phase = ProceduralPatternSampler.sampleRotatedStripes(
        x,
        y,
        PatternPalette.stripes.angle,
        PatternPalette.stripes.spacing
      );
      return phase < 0.5 ? PatternPalette.stripes.color : "transparent";
    }
    return ProceduralPatternSampler.sampleOrthogonalGrid(x, y, PatternPalette.grid.spacing)
      ? PatternPalette.grid.color
      : "transparent";
  }
};
