/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../types";
import { getCraftedOpossumPreviewConfig } from "../Crafted";
import { resolveCompactPreviewConfig } from "../Compact";

export interface OpossumPreviewConfig {
  bodyColor: string;
  outlineColor: string;
  scale: number;
  tailColor: string;
  tailLineWidth: number;
  tailHasSpiral: boolean;
  tailSpiralColor: string;
  isFurryTail: boolean;
  furryTailPercentage: number;
  hasNecklace: boolean;
  necklaceColor: string;
  hasHeartCharm: boolean;
  heartCharmColor: string;
  hasEarRings: boolean;
  earRingsColor: string;
  earRingsSide: "left" | "right" | "both" | "none";
  bodyPattern: "none" | "diamonds" | "polka-dots" | "flowers";
  bodyPatternColors: string[];
  headHeight: number;
  noseColor: string;
  earColor: string;
  faceColor: string;
  earOrientation: "upright" | "upright_long" | "side_down" | "forward_leaning" | "scaled_default" | "default";
  earPattern: "none" | "diamonds" | "polka-dots" | "flowers";
  earPatternColors: string[];
}

export const DEFAULT_OPOSSUM_PREVIEW_CONFIG: OpossumPreviewConfig = {
  bodyColor: "#9ca3af",
  outlineColor: "#6b7280",
  scale: 1.0,
  tailColor: "#ffc0cb",
  tailLineWidth: 6.0,
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
  headHeight: 35,
  noseColor: "#ffb6c1",
  earColor: "#ffb6c1",
  faceColor: "#f3f4f6",
  earOrientation: "default",
  earPattern: "none",
  earPatternColors: []
};

/**
 * AI-driven mapping of opossum physical traits for high-fidelity dynamic previews.
 * Dynamically resolves through Crafted, Compact Crafted (Drake & Rudy), and Compact Generic.
 */
export function getOpossumPreviewConfig(id: OpossumId | string): OpossumPreviewConfig {
  // 1. Check Full-Sized Crafted Opossums
  const crafted = getCraftedOpossumPreviewConfig(id, DEFAULT_OPOSSUM_PREVIEW_CONFIG);
  if (crafted) return crafted;

  // 2. Check Compact Opossums (Crafted Jacks: Drake, Rudy; and Generic Jills)
  const compact = resolveCompactPreviewConfig(id as string);
  if (compact) return compact;

  // 3. Fallback Default
  return DEFAULT_OPOSSUM_PREVIEW_CONFIG;
}

export default getOpossumPreviewConfig;
