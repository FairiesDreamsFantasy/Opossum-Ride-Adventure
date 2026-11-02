/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * AI preview parameters for Arnold Rose:
 * Compact Jack opossum steed, 3'8" shoulder height (44 inches),
 * Matte White base fur with dark-brown ovals (spotted dog pattern),
 * Dark-Brown outer ears, Pink inner ears, Brown nose, Pink tail, White paws, Pink paw pads, Light-Brown eyes.
 */
export const ARNOLD_AI_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#ffffff", // Matte White fur
  outlineColor: "#3e2723",
  scale: 0.92,
  tailColor: "#ffb6c1", // Pink tail
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
  bodyPattern: "polka-dots", 
  bodyPatternColors: ["#3e2723"], // Dark Brown spots
  headHeight: 28,
  noseColor: "#3e2723", // Brown nose
  earColor: "#3e2723", // Dark-Brown outer ear
  faceColor: "#ffedd5", // Peach skin
  earOrientation: "forward_leaning",
  earPattern: "none",
  earPatternColors: []
};

export default ARNOLD_AI_PREVIEW_CONFIG;
