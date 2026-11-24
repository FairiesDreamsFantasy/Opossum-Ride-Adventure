/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ViewportTransformStabilizer } from "./ViewportTransformStabilizer";

export * from "./ViewportTransformStabilizer";

export const RENDER_CONSTANTS = {
  MIN_ZOOM: 0.1,
  MAX_ZOOM: 10.0,
  DEFAULT_SCALE: 1.0,
  ASPECT_RATIO: 16 / 9
};

export function translateCoordinate(val: number, offset: number, scale: number): number {
  const safeVal = ViewportTransformStabilizer.sanitizeCoordinate(val, 0);
  const safeOffset = ViewportTransformStabilizer.sanitizeCoordinate(offset, 0);
  const safeScale = Number.isFinite(scale) ? scale : 1.0;
  return (safeVal + safeOffset) * safeScale;
}
