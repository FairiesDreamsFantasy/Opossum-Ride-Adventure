/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../types";

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
}

/**
 * AI-driven mapping of opossum physical traits for high-fidelity dynamic previews.
 */
export function getOpossumPreviewConfig(id: OpossumId): OpossumPreviewConfig {
  const defaultConfig: OpossumPreviewConfig = {
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
    faceColor: "#f3f4f6"
  };

  switch (id) {
    case OpossumId.MELISSA:
      return {
        ...defaultConfig,
        bodyColor: "#d3d3d3",
        outlineColor: "#9ca3af",
        scale: 1.0,
        headHeight: 35,
      };

    case OpossumId.ASHLEY:
      return {
        ...defaultConfig,
        bodyColor: "#eab308",
        outlineColor: "#ca8a04",
        scale: 1.05,
        headHeight: 36,
        earColor: "#dc2626"
      };

    case OpossumId.AMARA_QIN:
      return {
        ...defaultConfig,
        bodyColor: "#ffffff",
        outlineColor: "#d1d5db",
        scale: 1.0,
        headHeight: 38,
      };

    case OpossumId.SAFFRON_ROSE:
      return {
        ...defaultConfig,
        bodyColor: "#ff5f1f",
        outlineColor: "#c03a00",
        scale: 1.1,
        tailColor: "#ffd700", // Gold
        tailLineWidth: 6.3,
        tailHasSpiral: true,
        tailSpiralColor: "#ff69b4", // Pink
        isFurryTail: false, // 0% furry tail confirmed
        furryTailPercentage: 0,
        hasNecklace: true,
        necklaceColor: "#10b981", // Green necklace
        hasHeartCharm: true,
        heartCharmColor: "#f43f5e", // Heart-shaped charm
        headHeight: 46,
        noseColor: "#ff5f1f",
        earColor: "#ff1493",
        faceColor: "#f5deb3" // Wheat tan skin
      };

    case OpossumId.JALISSA_CHIN:
      return {
        ...defaultConfig,
        bodyColor: "#f59e0b",
        outlineColor: "#d97706",
        scale: 1.0,
        tailColor: "#db2777",
        headHeight: 38,
        noseColor: "#db2777",
        earColor: "#f472b6",
        faceColor: "#f3f4f6"
      };

    case OpossumId.ARDEN_ROSIE:
      return {
        ...defaultConfig,
        bodyColor: "#fff7ed",
        outlineColor: "#fff1e2",
        scale: 1.05,
        tailColor: "#db2777",
        tailLineWidth: 6.18,
        hasEarRings: true,
        earRingsColor: "#fbbf24", // Gold hoop
        earRingsSide: "left",
        bodyPattern: "diamonds",
        bodyPatternColors: ["#ef4444", "#facc15", "#f472b6", "#fbbf24", "#6b7280", "#f97316", "#ffffff"],
        headHeight: 40,
        earColor: "#db2777",
        faceColor: "#ffedd5"
      };

    case OpossumId.JAHMELLA_ROSE:
      return {
        ...defaultConfig,
        bodyColor: "#f97316",
        outlineColor: "#ea580c",
        scale: 1.1,
        tailColor: "#db2777",
        tailLineWidth: 6.3,
        tailHasSpiral: true,
        tailSpiralColor: "#fbbf24", // Yellow dash spiral pattern
        hasEarRings: true,
        earRingsColor: "#9ca3af", // Silver hoop
        earRingsSide: "left",
        bodyPattern: "polka-dots",
        bodyPatternColors: ["#ffffff"],
        headHeight: 45,
        noseColor: "#f97316",
        earColor: "#f97316",
        faceColor: "#d2b48c"
      };

    case OpossumId.DAGMAR_KONE_REYNOLDS:
      return {
        ...defaultConfig,
        bodyColor: "#ffffff",
        outlineColor: "#f3f4f6",
        scale: 1.1,
        tailColor: "#db2777",
        tailLineWidth: 6.3,
        hasEarRings: true,
        earRingsColor: "#b76e79", // Rose gold hoops
        earRingsSide: "both",
        hasNecklace: true,
        necklaceColor: "#fbbf24", // Gold chain
        hasHeartCharm: true,
        heartCharmColor: "#e5e7eb", // Silver charm
        bodyPattern: "diamonds",
        bodyPatternColors: ["#ffffff", "#ef4444", "#facc15", "#6b7280", "#c68e17", "#b87333", "#fff7ed", "#000000", "#d1d5db", "#f5f5dc", "#c0c0c0", "#ff8c00", "#ffc0cb", "#d2b48c"],
        headHeight: 44,
        faceColor: "#ffedd5"
      };

    case OpossumId.AGAPE_ROSE:
      return {
        ...defaultConfig,
        bodyColor: "#fbbf24",
        outlineColor: "#d97706",
        scale: 1.1,
        tailColor: "#db2777",
        isFurryTail: true, // 2% gold fur layer
        furryTailPercentage: 2,
        bodyPattern: "polka-dots",
        bodyPatternColors: ["#f472b6"], // Pink circles
        headHeight: 46,
        noseColor: "#db2777",
        earColor: "#db2777",
        faceColor: "#d2b48c"
      };

    case OpossumId.ROXANNE_KONE_REYNOLDS:
      return {
        ...defaultConfig,
        bodyColor: "#facc15",
        outlineColor: "#ca8a04",
        scale: 1.15,
        tailColor: "#db2777",
        isFurryTail: true, // 0.0001% yellow fur
        furryTailPercentage: 0.0001,
        bodyPattern: "diamonds",
        bodyPatternColors: ["#ef4444", "#f97316", "#ffffff"],
        headHeight: 44.88,
        noseColor: "#ff69b4",
        earColor: "#ffb6c1",
        faceColor: "#facc15" // Fully furry face
      };

    case OpossumId.TIANA_QIN:
      return {
        ...defaultConfig,
        bodyColor: "#ef4444",
        outlineColor: "#dc2626",
        scale: 1.05,
        headHeight: 44.45,
      };

    case OpossumId.WANDA:
      return {
        ...defaultConfig,
        bodyColor: "#f59e0b",
        outlineColor: "#d97706",
        scale: 1.0,
        tailColor: "#ef4444",
        headHeight: 44.9999,
        noseColor: "#ef4444",
        earColor: "#7c2d12"
      };

    case OpossumId.OLIVIA_CHIN:
      return {
        ...defaultConfig,
        bodyColor: "#fef08a",
        outlineColor: "#facc15",
        scale: 1.05,
        tailColor: "#7c2d12",
        headHeight: 42,
        noseColor: "#7c2d12",
        earColor: "#7c2d12",
        faceColor: "#fef08a" // Fully furry face
      };

    case OpossumId.RUTH_KONE_REYNOLDS:
      return {
        ...defaultConfig,
        bodyColor: "#f472b6",
        outlineColor: "#ec4899",
        scale: 1.15,
        bodyPattern: "flowers", // Pink with 25-color flower motifs
        bodyPatternColors: ["#ef4444", "#f97316", "#facc15", "#4ade80", "#60a5fa", "#c084fc"],
        headHeight: 44.88,
        earColor: "#7c2d12"
      };

    case OpossumId.KADY_ROSE:
      return {
        ...defaultConfig,
        bodyColor: "#d3d3d3",
        outlineColor: "#9ca3af",
        scale: 1.1,
        tailColor: "#f97316",
        headHeight: 46,
        noseColor: "#f97316",
        earColor: "#7c2d12"
      };

    case OpossumId.SANDRA:
      return {
        ...defaultConfig,
        bodyColor: "#c084fc",
        outlineColor: "#a855f7",
        scale: 1.05,
        headHeight: 36,
      };

    default:
      return defaultConfig;
  }
}
