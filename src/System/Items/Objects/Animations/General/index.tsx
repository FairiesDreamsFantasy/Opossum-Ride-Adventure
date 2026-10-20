/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ObjectAnimationState {
  frame: number;
  scale: number;
  rotation: number;
  opacity: number;
}

export function computePulseScale(frame: number, speed = 0.05): number {
  return 1 + Math.sin(frame * speed) * 0.08;
}
