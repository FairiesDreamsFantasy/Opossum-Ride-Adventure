/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";

/**
 * Scientific preview configurations for compact male Jack steeds.
 */
export const COMPACT_JACK_PREVIEWS: Record<string, OpossumPreviewConfig> = {
  default_jack: {
    bodyColor: "#78350f",
    outlineColor: "#451a03",
    scale: 0.95,
    tailColor: "#451a03",
    tailLineWidth: 4.8,
    tailHasSpiral: false,
    tailSpiralColor: "",
    isFurryTail: true,
    furryTailPercentage: 4.0,
    hasNecklace: false,
    necklaceColor: "",
    hasHeartCharm: false,
    heartCharmColor: "",
    hasEarRings: false,
    earRingsColor: "",
    earRingsSide: "none",
    bodyPattern: "none",
    bodyPatternColors: [],
    headHeight: 30,
    noseColor: "#991b1b",
    earColor: "#7c2d12",
    faceColor: "#d2b48c",
    earOrientation: "default",
    earPattern: "none",
    earPatternColors: []
  }
};

export function getCompactJackPreview(id: string): OpossumPreviewConfig {
  return COMPACT_JACK_PREVIEWS[id] || COMPACT_JACK_PREVIEWS["default_jack"];
}

export default getCompactJackPreview;
