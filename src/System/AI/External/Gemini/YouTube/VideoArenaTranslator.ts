/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { YouTubeVideoItem, VideoArenaSynthesisConfig, VideoTranslatedArena } from "./types";

/**
 * Gemini Video & Movie to 3D Arena Translation Engine
 * 
 * Mathematically synthesizes deterministic 3D arena topographies, lighting matrices,
 * and traversal dynamics inspired by YouTube videos, movies, and gameplay streams.
 * Free of Babylon shortcuts — uses pure linear congruential generator seeds and continuous calculus heightfields.
 */
export class GeminiVideoArenaTranslatorService {
  private static instance: GeminiVideoArenaTranslatorService;
  private generatedArenas: Map<string, VideoTranslatedArena> = new Map();

  public static getInstance(): GeminiVideoArenaTranslatorService {
    if (!GeminiVideoArenaTranslatorService.instance) {
      GeminiVideoArenaTranslatorService.instance = new GeminiVideoArenaTranslatorService();
    }
    return GeminiVideoArenaTranslatorService.instance;
  }

  /**
   * Translates a string key into a deterministic 32-bit integer seed
   */
  private hashString(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return Math.abs(hash);
  }

  /**
   * Deterministic Linear Congruential Generator (LCG)
   */
  private lcg(seed: number, step: number): number {
    const a = 1664525;
    const c = 1013904223;
    const m = 4294967296;
    let s = (seed + step * 7919) % m;
    s = (a * s + c) % m;
    return s / m;
  }

  /**
   * Translates a chosen video into a complete 3D Arena specification
   */
  public translateVideoToArena(
    video: YouTubeVideoItem,
    config: Partial<VideoArenaSynthesisConfig> = {}
  ): VideoTranslatedArena {
    const seed = config.customSeed ?? this.hashString(video.id + video.title);
    const themeMode = config.themeMode || "Dynamic Inspiration";
    
    // Determine Topography Type based on video category and title dynamics
    let topographyType: VideoTranslatedArena["topographyType"] = "Rolling Meadows";
    if (video.category === "Movies" || video.title.toLowerCase().includes("mountain") || video.title.toLowerCase().includes("crest")) {
      topographyType = "Alpine Crest";
    } else if (video.category === "TV" || video.title.toLowerCase().includes("highland") || video.title.toLowerCase().includes("journey")) {
      topographyType = "Highland Ravine";
    } else if (video.category === "Roots & Acoustics" || video.category === "Ital Livity" || video.title.toLowerCase().includes("forest")) {
      topographyType = "Lush Canopy Track";
    } else if (video.category === "Live Broadcasts" || video.category === "Music") {
      topographyType = "Coastal Vista";
    }

    // Mathematical Lighting & Chromaticity Matrix
    const rLcg = this.lcg(seed, 1);
    const gLcg = this.lcg(seed, 2);
    const bLcg = this.lcg(seed, 3);

    const sunColor = `rgb(${Math.floor(220 + rLcg * 35)}, ${Math.floor(200 + gLcg * 40)}, ${Math.floor(160 + bLcg * 60)})`;
    const ambientColor = `rgb(${Math.floor(40 + rLcg * 30)}, ${Math.floor(60 + gLcg * 40)}, ${Math.floor(50 + bLcg * 30)})`;
    const skyGradient: [string, string] = [
      `#${Math.floor(0x10 + rLcg * 0x15).toString(16).padStart(2, '0')}${Math.floor(0x20 + gLcg * 0x20).toString(16).padStart(2, '0')}${Math.floor(0x40 + bLcg * 0x30).toString(16).padStart(2, '0')}`,
      `#${Math.floor(0x40 + rLcg * 0x30).toString(16).padStart(2, '0')}${Math.floor(0x80 + gLcg * 0x40).toString(16).padStart(2, '0')}${Math.floor(0x90 + bLcg * 0x40).toString(16).padStart(2, '0')}`
    ];

    // Obstacle and Vault Ramp Distribution (no stomp mechanics, pure vaulting)
    const fallenLogs = Math.floor(6 + this.lcg(seed, 4) * 8);
    const vaultRamps = Math.floor(4 + this.lcg(seed, 5) * 6);
    const streamCrossings = Math.floor(2 + this.lcg(seed, 6) * 4);
    const observationPoints = Math.floor(3 + this.lcg(seed, 7) * 4);

    const translatedArena: VideoTranslatedArena = {
      id: `arena_yt_${video.id}_${seed.toString(36)}`,
      name: `${video.title.slice(0, 32)} (3D Arena)`,
      theme: `${video.category} • ${topographyType}`,
      sourceVideoId: video.id,
      sourceVideoTitle: video.title,
      topographyType,
      seed,
      heightmapFunction: `Z(x, y) = sin(${0.04 + rLcg * 0.03}*x)*cos(${0.04 + gLcg * 0.03}*y)*${(6.0 + bLcg * 8.0).toFixed(1)}`,
      lightingPalette: {
        sunColor,
        ambientColor,
        fogDensity: 0.015 + this.lcg(seed, 8) * 0.02,
        skyGradient
      },
      obstacleDistribution: {
        fallenLogs,
        vaultRamps,
        streamCrossings,
        observationPoints
      },
      generatedAt: Date.now()
    };

    this.generatedArenas.set(translatedArena.id, translatedArena);
    return translatedArena;
  }

  public getTranslatedArena(id: string): VideoTranslatedArena | undefined {
    return this.generatedArenas.get(id);
  }

  public getAllTranslatedArenas(): VideoTranslatedArena[] {
    return Array.from(this.generatedArenas.values());
  }
}

export const GeminiVideoArenaTranslator = GeminiVideoArenaTranslatorService.getInstance();
