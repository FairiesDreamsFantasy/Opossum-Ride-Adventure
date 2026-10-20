/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualCameraConfig {
  fov: number;
  aspectRatio: number;
  nearPlane: number;
  farPlane: number;
  position: { x: number; y: number; z: number };
  orientation: { pitch: number; yaw: number; roll: number };
  resolution: string;
  colorFilter: string;
  sharpness: string;
  contrast: string;
  brightness: number;
  lensType: string;
  shutterSpeed: number;
  mode: "2-D" | "3-D" | "Photo" | "Video" | "Scanner" | "Reader";
}

export const DEFAULT_VIRTUAL_CAMERA_CONFIG: VirtualCameraConfig = {
  fov: 60,
  aspectRatio: 16 / 9,
  nearPlane: 0.1,
  farPlane: 2000,
  position: { x: 0, y: 15, z: -35 },
  orientation: { pitch: 12, yaw: 0, roll: 0 },
  resolution: "1080p_HD",
  colorFilter: "Grayscale",
  sharpness: "High",
  contrast: "High",
  brightness: 1.0,
  lensType: "Perspective_50mm",
  shutterSpeed: 1 / 60,
  mode: "3-D"
};

export const CAMERA_COLOR_FILTERS = [
  "Red", "Green", "Blue", "Cyan", "Magenta", "Yellow",
  "Monochrome_White", "Monochrome_Black", "Monochrome_Grayscale", "Rainbow"
] as const;

export const CAMERA_RESOLUTIONS = [
  "SD", "HD", "UHD", "Low", "Medium", "High", "Very_Low", "Ultra_Low",
  "Medium_Low", "Medium_High", "Very_High", "Ultra_High",
  "2K", "4K", "8K", "16K", "32K", "64K", "128K", "256K", "512K", "1024K", "2048K", "4096K", "8192K"
] as const;

export const CameraData = {
  defaultConfig: DEFAULT_VIRTUAL_CAMERA_CONFIG,
  colorFilters: CAMERA_COLOR_FILTERS,
  resolutions: CAMERA_RESOLUTIONS
};
