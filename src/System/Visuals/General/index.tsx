/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scientific Visual Constants
 * Defines core rendering coefficients to eliminate hardcoded magic numbers.
 */
export const VISUAL_CONSTANTS = {
  // Grayscale Luminance Coefficients (Rec. 601)
  LUMINANCE: {
    R: 0.299,
    G: 0.587,
    B: 0.114
  },
  
  // Retro Filter Parameters
  RETRO: {
    PHOSPHOR_GLOW: 1.1,
    AMBER_R: 1.2,
    AMBER_G: 0.75,
    AMBER_B: 0.1,
    SCANLINE_OPACITY: 0.12,
    SCANLINE_SPACING: 4
  },
  
  // Camera & Projection
  CAMERA: {
    DEFAULT_FOCAL_LENGTH: 320,
    DEFAULT_HORIZON_RATIO: 0.45,
    MIN_Z: 0.5,
    CLIP_OFFSET: 50
  },

  // Global Visual Palette
  PALETTE: {
    ULTRA_BLACK: "#000000",
    INDIGO_SKY: "#1e1b4b",
    STAR_YELLOW: "#fef08a",
    FOREST_SHADOW: "#022c22",
    HORIZON_GREEN: "#22c55e",
    WALL_STONE: "#475569",
    FLOOR_SLATE: "#1e293b",
    LANE_LINE: "#ffffff",
    OBSTACLE_RED: "#ef4444",
    BRASS_POLISHED: "#d97706",
    BRASS_SHINY: "#fbbf24",
    SKY_CYAN: "#38bdf8",
    WOOD_DECK: "#7c2d12",
    GRASS_BRIGHT: "#86efac",
    GRASS_DARK: "#22c55e",
    CRASH_RED: "#b91c1c"
  },

  // Character-Specific Acoustic and Visual Profiles
  CHARACTERS: {
    ASHLEY: {
      FUR: "#facc15",
      STROKE: "#eab308",
      BODY: "#facc15"
    },
    MELISSA: {
      FUR: "#9ca3af",
      STROKE: "#6a7280",
      BODY: "#9ca3af"
    },
    ARDEN: {
      FUR: "#fff7ed",
      STROKE: "#fff1e2"
    },
    JAHMELLA: {
      FUR: "#f97316",
      STROKE: "#ea580c"
    },
    DAGMAR: {
      FUR: "#ffffff",
      STROKE: "#f3f4f6"
    },
    COMMON: {
      SNOUT: "#f9fafb",
      INNER_EAR: "#fda4af",
      EYE_DARK: "#111827",
      NOSE_PINK: "#e11d48"
    }
  }
};
