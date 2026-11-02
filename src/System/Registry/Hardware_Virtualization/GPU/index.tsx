/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GPUSpecification {
  renderer: string;
  vendor: string;
  webglVersion: string;
  maxTextureSize: number;
}

export const GPURegistry: GPUSpecification = {
  renderer: "WebGL2 Virtual Hardware Rasterizer",
  vendor: "Opossum Ride Virtual Graphics Engine",
  webglVersion: "WebGL 2.0 (OpenGL ES 3.0 WebGL)",
  maxTextureSize: 16384
};
