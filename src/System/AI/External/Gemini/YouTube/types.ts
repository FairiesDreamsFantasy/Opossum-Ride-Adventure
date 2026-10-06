/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  category: string;
  tags: string[];
  babylonFreeVerified: boolean;
  zionWayFocus: string;
  viewsFormatted: string;
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
}
