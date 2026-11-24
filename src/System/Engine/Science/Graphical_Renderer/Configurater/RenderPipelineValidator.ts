/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * RenderPipelineValidator — Validates Render Configuration & Resolution Invariants.
 */

import { VisualConfig } from "./General";
import { VisualPresetMatrix } from "./General/VisualPresetMatrix";

export class RenderPipelineValidator {
  /**
   * Sanitizes a VisualConfig object so runtime render loops never encounter NaN or out-of-range resolution values.
   */
  public static sanitizeVisualConfig(config: VisualConfig): VisualConfig {
    return {
      is3D: Boolean(config.is3D),
      resolution: VisualPresetMatrix.clampResolutionScale(config.resolution),
      antiAliasing: Boolean(config.antiAliasing),
      keyboardLayout: config.keyboardLayout
    };
  }

  /**
   * Computes pixel-aligned target backing dimensions for offscreen or primary canvas buffers.
   */
  public static resolveCanvasDimensions(
    baseWidth: number,
    baseHeight: number,
    resolutionScale: number
  ): { width: number; height: number } {
    const safeScale = VisualPresetMatrix.clampResolutionScale(resolutionScale);
    const w = Number.isFinite(baseWidth) && baseWidth > 0 ? baseWidth : 840;
    const h = Number.isFinite(baseHeight) && baseHeight > 0 ? baseHeight : 400;
    return {
      width: Math.max(160, Math.round(w * safeScale)),
      height: Math.max(120, Math.round(h * safeScale))
    };
  }
}
