/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * AI preview parameters for Eugene Rose:
 * Compact Jack opossum steed, 3'10.00932" shoulder height (46.00932 inches),
 * Light-Gray body fur, Dark-Gray outer ears, Pink inner ears, Pink nose, Pink tail, White paws, Peach paw pads, Green eyes.
 */
export const EUGENE_AI_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#9ca3af", // Light-Gray fur
  outlineColor: "#374151",
  scale: 0.96,
  tailColor: "#ec4899", // Pink tail
  tailLineWidth: 4.5,
  tailHasSpiral: false,
  tailSpiralColor: "",
  isFurryTail: false,
  furryTailPercentage: 0,
  hasNecklace: false,
  necklaceColor: "",
  hasHeartCharm: false,
  heartCharmColor: "",
  hasEarRings: false,
  earRingsColor: "",
  earRingsSide: "none",
  bodyPattern: "none",
  bodyPatternColors: [],
  headHeight: 28,
  noseColor: "#ec4899", // Pink nose
  earColor: "#374151", // Dark-Gray outer ear
  faceColor: "#ffedd5", // Peach skin
  earOrientation: "upright",
  earPattern: "none",
  earPatternColors: []
};

export default EUGENE_AI_PREVIEW_CONFIG;
