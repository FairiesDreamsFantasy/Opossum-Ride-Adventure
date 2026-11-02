/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 3D isometric height-extrusion helper for fence posts and obstacles
 */
export function drawExtrudedBlock3D(
  ctx: CanvasRenderingContext2D,
  bx: number,
  by: number,
  width: number,
  height: number,
  depth: number,
  faceColor = "#166534",
  topColor = "#15803d",
  sideColor = "#14532d"
) {
  ctx.save();
  
  // Draw Front Face
  ctx.fillStyle = faceColor;
  ctx.fillRect(bx, by, width, height);

  // Draw Top Face (extruded isometric depth)
  ctx.fillStyle = topColor;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx + depth, by - depth);
  ctx.lineTo(bx + width + depth, by - depth);
  ctx.lineTo(bx + width, by);
  ctx.closePath();
  ctx.fill();

  // Draw Side Face
  ctx.fillStyle = sideColor;
  ctx.beginPath();
  ctx.moveTo(bx + width, by);
  ctx.lineTo(bx + width + depth, by - depth);
  ctx.lineTo(bx + width + depth, by + height - depth);
  ctx.lineTo(bx + width, by + height);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
