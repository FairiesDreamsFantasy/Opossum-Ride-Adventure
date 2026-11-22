/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export * from "./General";
export * from "./Animations/3-D";
export * from "./Animations/2-D";
export * from "./Animations/Polygons";
export * from "./Animations/Dot_Matrix";
export * from "./Animations/Geometry";
export * from "./Animations/Hybrid_Mixer_Layers";
export * from "./Pixelations";
export * from "./Animations/Color_Palette";
export * from "./Text";
export * from "./Grayscale";
export * from "./Colors";
export * from "./Resolution";
export * from "./HD";
export * from "./SD";
export * from "./2K";
export * from "./4K";
export * from "./16K";
export * from "./32K";
export * from "./64K";
export * from "./128K";
export * from "./256K";
export * from "./512K";
export * from "./1024K";
export * from "./Engine";
export * from "./Mobile";

import { VISUAL_CONSTANTS } from "./General";
import { DownsampleBlockSolver } from "./Pixelations/DownsampleBlockSolver";
import { LuminanceWeightsKernel } from "./Animations/Color_Palette/Monochrome/LuminanceWeightsKernel";
import { SpatialStabilizer3D } from "./Animations/3-D/SpatialStabilizer3D";

/**
 * Visual Display Configuration & Retro Filters System
 * Supports 2-D/3-D coordinate translation, polygon/wireframe styles,
 * pixelation rendering downsampling, and color palette post-processing.
 */

export type VisualPaletteType = "full-color" | "grayscale" | "phosphor-green" | "cyberpunk-amber";

export interface VisualStateSettings {
  is3D: boolean; // 3-D Perspective vs 2-D Top-Down Blueprint map
  pixelationBlockSize: number; // 1 = High Definition, 4 = Retro Pixelated, 8 = Extreme Blocky
  palette: VisualPaletteType;
  useWireframePolygons: boolean; // Draw filled polygons vs retro vector outlines
}

export class VisualRenderingFilterEngine {
  /**
   * Applies custom pixelation and palette color filtering directly on a CanvasRenderingContext2D
   */
  public applyPostFilters(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    settings: VisualStateSettings
  ) {
    if (settings.palette === "full-color" && settings.pixelationBlockSize <= 1) {
      return; // No processing needed
    }

    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;

      // 1. Optional Pixelation (Downsample block size)
      if (settings.pixelationBlockSize > 1) {
        DownsampleBlockSolver.applyBlockMosaicRGBA(data, width, height, settings.pixelationBlockSize);
      }

      // 2. Color Palette filters
      if (settings.palette !== "full-color") {
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Compute grayscale luminance
          const gray = LuminanceWeightsKernel.computeRec601Luminance(r, g, b);

          if (settings.palette === "grayscale") {
            data[i] = gray;
            data[i + 1] = gray;
            data[i + 2] = gray;
          } else if (settings.palette === "phosphor-green") {
            // Simulated monochrome CRT monitor
            data[i] = 0;
            data[i + 1] = gray * VISUAL_CONSTANTS.RETRO.PHOSPHOR_GLOW; // Bright green glow
            data[i + 2] = 0;
          } else if (settings.palette === "cyberpunk-amber") {
            // Amber CRT monitor palette
            data[i] = gray * VISUAL_CONSTANTS.RETRO.AMBER_R;
            data[i + 1] = gray * VISUAL_CONSTANTS.RETRO.AMBER_G;
            data[i + 2] = gray * VISUAL_CONSTANTS.RETRO.AMBER_B;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // 3. Optional Overlay retro CRT scanlines or Grid
      if (settings.palette !== "full-color") {
        ctx.strokeStyle = `rgba(0, 0, 0, ${VISUAL_CONSTANTS.RETRO.SCANLINE_OPACITY})`;
        ctx.lineWidth = 1;
        for (let y = 0; y < height; y += VISUAL_CONSTANTS.RETRO.SCANLINE_SPACING) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }
    } catch (e) {
      console.warn("Post-rendering filters failed relative to browser security constraints", e);
    }
  }

  /**
   * Projects a 3-D virtual space coordinate [x, y, z] onto 2-D coordinates [px, py]
   */
  public project3D(
    wx: number, // world X (-6 left, 0 center, 6 right)
    wy: number, // world Y (0 is ground, height goes positive)
    wz: number, // world Z (distance ahead)
    cameraX: number,
    cameraY: number,
    cameraZ: number,
    focalLength: number,
    width: number,
    height: number,
    horizonY: number
  ) {
    const safeWz = SpatialStabilizer3D.sanitizeFinite(wz, 0);
    const safeCamZ = SpatialStabilizer3D.sanitizeFinite(cameraZ, 0);
    const relZ = safeWz - safeCamZ;
    if (relZ <= VISUAL_CONSTANTS.CAMERA.MIN_Z) {
      return { x: 0, y: 0, visible: false, scale: 0 };
    }

    const safeFocal = Math.max(1, SpatialStabilizer3D.sanitizeFinite(focalLength, 250));
    const safeWidth = Math.max(1, SpatialStabilizer3D.sanitizeFinite(width, 640));
    const safeHorizonY = SpatialStabilizer3D.sanitizeFinite(horizonY, 180);
    const scale = safeFocal / relZ;
    const px = safeWidth / 2 + (SpatialStabilizer3D.sanitizeFinite(wx, 0) - SpatialStabilizer3D.sanitizeFinite(cameraX, 0)) * scale;
    const py = safeHorizonY + (SpatialStabilizer3D.sanitizeFinite(cameraY, 0) - SpatialStabilizer3D.sanitizeFinite(wy, 0)) * scale;

    const clip = VISUAL_CONSTANTS.CAMERA.CLIP_OFFSET;
    return {
      x: SpatialStabilizer3D.flushDenormal(px),
      y: SpatialStabilizer3D.flushDenormal(py),
      visible: Number.isFinite(px) && Number.isFinite(py) && px >= -clip && px <= width + clip && py >= -clip && py <= height + clip,
      scale: SpatialStabilizer3D.flushDenormal(scale)
    };
  }
}
