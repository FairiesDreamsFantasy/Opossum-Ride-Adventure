/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ItemColorContrastSolver — WCAG-Informed Item Palette & Wireframe Stroke Resolver.
 */

export interface ItemRenderPalette {
  fillHex: string;
  strokeHex: string;
  highlightHex: string;
}

export class ItemColorContrastSolver {
  private static readonly ITEM_PALETTES: Readonly<Record<string, ItemRenderPalette>> = {
    apple: { fillHex: "#ef4444", strokeHex: "#fca5a5", highlightHex: "#fee2e2" },
    berry: { fillHex: "#a855f7", strokeHex: "#d8b4fe", highlightHex: "#f3e8ff" },
    tick: { fillHex: "#eab308", strokeHex: "#fde047", highlightHex: "#fef9c3" }
  };

  /**
   * Resolves deterministic item fill/stroke colors with wireframe override safety.
   */
  public static resolveItemPalette(type: string, wireframe: boolean): ItemRenderPalette {
    const key = (type || "").toLowerCase();
    const base = this.ITEM_PALETTES[key] || { fillHex: "#22c55e", strokeHex: "#86efac", highlightHex: "#dcfce7" };
    if (wireframe) {
      return {
        fillHex: "transparent",
        strokeHex: key === "tick" ? "#fde047" : "#f43f5e",
        highlightHex: "#ffffff"
      };
    }
    return base;
  }
}
