/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type YouTubeThemeMode = "Strict Theme Match" | "Dynamic Inspiration" | "Free Exploration";

export interface YouTubeVideoItem {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  publishedAt: string;
  duration: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl: string;
  category: "TV" | "Movies" | "Childrens" | "Music" | "Podcasts" | "Live Broadcasts" | "The Zion Way" | "Ital Livity" | "Roots & Acoustics" | "Community & Ecology";
  tags: string[];
  babylonFreeVerified: boolean;
  zionWayFocus: string;
  viewsFormatted: string;
  isLiveBroadcast?: boolean;
  canvasBlendMatrix?: {
    luminousFlux: number;
    ambientColorRgb: [number, number, number];
    skyboxTint: string;
  };
}

export interface VideoArenaSynthesisConfig {
  sourceVideoId: string;
  sourceVideoTitle: string;
  category: string;
  themeMode: YouTubeThemeMode;
  terrainDifficulty: "Gentle" | "Moderate" | "Challenging" | "Exhilarating";
  customSeed?: number;
}

export interface VideoTranslatedArena {
  id: string;
  name: string;
  theme: string;
  sourceVideoId: string;
  sourceVideoTitle: string;
  topographyType: "Rolling Meadows" | "Alpine Crest" | "Highland Ravine" | "Lush Canopy Track" | "Coastal Vista";
  seed: number;
  heightmapFunction: string;
  lightingPalette: {
    sunColor: string;
    ambientColor: string;
    fogDensity: number;
    skyGradient: [string, string];
  };
  obstacleDistribution: {
    fallenLogs: number;
    vaultRamps: number;
    streamCrossings: number;
    observationPoints: number;
  };
  generatedAt: number;
}

export interface YouTubeResultSet {
  query: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  videos: YouTubeVideoItem[];
}

export interface YouTubeSearchFilter {
  category?: string;
  sortBy?: "relevance" | "newest" | "views";
  themeMode?: YouTubeThemeMode;
  liveOnly?: boolean;
}
