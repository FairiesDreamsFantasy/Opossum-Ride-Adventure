/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General utilities and types for Play Area DOM, HUD overlay, and Canvas interactions.
 */

export interface DOMCaptureOptions {
  format: "image/png" | "image/jpeg";
  quality: number;
  fileName: string;
}

/**
 * Takes a screenshot of a given canvas element and prompts the user to download it.
 */
export function captureCanvas(
  canvas: HTMLCanvasElement | null,
  options: DOMCaptureOptions
): boolean {
  if (!canvas) return false;
  try {
    const dataUrl = canvas.toDataURL(options.format, options.quality);
    const link = document.createElement("a");
    link.download = options.fileName;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (error) {
    console.error("Failed to capture canvas screenshot:", error);
    return false;
  }
}
