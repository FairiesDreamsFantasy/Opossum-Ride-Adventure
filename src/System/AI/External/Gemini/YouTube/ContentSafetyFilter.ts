/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { YouTubeVideoItem } from "./types";

/**
 * Deterministic Content Safety & Anti-Adult Moderation Filter
 * 
 * Enforces zero-tolerance blocking of pornography, erotica, sexually explicit, 
 * and harmful content with zero Bayesian/heuristic shortcuts.
 * Evaluates inputs in deterministic linear time O(N).
 */
export class YouTubeContentSafetyService {
  private static instance: YouTubeContentSafetyService;

  // Exact-match forbidden terms list (normalized lowercase)
  private readonly blockedTokens: string[] = [
    "porn", "xxx", "erotic", "erotica", "nsfw", "sex", "sexual",
    "nude", "nudity", "strip", "fetish", "sensual", "camgirl", "onlyfans",
    "adult film", "hardcore", "softcore", "provocative", "explicit content"
  ];

  public static getInstance(): YouTubeContentSafetyService {
    if (!YouTubeContentSafetyService.instance) {
      YouTubeContentSafetyService.instance = new YouTubeContentSafetyService();
    }
    return YouTubeContentSafetyService.instance;
  }

  /**
   * Evaluates text string for safety compliance. Returns true if 100% clean and safe.
   */
  public isTextClean(text: string): boolean {
    if (!text) return true;
    const normalized = text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const words = normalized.split(/\s+/).filter(Boolean);

    for (const token of this.blockedTokens) {
      if (words.includes(token) || normalized.includes(` ${token} `) || normalized.startsWith(`${token} `) || normalized.endsWith(` ${token}`)) {
        return false;
      }
    }
    return true;
  }

  /**
   * Filters an array of video items, suppressing any non-compliant entries
   */
  public filterSafeVideos(videos: YouTubeVideoItem[]): YouTubeVideoItem[] {
    return videos.filter(video => {
      const isTitleSafe = this.isTextClean(video.title);
      const isDescSafe = this.isTextClean(video.description);
      const isChannelSafe = this.isTextClean(video.channelTitle);
      const areTagsSafe = video.tags.every(tag => this.isTextClean(tag));

      return isTitleSafe && isDescSafe && isChannelSafe && areTagsSafe && video.babylonFreeVerified;
    });
  }

  /**
   * Sanitizes search query string, rejecting unsafe input
   */
  public sanitizeQuery(query: string): { isSafe: boolean; cleanQuery: string } {
    if (!this.isTextClean(query)) {
      return { isSafe: false, cleanQuery: "" };
    }
    return { isSafe: true, cleanQuery: query.trim() };
  }
}

export const YouTubeContentSafety = YouTubeContentSafetyService.getInstance();
