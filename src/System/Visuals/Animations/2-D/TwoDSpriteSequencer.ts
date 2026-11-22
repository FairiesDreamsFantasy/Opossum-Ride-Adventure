/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * TwoDSpriteSequencer — Frame-Rate Independent Sprite Atlas & Frame Advancement Solver.
 */

export class TwoDSpriteSequencer {
  public static computeFrameOffset(frame: number, frameWidth: number, startX: number = 0): number {
    const safeFrame = Math.max(0, Math.floor(Number.isFinite(frame) ? frame : 0));
    const safeWidth = Math.max(1, Number.isFinite(frameWidth) ? frameWidth : 1);
    const safeSx = Number.isFinite(startX) ? startX : 0;
    return safeSx + safeFrame * safeWidth;
  }

  public static advanceFrameIndex(
    elapsedSec: number,
    fps: number,
    totalFrames: number,
    loop: boolean = true
  ): number {
    const safeFrames = Math.max(1, Math.floor(Number.isFinite(totalFrames) ? totalFrames : 1));
    const safeFps = Math.max(0.1, Number.isFinite(fps) ? fps : 12);
    const safeTime = Math.max(0, Number.isFinite(elapsedSec) ? elapsedSec : 0);
    const rawIdx = Math.floor(safeTime * safeFps);
    return loop ? rawIdx % safeFrames : Math.min(safeFrames - 1, rawIdx);
  }
}
