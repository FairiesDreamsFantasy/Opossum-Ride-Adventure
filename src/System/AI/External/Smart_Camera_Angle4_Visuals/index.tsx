/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CameraTransform {
  rotation: number;
  pitch: number;
  zoom: number;
}

/**
 * Smart Camera Rotation Subsystem.
 * Specifically handles the "Angle 4" Rider View visuals with dynamic interpolation.
 */
export class SmartCameraAngle4Visuals {
  private static rotationOffset = 0;
  private static targetRotation = 0;

  /**
   * Resolves the camera transform based on movement and view mode.
   * Note: This strictly avoids POV mode as per user mandates.
   */
  public static resolveTransform(
    viewMode: "rider" | "pov" | "follow", 
    speed: number, 
    steering: number
  ): CameraTransform {
    if (viewMode === "pov") {
      return { rotation: 0, pitch: 0, zoom: 1.0 };
    }

    // Dynamic rotation based on steering intensity
    this.targetRotation = steering * 15; // Max 15 degree tilt
    
    // Smooth interpolation (Scientific Damping)
    this.rotationOffset += (this.targetRotation - this.rotationOffset) * 0.1;

    let zoom = 1.0;
    if (viewMode === "rider") {
      zoom = 1.0 + (speed / 50); // Slight zoom out at speed
    }

    return {
      rotation: this.rotationOffset,
      pitch: speed > 10 ? -5 : 0, // Slight pitch down when moving fast
      zoom
    };
  }
}
