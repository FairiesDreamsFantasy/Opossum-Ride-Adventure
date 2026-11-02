/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualCameraConfig, DEFAULT_VIRTUAL_CAMERA_CONFIG } from "../Data";

export class GeminiCameraGeneralEngine {
  public static readonly systemName = "Gemini Virtual Camera Perception General Engine";

  private activeConfig: VirtualCameraConfig = { ...DEFAULT_VIRTUAL_CAMERA_CONFIG };

  public getConfig(): VirtualCameraConfig {
    return { ...this.activeConfig };
  }

  public updateCameraTransform(
    position: Partial<{ x: number; y: number; z: number }>,
    orientation?: Partial<{ pitch: number; yaw: number; roll: number }>
  ) {
    if (position) {
      this.activeConfig.position = { ...this.activeConfig.position, ...position };
    }
    if (orientation) {
      this.activeConfig.orientation = { ...this.activeConfig.orientation, ...orientation };
    }
  }

  public setResolution(resolution: string) {
    this.activeConfig.resolution = resolution;
  }

  public setColorFilter(filter: string) {
    this.activeConfig.colorFilter = filter;
  }

  public calculateFrustumBounds(playerZ: number) {
    const near = playerZ + this.activeConfig.nearPlane;
    const far = playerZ + this.activeConfig.farPlane;
    return { near, far, fov: this.activeConfig.fov };
  }
}

export const GeminiCameraGeneral = {
  systemName: GeminiCameraGeneralEngine.systemName,
  Engine: GeminiCameraGeneralEngine,
};
