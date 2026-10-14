/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawGeneralItem, getGeneralItemName } from "./General";
import { drawObjectItem, getObjectItemName } from "./Objects";

export function drawEdibleItem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  levelId: number,
  wireframe: boolean,
  isTick: boolean
): void {
  const type = isTick ? "tick" : (levelId === 0 ? "apple" : "berry");
  if (type === "apple" || type === "berry" || type === "tick") {
    drawGeneralItem(ctx, x, y, type, size, wireframe);
  } else {
    drawObjectItem(ctx, x, y, type, size, wireframe);
  }
}

export function getEdibleItemName(levelId: number): string {
  if (levelId === 0) return "Apples";
  if (levelId === 1) return "Berries";
  if (levelId === 5) return "Frozen Berries";
  return "Ticks";
}
