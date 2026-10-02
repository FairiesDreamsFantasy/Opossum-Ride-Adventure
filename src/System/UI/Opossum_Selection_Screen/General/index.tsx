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
export const calculateMaxRiderHeight = (opossum: OpossumCharacter) => {
  const totalInches = Math.floor(opossum.width * OPOSSUM_UI_CONSTANTS.RIDER_HEIGHT_COEFFICIENT);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return { feet, inches, totalInches };
};

/**
 * Generates a dynamic description of the opossum's lineage and aesthetic.
 * Incorporates exact, scientifically robust attributes from the lookup system.
 */
export const getOpossumAestheticDescription = (opossum: OpossumCharacter) => {
  const opId = opossum.id === "arden_rosie" ? "arden_rosie_kone_reynolds" : opossum.id;
  const skinInfo = OpossumsAttributesDesign.Skin_Color.getByOpossumId(opId);
  const skinLabel = (OpossumsAttributesDesign.Skin_Color as any)[skinInfo.root]?.[skinInfo.tone]?.label || "Alabaster Off-White";
  const pattern = OpossumsAttributesDesign.With_Patterns.getByOpossumId(opId);
  const patternLabel = (OpossumsAttributesDesign.With_Patterns as any)[pattern]?.label || "Solid Plain";
  const furThickness = OpossumsAttributesDesign.Body_Fur_Thickness.getByOpossumId(opId);
  const furryFacePercentage = OpossumsAttributesDesign.Furry_Face.getByOpossumId(opId);
  const faceFurColor = OpossumsAttributesDesign._Furry_Face_Color.getByOpossumId(opId);
  const accessory = OpossumsAttributesDesign.Accessories.getByOpossumId(opId);
  const earLength = OpossumsAttributesDesign.Ear_Length.getByOpossumId(opId);
  const earOrient = OpossumsAttributesDesign.Ear_Orientation.getByOpossumId(opId);
  const pawCol = OpossumsAttributesDesign.Paw_Color.getByOpossumId(opId);
  const pawPadCol = OpossumsAttributesDesign.Paw_Pad_Color.getByOpossumId(opId);
  const tailDesign = OpossumsAttributesDesign.Tail_Color_With_Design.getByOpossumId(opId);
  const tailPct = OpossumsAttributesDesign.Furry_Tail_Percentage.getByOpossumId(opId);

  // Furry face sentence
  const faceText = furryFacePercentage > 0
    ? `She possesses a unique, partially furry face (${furryFacePercentage}% furry face skin coverage) with a lovely ${faceFurColor} face fur tone, contrasting with her main coat.`
    : `She features a completely hairless, smooth pink face skin, matching the delicate skin profile of conventional opossums.`;

  // Tail design sentence
  const tailText = tailPct > 0
    ? `Her tail is ${tailPct}% covered in rich fur, featuring a specialized design: ${tailDesign}.`
    : `She has a classic, hairless tactile prehensile tail with a ${opossum.tailColor} coloration.`;

  // Accessories sentence
  const accText = accessory !== "None"
    ? `For adornment, she proudly wears handcrafted accessories: ${accessory}.`
    : "She wears no physical jewelry, displaying her natural grace and elegant form.";

  return `Her physical skin displays a beautiful ${skinLabel} tone under her ${furThickness} ${opossum.color} coat which is organized as a ${patternLabel}. ${faceText} Her paws are colored ${pawCol} with soft ${pawPadCol} paw pads underneath for perfect silent footing. Her ears are ${earLength} and set in a ${earOrient} orientation with a delicate ${opossum.innerEarColor} inner-ear lining. ${tailText} ${accText}`;
};

