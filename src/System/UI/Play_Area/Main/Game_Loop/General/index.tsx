/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GameLoopStats {
  fps: number;
  delta: number;
  frameCount: number;
  lastTime: number;
}

/**
 * General helper utilities for calculating frame times and delta physics ticks.
 */
export const GameLoopGeneral = {
  createInitialStats: (): GameLoopStats => ({
    fps: 60,
    delta: 0,
    frameCount: 0,
    lastTime: typeof performance !== "undefined" ? performance.now() : Date.now()
  }),

  calculateDelta: (previousTime: number, currentTime: number): { delta: number; fps: number } => {
    const elapsedMs = currentTime - previousTime;
    const delta = Math.min(elapsedMs / 1000, 0.1); // Clamp to max 100ms delta to avoid physics explosions
    const fps = elapsedMs > 0 ? Math.round(1000 / elapsedMs) : 60;
    return { delta, fps };
  }
};
