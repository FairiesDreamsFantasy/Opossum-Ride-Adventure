/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 3D isometric or perspective projection helper for object drawing
 */
export function projectObject3D(
  x: number,
  y: number,
  z: number,
  yaw: number,
  pitch: number
) {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const cosP = Math.cos(pitch);
  const sinP = Math.sin(pitch);

  // Rotation
  const x1 = x * cosY - z * sinY;
  const z1 = x * sinY + z * cosY;
  const y1 = y * cosP - z1 * sinP;
  const z2 = y * sinP + z1 * cosP;

  return { px: x1, py: y1, pz: z2 };
}
