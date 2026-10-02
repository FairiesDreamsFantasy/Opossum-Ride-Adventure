/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LensGridConfig, DEFAULT_LENS_GRID_CONFIG } from "../Data";

export class GeminiCameraLensGeneralEngine {
  public static readonly systemName = "Gemini Virtual Lens Grid Optics Engine";

  private config: LensGridConfig = { ...DEFAULT_LENS_GRID_CONFIG };

  public getConfig(): LensGridConfig {
    return { ...this.config };
  }

  public setGridResolution(columns: number, rows: number) {
    this.config.pixelGridColumns = columns;
    this.config.pixelGridRows = rows;
  }

  public calculatePixelPitchMicrons(): { pitchX: number; pitchY: number } {
    const pitchX = (this.config.sensorWidthMm * 1000) / this.config.pixelGridColumns;
    const pitchY = (this.config.sensorHeightMm * 1000) / this.config.pixelGridRows;
    return { pitchX, pitchY };
  }
}

export const GeminiCameraLensGeneral = {
  systemName: GeminiCameraLensGeneralEngine.systemName,
  Engine: GeminiCameraLensGeneralEngine
};
