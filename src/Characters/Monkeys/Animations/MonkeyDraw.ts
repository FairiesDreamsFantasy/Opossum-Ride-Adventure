/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Early 3-D Low-Polygon "Babylonian Method" graphics engine to render Monkeys.
 * Modeled carefully as flat-shaded block meshes with extreme polygonal shortcuts.
 */
export function drawMonkey3D(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  ow: number,
  oh: number,
  isFemale: boolean,
  monkeyName?: string,
  rotation: number = 0,
  sway: number = 0,
  armSway: number = 0
) {
  const isColt = monkeyName === "Colt";
  const mx = px - ow * 0.05 + sway; // Apply swaying offset
  const bodyY = py - oh * 0.72;
  const headY = py - oh * 0.88;
  const sizeBody = oh * 0.16;
  const sizeHead = oh * 0.1;

  ctx.save();
  if (rotation !== 0) {
    ctx.translate(mx, bodyY);
    ctx.rotate(rotation);
    ctx.translate(-mx, -bodyY);
  }

  // Draw arms with armSway
  ctx.strokeStyle = isColt ? "#5c4033" : "#78350f";
  ctx.lineWidth = Math.max(1, ow * 0.03);
  
  // Left arm
  ctx.beginPath();
  ctx.moveTo(mx - sizeBody * 0.8, bodyY);
  const leftArmAngle = (Math.PI / 4) + (armSway * Math.PI / 180);
  ctx.lineTo(mx - sizeBody * 1.5, bodyY + Math.sin(leftArmAngle) * sizeBody);
  ctx.stroke();

  // Right arm
  ctx.beginPath();
  ctx.moveTo(mx + sizeBody * 0.8, bodyY);
  const rightArmAngle = (Math.PI / 4) - (armSway * Math.PI / 180);
  ctx.lineTo(mx + sizeBody * 1.5, bodyY + Math.sin(rightArmAngle) * sizeBody);
  ctx.stroke();

  ctx.strokeStyle = "#401b00";
  ctx.lineWidth = 1.2;

  // Rigid low-poly segmented monkey tail
  ctx.strokeStyle = isColt ? "#5c4033" : "#78350f"; // Custom brown fur for Colt
  ctx.lineWidth = Math.max(1, ow * 0.035);
  ctx.beginPath();
  ctx.moveTo(mx, bodyY);
  ctx.lineTo(mx - ow * 0.12, bodyY + 6);
  ctx.lineTo(mx - ow * 0.22, bodyY - 4);
  ctx.lineTo(mx - ow * 0.15, bodyY - 12);
  ctx.lineTo(mx - ow * 0.26, bodyY - 10);
  ctx.stroke();

  // Blocky flat-shaded octagonal Monkey body (Representing custom mesh clothes)
  if (isColt) {
    // Colt wears a Brown shirt (top half) and Khaki pants (bottom half)
    ctx.fillStyle = "#5c4033"; // Brown shirt
  } else {
    ctx.fillStyle = isFemale ? "#ec4899" : "#3b82f6";
  }
  ctx.beginPath();
  // Draw an octagon
  const rB = sizeBody;
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI) / 4 + Math.PI / 8;
    const bx = mx + Math.cos(angle) * rB;
    const by = bodyY + Math.sin(angle) * rB;
    if (i === 0) ctx.moveTo(bx, by);
    else ctx.lineTo(bx, by);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (isColt) {
    // Render khaki pants on bottom of body
    ctx.save();
    ctx.beginPath();
    ctx.rect(mx - rB, bodyY, rB * 2, rB);
    ctx.clip();
    ctx.fillStyle = "#cf9f5a"; // Khaki pants
    ctx.fillRect(mx - rB, bodyY, rB * 2, rB);
    ctx.restore();
    // Re-draw outer stroke
    ctx.stroke();

    // Render typical prison shoes: dark simple blocks (under/bottom of body)
    ctx.fillStyle = "#374151"; // prison shoes gray
    ctx.fillRect(mx - rB * 0.8, bodyY + rB - 2, rB * 0.6, 4);
    ctx.fillRect(mx + rB * 0.2, bodyY + rB - 2, rB * 0.6, 4);
  }

  // Face and head blocky frame (Diamond / Hexagon mesh)
  ctx.fillStyle = isColt ? "#7c2d12" : "#854d0e"; // Brown fur for Colt
  ctx.beginPath();
  const rH = sizeHead;
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const hx = mx + Math.cos(angle) * rH;
    const hy = headY + Math.sin(angle) * rH;
    if (i === 0) ctx.moveTo(hx, hy);
    else ctx.lineTo(hx, hy);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Flat-face facet light highlights
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.beginPath();
  ctx.moveTo(mx, headY - rH);
  ctx.lineTo(mx + rH, headY);
  ctx.lineTo(mx, headY);
  ctx.closePath();
  ctx.fill();

  // Flat light-colored snout trapezoid
  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.moveTo(mx - rH * 0.6, headY + rH * 0.1);
  ctx.lineTo(mx + rH * 0.6, headY + rH * 0.1);
  ctx.lineTo(mx + rH * 0.4, headY + rH * 0.7);
  ctx.lineTo(mx - rH * 0.4, headY + rH * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Triangular blocky ears
  ctx.fillStyle = "#854d0e";
  // Left ear triangle
  ctx.beginPath();
  ctx.moveTo(mx - rH * 0.8, headY - rH * 0.4);
  ctx.lineTo(mx - rH * 1.5, headY);
  ctx.lineTo(mx - rH * 0.8, headY + rH * 0.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Right ear triangle
  ctx.beginPath();
  ctx.moveTo(mx + rH * 0.8, headY - rH * 0.4);
  ctx.lineTo(mx + rH * 1.5, headY);
  ctx.lineTo(mx + rH * 0.8, headY + rH * 0.4);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Flat inner ears (pink triangular accent)
  ctx.fillStyle = "#fda4af";
  ctx.beginPath();
  ctx.moveTo(mx - rH * 0.9, headY - rH * 0.2);
  ctx.lineTo(mx - rH * 1.3, headY);
  ctx.lineTo(mx - rH * 0.9, headY + rH * 0.2);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(mx + rH * 0.9, headY - rH * 0.2);
  ctx.lineTo(mx + rH * 1.3, headY);
  ctx.lineTo(mx + rH * 0.9, headY + rH * 0.2);
  ctx.closePath();
  ctx.fill();

  // Flat pixel square eyes (representing early 3D textured face maps)
  ctx.fillStyle = "#000000";
  ctx.fillRect(mx - rH * 0.4 - 1.5, headY - rH * 0.2, 3, 3);
  ctx.fillRect(mx + rH * 0.4 - 1.5, headY - rH * 0.2, 3, 3);

  // Rigid low-poly straight mouth segments
  ctx.strokeStyle = "#4d1d11";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(mx - rH * 0.3, headY + rH * 0.45);
  ctx.lineTo(mx, headY + rH * 0.55);
  ctx.lineTo(mx + rH * 0.3, headY + rH * 0.45);
  ctx.stroke();
  ctx.restore();
}
