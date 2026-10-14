/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface YouTubeNewsItem {
  id: string;
  title: string;
  source: string;
  category: "World News" | "Science & Tech" | "Environment & Climate" | "Agriculture & Nature" | "Live News Broadcasts";
  publishedAt: string;
  thumbnailUrl: string;
  videoUrl: string;
  embedUrl: string;
  isLive: boolean;
  summary: string;
  verifiedSource: boolean;
}

export interface YouTubeNewsResultSet {
  query: string;
  totalResults: number;
  currentPage: number;
  totalPages: number;
  items: YouTubeNewsItem[];
}
