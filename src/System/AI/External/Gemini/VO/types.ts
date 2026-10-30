/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VideoAspectRatio = "16:9" | "9:16" | "1:1" | "4:3";
export type VideoResolution = "720p" | "1080p" | "4K";
export type VideoMotionIntensity = "Subtle" | "Cinematic" | "Action-Packed";

export interface VO3VideoPromptConfig {
  prompt: string;
  arenaTheme?: string;
  aspectRatio?: VideoAspectRatio;
  resolution?: VideoResolution;
  motionIntensity?: VideoMotionIntensity;
  durationSeconds?: number;
  includeOpossumMount?: boolean;
}

export interface VO3GeneratedVideoResult {
  id: string;
  title: string;
  prompt: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationSeconds: number;
  resolution: VideoResolution;
  aspectRatio: VideoAspectRatio;
  generatedTimestamp: number;
  status: "rendering" | "ready" | "failed";
}
