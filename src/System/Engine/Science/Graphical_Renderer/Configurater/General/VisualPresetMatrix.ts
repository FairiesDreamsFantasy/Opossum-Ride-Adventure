/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * VisualPresetMatrix — Typed Visual Configuration Preset Matrix & Resolution Profiles.
 */

export interface RenderQualityDescriptor {
  id: "PERFORMANCE" | "QUALITY" | "CHALKBOARD_BLUEPRINT";
  is3D: boolean;
  resolutionScale: number;
  antiAliasing: boolean;
  wireframe: boolean;
}

export class VisualPresetMatrix {
  private static readonly PRESETS: Readonly<Record<RenderQualityDescriptor["id"], RenderQualityDescriptor>> = {
    PERFORMANCE: {
      id: "PERFORMANCE",
      is3D: false,
      resolutionScale: 1.0,
      antiAliasing: false,
      wireframe: false
    },
    QUALITY: {
      id: "QUALITY",
      is3D: true,
      resolutionScale: 2.0,
      antiAliasing: true,
      wireframe: false
    },
    CHALKBOARD_BLUEPRINT: {
      id: "CHALKBOARD_BLUEPRINT",
      is3D: false,
      resolutionScale: 1.0,
      antiAliasing: false,
      wireframe: true
    }
  };

  public static resolvePreset(name: string): RenderQualityDescriptor {
    const key = name.toUpperCase() as RenderQualityDescriptor["id"];
    return this.PRESETS[key] || this.PRESETS.QUALITY;
  }

  public static clampResolutionScale(scale: number): number {
    if (!Number.isFinite(scale)) return 1.0;
    return Math.max(0.5, Math.min(4.0, scale));
  }
}
