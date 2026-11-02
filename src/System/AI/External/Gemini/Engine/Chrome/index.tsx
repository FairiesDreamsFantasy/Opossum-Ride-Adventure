/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Google Chrome Browser Engine Simulation
 */

export class ChromeBrowserBridge {
  public static readonly userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  /**
   * Simulates a Chrome-specific rendering optimization.
   */
  public static optimizeRendering(canvas: any): void {
    if (canvas.getContext) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.imageSmoothingEnabled = true;
    }
  }
}

export default ChromeBrowserBridge;
