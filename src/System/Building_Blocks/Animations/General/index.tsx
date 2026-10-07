/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BuildingBlockAnimationState {
  displacement: number;
  waveSpeed: number;
  shimmer: boolean;
}

export function computeBlockShimmer(time: number, speed = 0.002): number {
  return 0.85 + Math.sin(time * speed) * 0.15;
}
