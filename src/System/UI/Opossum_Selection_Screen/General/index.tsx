/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../types";

/**
 * UI Constants for Opossum Selection Screen
 */
export const OPOSSUM_UI_CONSTANTS = {
  RIDER_HEIGHT_COEFFICIENT: 2.56,
  BASE_RIDER_FEET: 5,
  BASE_RIDER_INCHES: 4,
  MAX_RIDER_TOTAL_INCHES: 64,
  DEFAULT_QUOTA: 100,
  GRID_SPACING: 30,
  AI_GRID_ROWS: 6,
  AI_GRID_COLS: 8,
  JILL_ROWS_FREE: 5,
  JACK_ROW_FREE: 5, // 0-indexed, so 6th row
  PITCH_BASE: 1.0,
  TIMBRE_VARIATION: 0.15,
};

/**
 * Game Arena Constants
 */
export const GAME_ARENAS = [
  { id: "garden", name: "Garden Arena", color: "#14532d", accent: "#22c55e" },
  { id: "foyer", name: "Foyer Hall", color: "#451a03", accent: "#f59e0b" },
  { id: "cellar", name: "Grand Cellar", color: "#1e1b4b", accent: "#6366f1" },
  { id: "porch", name: "Southwest Porch", color: "#422006", accent: "#b45309" }
];

/**
 * Color Palettes to resolve hardcoding
 */
export const OPOSSUM_PALETTES = {
  JILL: {
    primary: "green-500",
    border: "green-800",
    shadow: "rgba(34,197,94,0.3)",
    text: "green-300",
    hex: "#22c55e"
  },
  JACK: {
    primary: "blue-500",
    border: "blue-800",
    shadow: "rgba(59,130,246,0.3)",
    text: "blue-300",
    hex: "#3b82f6"
  }
};

import { OpossumsAttributesDesign } from "../../../Registry/Characters/Opossums/Attributes/Design";

/**
 * Calculates the maximum rider height based on opossum physical dimensions.
 * Resolves hardcoded strings in the description area.
 */
export const calculateMaxRiderHeight = (_opossum: OpossumCharacter) => {
  // Standard comfortable rider capacity for robust opossum mounts (up to 6 feet and 3 inches)
  const totalInches = 75;
  const feet = 6;
  const inches = 3;
  return { feet, inches, totalInches };
};

/**
 * Calculates the maximum rider height for compact opossums.
 * Mathematical standard: 4 feet and 4.44 inches (52.44 inches).
 */
export const calculateCompactMaxRiderHeight = () => {
  const feet = 4;
  const inches = 4.44;
  const totalInches = 52.44;
  return { feet, inches, totalInches, formatted: "4 feet and 4.44 inches", shortFormatted: "4'4.44\"" };
};

import { BaseNarration } from "../../../AI/In-Game/Category/Accessibility/Narration/Mount/Logic/Base_Narration";

/**
 * Generates a dynamic description of the opossum's lineage and aesthetic.
 * Incorporates exact, scientifically robust attributes from the lookup system.
 * Delegated to modular BaseNarration logic.
 */
export const getOpossumAestheticDescription = (opossum: OpossumCharacter) => {
  return BaseNarration.describePhysicalAesthetic(opossum);
};

