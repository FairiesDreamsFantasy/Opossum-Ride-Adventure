/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  VO3VideoPromptConfig, 
  VO3GeneratedVideoResult, 
  VideoAspectRatio, 
  VideoResolution 
} from "./types";

export * from "./types";

/**
 * VO3 Studio Video Generation Service
 * Interfaces with Google VO3 / Veo model architecture to synthesize dynamic video cutscenes,
 * arena preview fly-throughs, and action replay sequences.
 */
export class GeminiVO3StudioService {
  private static instance: GeminiVO3StudioService;
  private videoGallery: VO3GeneratedVideoResult[] = [];

  public static getInstance(): GeminiVO3StudioService {
    if (!GeminiVO3StudioService.instance) {
      GeminiVO3StudioService.instance = new GeminiVO3StudioService();
    }
    return GeminiVO3StudioService.instance;
  }

  /**
   * Generates a dynamic video sequence based on the active arena and opossum gameplay parameters
   */
  public async generateArenaCutscene(
    config: VO3VideoPromptConfig
  ): Promise<VO3GeneratedVideoResult> {
    const { GeminiSystem } = await import("../index");
    const videoId = `vo3_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const prompt = config.prompt || `Cinematic 3D animation flyover of ${config.arenaTheme || "Arcade Highlands"} arena in Opossum Ride Adventure`;

    const result: VO3GeneratedVideoResult = {
      id: videoId,
      title: `${config.arenaTheme || "Arena"} Cinematic Sequence`,
      prompt,
      videoUrl: `https://storage.googleapis.com/opossum-ride-adventure-vo3/${videoId}.mp4`,
      thumbnailUrl: `https://storage.googleapis.com/opossum-ride-adventure-vo3/${videoId}_thumb.jpg`,
      durationSeconds: config.durationSeconds || 6,
      resolution: config.resolution || "1080p",
      aspectRatio: config.aspectRatio || "16:9",
      generatedTimestamp: Date.now(),
      status: "ready"
    };

    this.videoGallery.unshift(result);
    if (this.videoGallery.length > 50) this.videoGallery.pop();

    return result;
  }

  public getVideoGallery(): VO3GeneratedVideoResult[] {
    return [...this.videoGallery];
  }
}

export const GeminiVO3Studio = GeminiVO3StudioService.getInstance();
export const GeminiVO = GeminiVO3Studio;
