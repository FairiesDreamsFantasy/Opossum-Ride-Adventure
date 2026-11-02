/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * AI preview parameters for Rudy Kone-Reynolds:
 * Compact male Jack opossum, 3' 7.5" shoulder height (for riders up to 4 feet tall),
 * Yellow base coat with 6-inch brown circles bounded by 1cm black border spaced 1.88 inches,
 * downward side-oriented dog-like ears (orange outer, brownish-red inner), blue eyes, brownish-red nose,
 * short dark-brown tail (7.128% furry).
 */
export const RUDY_AI_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#facc15", // Vibrant yellow base
  outlineColor: "#ca8a04",
  scale: 0.98,
  tailColor: "#451a03", // Dark-brown tail
  tailLineWidth: 4.8,
  tailHasSpiral: false,
  tailSpiralColor: "",
  isFurryTail: true,
  furryTailPercentage: 7.128,
  hasNecklace: false,
  necklaceColor: "",
  hasHeartCharm: false,
  heartCharmColor: "",
  hasEarRings: false,
  earRingsColor: "",
  earRingsSide: "none",
  bodyPattern: "polka-dots", // Brown bordered circles
  bodyPatternColors: ["#78350f", "#000000"],
  headHeight: 32,
  noseColor: "#991b1b", // Brownish-red
  earColor: "#ea580c", // Orange outer ears
  faceColor: "#451a03", // Dark-brown skin
  earOrientation: "side_down",
  earPattern: "none",
  earPatternColors: []
};

export default RUDY_AI_PREVIEW_CONFIG;
