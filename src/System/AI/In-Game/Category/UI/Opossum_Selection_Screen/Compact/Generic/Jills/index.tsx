/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumPreviewConfig } from "../../../General";
import { CompactOpossumDefinition } from "../../../../../../../../../System/Registry/Characters/Opossums/Compact";

/**
 * Scientific preview configurations for compact female Jill steeds.
 */
export function getCompactJillPreview(def: CompactOpossumDefinition): OpossumPreviewConfig {
  return {
    bodyColor: def.bodyFurColor,
    outlineColor: "#374151",
    scale: 0.90, // 3'0" scale
    tailColor: def.tailColor,
    tailLineWidth: 4.0,
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
    noseColor: def.noseColor,
    earColor: def.outerEarColor,
    faceColor: "#f3f4f6",
    earOrientation: "default",
    earPattern: "none",
    earPatternColors: []
  };
}

export default getCompactJillPreview;
