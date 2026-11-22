/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * PaletteMoodClassifierAI — Heuristic Palette & Accessibility Contrast Selection AI.
 */

export type VisualMoodPaletteChoice = "full-color" | "grayscale" | "phosphor-green" | "cyberpunk-amber";

export class VisualPaletteMoodClassifierAI {
  public static recommendPalette(
    arenaAmbientType: string,
    highContrastPreferred: boolean = false
  ): VisualMoodPaletteChoice {
    if (highContrastPreferred) return "full-color";
    const key = typeof arenaAmbientType === "string" ? arenaAmbientType.toLowerCase() : "";
    if (key.includes("retro") || key.includes("terminal") || key.includes("computer")) {
      return "phosphor-green";
    }
    if (key.includes("amber") || key.includes("mine") || key.includes("subterranean")) {
      return "cyberpunk-amber";
    }
    if (key.includes("vintage") || key.includes("noir")) {
      return "grayscale";
    }
    return "full-color";
  }

  public static computeLuminanceContrastScore(fgR: number, fgG: number, fgB: number, bgR: number, bgG: number, bgB: number): number {
    const lum = (r: number, g: number, b: number) => {
      const clamp = (c: number) => Math.max(0, Math.min(255, Number.isFinite(c) ? c : 0)) / 255;
      const toLin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * toLin(clamp(r)) + 0.7152 * toLin(clamp(g)) + 0.0722 * toLin(clamp(b));
    };
    const l1 = lum(fgR, fgG, fgB);
    const l2 = lum(bgR, bgG, bgB);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
}
