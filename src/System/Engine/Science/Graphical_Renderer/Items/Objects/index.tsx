/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { drawObjectGeneral, getObjectGeneralName } from "./General";

export function drawObjectItem(ctx: CanvasRenderingContext2D, x: number, y: number, type: string, size: number, wireframe: boolean): void {
  drawObjectGeneral(ctx, x, y, type, size, wireframe);
}

export function getObjectItemName(type: string): string {
  return getObjectGeneralName(type);
}
