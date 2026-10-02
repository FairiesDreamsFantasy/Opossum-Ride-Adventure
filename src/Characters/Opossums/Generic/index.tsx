/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GENERIC_COMPACT_OPOSSUM_SPEC } from "./General";
import { playCompactOpossumSound } from "../../../System/Sound/SFX/Category/Opossum/Compact";
export * from "./General";

export interface CompactOpossumEntity {
  id: string;
  name: string;
  colorName: string;
  bodyFurColor: string;
  outerEarColor: string;
  innerEarColor: string;
  noseColor: string;
  tailColor: string;
  eyeColor: string;
  sex: "Jill" | "Jack";
  gender?: "Female" | "Male";
  shoulderHeightInches: number;
  bodyWidthInches: number;
  bodyLengthInches: number;
  headPosture: "Perched Forward";
  hasElegantChatter: false;
  category: "compact";
}

/**
 * Factory creating a standard compact opossum instance with perched forward geometry.
 * Dynamically supports both Jill (Female) and Jack (Male) without hardcoded lock-in.
 */
export function createCompactOpossum(
  id: string,
  colorName: string,
  bodyFurColor: string,
  outerEarColor: string,
  innerEarColor = "#FFB6C1",
  eyeColor = "#1A202C",
  noseColor = "#FFB6C1",
  tailColor = "#FFC0CB",
  sex: "Jill" | "Jack" = "Jill"
): CompactOpossumEntity {
  const gender: "Female" | "Male" = sex === "Jack" ? "Male" : "Female";
  return {
    id,
    name: colorName,
    colorName,
    bodyFurColor,
    outerEarColor,
    innerEarColor,
    noseColor,
    tailColor,
    eyeColor,
    sex,
    gender,
    shoulderHeightInches: GENERIC_COMPACT_OPOSSUM_SPEC.shoulderHeightInches,
    bodyWidthInches: GENERIC_COMPACT_OPOSSUM_SPEC.bodyWidthInches,
    bodyLengthInches: GENERIC_COMPACT_OPOSSUM_SPEC.bodyLengthInches,
    headPosture: GENERIC_COMPACT_OPOSSUM_SPEC.headPosture,
    hasElegantChatter: false,
    category: "compact"
  };
}

export const GenericCompactOpossum = {
  Spec: GENERIC_COMPACT_OPOSSUM_SPEC,
  create: createCompactOpossum
};

/**
 * Converts a CompactOpossumEntity or definition into a full OpossumCharacter.
 * Dynamically evaluates sex and gender without hardcoding.
 * Enables direct bareback gameplay with perched forward head posture and distinct compact SFX.
 */
export function convertCompactToCharacter(compact: {
  id: string;
  name: string;
  colorName: string;
  bodyFurColor: string;
  outerEarColor: string;
  innerEarColor?: string;
  noseColor?: string;
  tailColor?: string;
  eyeColor?: string;
  sex?: "Jill" | "Jack" | string;
  gender?: "Female" | "Male" | string;
}): import("../../../types").OpossumCharacter {
  const effectiveSex = compact.sex === "Jack" ? "Jack" : (compact.gender === "Male" ? "Jack" : "Jill");
  const effectiveGender: "Female" | "Male" = (compact.gender === "Male" || effectiveSex === "Jack") ? "Male" : "Female";

  return {
    id: compact.id as any,
    name: compact.colorName || compact.name,
    width: GENERIC_COMPACT_OPOSSUM_SPEC.bodyWidthInches,
    length: GENERIC_COMPACT_OPOSSUM_SPEC.bodyLengthInches,
    headWidth: 14,
    headHeight: 18,
    shoulderHeight: "3 feet",
    color: compact.bodyFurColor,
    eyeColor: compact.eyeColor || "#1A202C",
    noseColor: compact.noseColor || "#FFB6C1",
    tailColor: compact.tailColor || "#FFC0CB",
    innerEarColor: compact.outerEarColor, // Classic contrast
    gender: effectiveGender,
    sex: effectiveSex,
    headOrientation: "Perched Forward",
    description: `A 3'0" compact ${effectiveSex} (${effectiveGender}) opossum featuring ${compact.colorName} coloration with distinct outer ears. Built with high-cadence strides and perched-forward head posture, ideal for bareback riding by Sean White and George Blake.`,
    isAI: false,
    playChatter: (_ctx: AudioContext, _isRetro: boolean, _dest: AudioNode) => {
      // Offline Procedural Natural SFX instead of crafted vocal chatter sweeps
      playCompactOpossumSound("snuffle");
    }
  };
}
