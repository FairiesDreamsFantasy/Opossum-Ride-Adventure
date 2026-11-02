/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * AI preview parameters for Drake Kone-Reynolds:
 * Stocky male Jack compact steed, 4'0"-4'2" shoulder height (for riders up to 4 feet tall),
 * Red coat with 7 vertical silver stripes with 1cm black border, green eyes, red nose, red short-tail.
 */
export const DRAKE_AI_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#dc2626", // Red coat
  outlineColor: "#991b1b",
  scale: 1.05,
  tailColor: "#dc2626",
  tailLineWidth: 5.5,
  tailHasSpiral: false,
  tailSpiralColor: "",
  isFurryTail: true,
  furryTailPercentage: 5,
  hasNecklace: false,
  necklaceColor: "",
  hasHeartCharm: false,
  heartCharmColor: "",
  hasEarRings: false,
  earRingsColor: "",
  earRingsSide: "none",
  bodyPattern: "diamonds", // Visual motif indicator
  bodyPatternColors: ["#ffffff", "#000000", "#e2e8f0"],
  headHeight: 36,
  noseColor: "#ef4444", // Bright red
  earColor: "#451a03", // Dark-brown outer ear
  faceColor: "#a16207", // Light-brown skin
  earOrientation: "forward_leaning",
  earPattern: "none",
  earPatternColors: []
};

export default DRAKE_AI_PREVIEW_CONFIG;
