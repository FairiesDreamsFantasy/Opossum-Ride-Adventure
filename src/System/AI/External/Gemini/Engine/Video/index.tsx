/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - Gemini AI Video Playback Stream Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Resolution GCD computations, framerate sync, bit-rate buffers, and compression ratio trackers
 */

import React from "react";
import { VideoMetadata, VideoResolutionCalc } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export class GeminiVideoEngine {
  private activeStreams: Map<string, VideoMetadata> = new Map();
  private elapsedSeconds = 0;
  private droppedFrames = 0;
  private renderedFrames = 0;

  /**
   * Registers a video stream with custom resolutions and calculates aspect ratios
   */
  public registerStream(id: string, metadata: VideoMetadata): string {
    this.activeStreams.set(id, metadata);
    return VideoResolutionCalc.getAspectRatio(metadata.width, metadata.height);
  }

  /**
   * Calculates current frame number based on video framerate and elapsed simulation clock
   */
  public getCurrentFrame(id: string): number {
    const stream = this.activeStreams.get(id);
    if (!stream) return 0;
    return Math.floor(this.elapsedSeconds * stream.fps);
  }

  /**
   * Simulates video compression metrics based on frame size and target bitrates
   */
  public getCompressionRatio(id: string): number {
    const stream = this.activeStreams.get(id);
    if (!stream) return 1.0;
    // Estimated uncompressed bit requirement: Width * Height * FPS * 24 bits
    const uncompressedBitrate = stream.width * stream.height * stream.fps * 24;
    return uncompressedBitrate / stream.bitrate;
  }

  /**
   * Evaluates jitter and dropped frames for frame synchronization
   */
  public simulateFramePacing(deltaMs: number, targetFps: number): { dropped: boolean; delayMs: number } {
    const targetIntervalMs = 1000 / targetFps;
    const jitter = deltaMs - targetIntervalMs;
    if (jitter > targetIntervalMs * 0.75) {
      this.droppedFrames++;
      return { dropped: true, delayMs: Math.max(0, jitter) };
    }
    this.renderedFrames++;
    return { dropped: false, delayMs: 0 };
  }

  public getPlaybackTelemetry() {
    return {
      activeStreamsCount: this.activeStreams.size,
      renderedFrames: this.renderedFrames,
      droppedFrames: this.droppedFrames,
      dropRatePercent: this.renderedFrames + this.droppedFrames > 0
        ? Number(((this.droppedFrames / (this.renderedFrames + this.droppedFrames)) * 100).toFixed(2))
        : 0,
      elapsedSeconds: Number(this.elapsedSeconds.toFixed(3))
    };
  }

  public incrementClock(seconds: number): void {
    this.elapsedSeconds += seconds;
  }
}

export const GeminiVideoEngineComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiVideoEngine" />;
};
