/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "../General";

export interface MobileStyleThemeColors {
  casingBg: string;
  bezelBorder: string;
  accentRed: string;
  accentGold: string;
  accentGreen: string;
  screenBorder: string;
  textPrimary: string;
}

export const CRAFTED_RASTAFARI_THEME: MobileStyleThemeColors = {
  casingBg: "#0c0a09", // Warm obsidian matte
  bezelBorder: "#27272a",
  accentRed: "#dc2626", // Rastafari Red
  accentGold: "#eab308", // Rastafari Gold
  accentGreen: "#16a34a", // Rastafari Green
  screenBorder: "#15803d",
  textPrimary: "#4ade80"
};
