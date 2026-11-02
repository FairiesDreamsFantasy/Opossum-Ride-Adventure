/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { captureCanvas, DOMCaptureOptions } from "./General";

/**
 * DOM and Screenshot coordinator for Opossum Ride Adventure.
 * Keeps canvas capture, HUD coordination, and non-interactive overlays clean and modular.
 */
export const DOMEngine = {
  /**
   * Capture a canvas image and trigger the download workflow.
   */
  takeScreenshot(
    canvas: HTMLCanvasElement | null,
    format: "png" | "jpg",
    customFileName?: string
  ): boolean {
    const mimeType = format === "png" ? "image/png" : "image/jpeg";
    const extension = format === "png" ? "png" : "jpg";
    
    let fileName = "";
    if (customFileName && customFileName.trim().length > 0) {
      const cleanedName = customFileName.trim().replace(/[/\\?%*:|"<>\s]/g, "_");
      fileName = `${cleanedName}.${extension}`;
    } else {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fileName = `Opossum_Ride_Adventure_Screenshot_${timestamp}.${extension}`;
    }
    
    return captureCanvas(canvas, {
      format: mimeType,
      quality: 0.92,
      fileName: fileName,
    });
  },
};
