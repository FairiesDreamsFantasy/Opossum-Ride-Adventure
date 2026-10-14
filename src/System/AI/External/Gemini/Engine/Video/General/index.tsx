/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Video General Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Frame resolutions, video dimensions, and stream bitrates
 */

export interface VideoMetadata {
  format: "MP4" | "WEBM" | "AVI" | "MKV";
  width: number;
  height: number;
  fps: number;
  bitrate: number;
}

export class VideoResolutionCalc {
  public static getAspectRatio(width: number, height: number): string {
    const divisor = this.gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  }

  private static gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }
}
