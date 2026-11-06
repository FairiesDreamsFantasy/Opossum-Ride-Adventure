/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Canvas Layout Geometry & DPI Scaler
 * C# (.NET Strong-Type Emulation Bridge)
 */

export interface IComponentBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ComponentsLayoutEngineCSharp = {
  /**
   * Calculates high-DPI crisp bounding box for UI elements:
   */
  computeDpiBounds: (bounds: IComponentBounds, dpr: number = 1.0): IComponentBounds => {
    const scale = Math.max(1.0, dpr);
    return {
      x: Math.round(bounds.x * scale) / scale,
      y: Math.round(bounds.y * scale) / scale,
      width: Math.round(bounds.width * scale) / scale,
      height: Math.round(bounds.height * scale) / scale
    };
  }
};

export default ComponentsLayoutEngineCSharp;
