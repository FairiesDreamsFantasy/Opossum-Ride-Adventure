/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * AI preview parameters for Isaac Opossum:
 * Compact male Jack steed, 3'1.5" shoulder height, Light-Gray base coat with 8 evenly spaced dark-brown stripes,
 * Natural dark outer ears, Natural pink inner ears, Dark-brown eyes, Pinkish-red nose, Natural pink tail, 100% furry face.
 */
export const ISAAC_AI_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#D1D5DB",
  outlineColor: "#3E2723",
  scale: 0.76,
  tailColor: "#FFC0CB",
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
  bodyPatternColors: ["#3E2723"],
  headHeight: 24.5,
  noseColor: "#EF4444",
  earColor: "#1A1A1A",
  faceColor: "#E5E7EB",
  earOrientation: "upright",
  earPattern: "none",
  earPatternColors: []
};

export default ISAAC_AI_PREVIEW_CONFIG;
