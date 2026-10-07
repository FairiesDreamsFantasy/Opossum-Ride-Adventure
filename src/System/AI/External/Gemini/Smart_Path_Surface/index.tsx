/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type SurfaceType = "grass" | "stone" | "snow" | "mud" | "wood" | "metal" | "water";

export interface SurfaceAcoustics {
  resonance: number;
  damping: number;
  pitchShift: number;
  reverbMix: number;
}

/**
 * Intelligent Path Surface Detection.
 * Determines audible feedback characteristics based on terrain data.
 */
export class SmartPathSurface {
  private static readonly SURFACE_PROFILES: Record<SurfaceType, SurfaceAcoustics> = {
    grass: { resonance: 0.2, damping: 0.8, pitchShift: 1.0, reverbMix: 0.1 },
    stone: { resonance: 0.8, damping: 0.2, pitchShift: 1.2, reverbMix: 0.6 },
    snow: { resonance: 0.1, damping: 0.9, pitchShift: 0.8, reverbMix: 0.05 },
    mud: { resonance: 0.1, damping: 0.95, pitchShift: 0.7, reverbMix: 0.02 },
    wood: { resonance: 0.6, damping: 0.4, pitchShift: 1.1, reverbMix: 0.3 },
    metal: { resonance: 0.9, damping: 0.1, pitchShift: 1.5, reverbMix: 0.7 },
    water: { resonance: 0.3, damping: 0.6, pitchShift: 0.9, reverbMix: 0.4 }
  };

  public static getAcousticsForPosition(x: number, y: number, levelType: string): SurfaceAcoustics {
    let type: SurfaceType = "grass";

    // Logic based on level and coordinates
    if (levelType.includes("cave")) type = "stone";
    else if (levelType.includes("forest")) {
      type = (x % 500 < 100) ? "mud" : "grass";
    } else if (levelType.includes("mountain")) type = "snow";
    else if (levelType.includes("city")) type = "stone";

    return this.SURFACE_PROFILES[type];
  }

  public static getSurfaceType(x: number, y: number, levelType: string): SurfaceType {
    if (levelType.includes("cave")) return "stone";
    if (levelType.includes("mountain")) return "snow";
    if (levelType.includes("city")) return "stone";
    return "grass";
  }
}
