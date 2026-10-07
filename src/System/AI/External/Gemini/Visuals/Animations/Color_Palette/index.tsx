/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RGBColorSystem } from "./RGB";
import { CMYKColorSystem } from "./CMYK";
import { TexturePalette } from "./Texture_Palette";
import { PatternPalette } from "./Pattern_Palette";
import { MonochromePalette } from "./Monochrome";
import { GrayscalePalette } from "./Monochrome/Grayscale";

export { RGBColorSystem } from "./RGB";
export { CMYKColorSystem } from "./CMYK";
export { TexturePalette } from "./Texture_Palette";
export { PatternPalette } from "./Pattern_Palette";
export { MonochromePalette } from "./Monochrome";
export { GrayscalePalette } from "./Monochrome/Grayscale";

/**
 * Atmospheric color shifts and HSL-based palletizing.
 */
export const AnimationsColorPalette = {
  RGB: RGBColorSystem,
  CMYK: CMYKColorSystem,
  Texture: TexturePalette,
  Pattern: PatternPalette,
  Monochrome: MonochromePalette,
  Grayscale: GrayscalePalette,

  /**
   * Generates a high-fidelity HSL color string dynamically.
   */
  getHSLString(hue: number, saturation: number, lightness: number): string {
    return `hsl(${hue % 360}, ${Math.max(0, Math.min(100, saturation))}%, ${Math.max(0, Math.min(100, lightness))}%)`;
  },

  /**
   * Blends two hex color codes with mathematical ratios.
   */
  blendHexColors(color1: string, color2: string, weight: number): string {
    const c1 = color1.replace("#", "");
    const c2 = color2.replace("#", "");
    
    const r1 = parseInt(c1.substring(0, 2), 16);
    const g1 = parseInt(c1.substring(2, 4), 16);
    const b1 = parseInt(c1.substring(4, 6), 16);

    const r2 = parseInt(c2.substring(0, 2), 16);
    const g2 = parseInt(c2.substring(2, 4), 16);
    const b2 = parseInt(c2.substring(4, 6), 16);

    const r = Math.round(r1 * (1 - weight) + r2 * weight);
    const g = Math.round(g1 * (1 - weight) + g2 * weight);
    const b = Math.round(b1 * (1 - weight) + b2 * weight);

    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
  }
};

