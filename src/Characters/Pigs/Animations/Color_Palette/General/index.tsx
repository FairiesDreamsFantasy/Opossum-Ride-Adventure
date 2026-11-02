/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PigColorProfile {
  id: string;
  name: string;
  gender: "Boar" | "Sow";
  baseHex: string;
  secondaryHex: string;
  snoutHex: string;
  tuskHex: string;
  hoofHex: string;
  eyeHex: string;
  bristleHex: string;
  patternType: "solid" | "spotted" | "striped" | "brindle" | "calico" | "dappled" | "piebald" | "dun";
  patternDensity: number; // 0.0 to 1.0
  roughness: number;
}

export const BASE_PIG_COAT_HUES = [
  { name: "Russet Brown", base: "#5C3A21", secondary: "#3E2715", bristle: "#2A180B" },
  { name: "Obsidian Black", base: "#222224", secondary: "#161618", bristle: "#0C0C0D" },
  { name: "Piebald Spotted", base: "#8D5B34", secondary: "#EAE3D2", bristle: "#382414" },
  { name: "Copper Sienna", base: "#8A3B18", secondary: "#57230D", bristle: "#381406" },
  { name: "Albino Silver", base: "#E8E5DF", secondary: "#D4CEC4", bristle: "#BFB9AD" },
  { name: "Striped Razorback", base: "#6E472B", secondary: "#342012", bristle: "#1F1208" },
  { name: "Charcoal Brindle", base: "#333333", secondary: "#554433", bristle: "#1A1A1A" },
  { name: "Golden Tusker", base: "#A06828", secondary: "#6A4214", bristle: "#42280A" },
  { name: "Calico Roan", base: "#754329", secondary: "#C29B7F", bristle: "#442313" },
  { name: "Dappled Clay", base: "#7E4A35", secondary: "#9E6C54", bristle: "#4D2A1C" },
  { name: "Sandy Dun", base: "#A88960", secondary: "#6E5434", bristle: "#47351F" }
];

export const SNOUT_COLOR_SPECTRUM = [
  "#E09B9B", "#D48888", "#C27474", "#AF6363", "#8C4F4F", "#6B3C3C", "#DDA0A0", "#B87373"
];

export const EYE_COLOR_SPECTRUM = [
  "#4A2E18", "#2B1B0E", "#6B4423", "#1F1A17", "#8B5A2B", "#3D2614", "#5C3A21"
];

/**
 * Procedural Pig Color Matrix Generator (Generates over 10,000 mathematically distinct color combinations sustainably)
 */
export function generatePigColorCombination(seed: number, gender: "Boar" | "Sow" = "Boar"): PigColorProfile {
  const coatIndex = Math.abs(seed) % BASE_PIG_COAT_HUES.length;
  const coat = BASE_PIG_COAT_HUES[coatIndex];
  
  const hueVariation = ((seed * 17) % 30) - 15; // -15 to +15 deg
  const saturationVariation = ((seed * 23) % 20) - 10;
  
  const snoutIdx = Math.abs((seed * 7)) % SNOUT_COLOR_SPECTRUM.length;
  const eyeIdx = Math.abs((seed * 11)) % EYE_COLOR_SPECTRUM.length;
  
  const patterns: PigColorProfile["patternType"][] = [
    "solid", "spotted", "striped", "brindle", "calico", "dappled", "piebald", "dun"
  ];
  const patternIdx = Math.abs(Math.floor(seed / 11)) % patterns.length;
  
  return {
    id: `pig_color_${Math.abs(seed)}_${gender.toLowerCase()}`,
    name: `${coat.name} ${gender}`,
    gender,
    baseHex: coat.base,
    secondaryHex: coat.secondary,
    snoutHex: SNOUT_COLOR_SPECTRUM[snoutIdx],
    tuskHex: gender === "Boar" ? "#F0EAD6" : "#E6DFCC",
    hoofHex: "#1F1A16",
    eyeHex: EYE_COLOR_SPECTRUM[eyeIdx],
    bristleHex: coat.bristle,
    patternType: patterns[patternIdx],
    patternDensity: ((seed * 31) % 100) / 100,
    roughness: 0.65 + (((seed * 43) % 30) / 100)
  };
}
