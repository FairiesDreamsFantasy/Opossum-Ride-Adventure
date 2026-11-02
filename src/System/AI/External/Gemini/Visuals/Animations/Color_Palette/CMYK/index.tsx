/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CMYKColor, CMYK_CONSTANTS } from "./General";
import { RGBColor } from "../RGB/General";

/**
 * High-performance CMYK color conversions and color-separation operations.
 */
export const CMYKColorSystem = {
  /**
   * Converts standard RGB values into CMYK printing spaces.
   */
  fromRGB(rgb: RGBColor): CMYKColor {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const k = 1 - Math.max(r, g, b);
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 1 };
    }

    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);

    return {
      c: parseFloat(c.toFixed(4)),
      m: parseFloat(m.toFixed(4)),
      y: parseFloat(y.toFixed(4)),
      k: parseFloat(k.toFixed(4))
    };
  },

  /**
   * Converts CMYK values back into RGB monitor display space.
   */
  toRGB(cmyk: CMYKColor): RGBColor {
    const c = Math.max(CMYK_CONSTANTS.MIN_VALUE, Math.min(CMYK_CONSTANTS.MAX_VALUE, cmyk.c));
    const m = Math.max(CMYK_CONSTANTS.MIN_VALUE, Math.min(CMYK_CONSTANTS.MAX_VALUE, cmyk.m));
    const y = Math.max(CMYK_CONSTANTS.MIN_VALUE, Math.min(CMYK_CONSTANTS.MAX_VALUE, cmyk.y));
    const k = Math.max(CMYK_CONSTANTS.MIN_VALUE, Math.min(CMYK_CONSTANTS.MAX_VALUE, cmyk.k));

    return {
      r: Math.round(255 * (1 - c) * (1 - k)),
      g: Math.round(255 * (1 - m) * (1 - k)),
      b: Math.round(255 * (1 - y) * (1 - k))
    };
  }
};

export default CMYKColorSystem;
export * from "./General";
