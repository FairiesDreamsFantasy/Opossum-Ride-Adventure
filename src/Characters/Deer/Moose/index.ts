/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MooseGeneral } from "./General";

export function drawMoose3D(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  isBull: boolean = true,
  colorOverride?: string
) {
  ctx.save();
  ctx.translate(x, y);

  const baseColor = colorOverride || (isBull ? "#4a2810" : "#653a1a");
  const darkColor = isBull ? "#2e1808" : "#42230e";

  // Legs
  ctx.fillStyle = darkColor;
  ctx.fillRect(-w * 0.3, -h * 0.3, w * 0.12, h * 0.3);
  ctx.fillRect(-w * 0.1, -h * 0.3, w * 0.12, h * 0.3);
  ctx.fillRect(w * 0.1, -h * 0.3, w * 0.12, h * 0.3);
  ctx.fillRect(w * 0.25, -h * 0.3, w * 0.12, h * 0.3);

  // Torso / Body
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  ctx.ellipse(0, -h * 0.5, w * 0.45, h * 0.35, 0, 0, Math.PI * 2);
  ctx.fill();

  // Neck and Head
  ctx.beginPath();
  ctx.moveTo(-w * 0.1, -h * 0.6);
  ctx.lineTo(-w * 0.35, -h * 0.85);
  ctx.lineTo(-w * 0.15, -h * 0.9);
  ctx.lineTo(0, -h * 0.65);
  ctx.closePath();
  ctx.fill();

  // Snout
  ctx.fillStyle = darkColor;
  ctx.beginPath();
  ctx.ellipse(-w * 0.3, -h * 0.82, w * 0.15, h * 0.1, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Ears
  ctx.fillStyle = baseColor;
  ctx.beginPath();
  ctx.ellipse(-w * 0.12, -h * 0.92, w * 0.08, h * 0.04, -0.5, 0, Math.PI * 2);
  ctx.fill();

  // Antlers (for Bulls)
  if (isBull) {
    ctx.fillStyle = "#d4c5b3";
    ctx.beginPath();
    ctx.moveTo(-w * 0.15, -h * 0.9);
    ctx.quadraticCurveTo(-w * 0.45, -h * 1.15, -w * 0.35, -h * 0.95);
    ctx.quadraticCurveTo(-w * 0.25, -h * 1.05, -w * 0.15, -h * 0.9);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(-w * 0.05, -h * 0.9);
    ctx.quadraticCurveTo(w * 0.25, -h * 1.15, w * 0.15, -h * 0.95);
    ctx.quadraticCurveTo(w * 0.05, -h * 1.05, -w * 0.05, -h * 0.9);
    ctx.fill();
  }

  // Eyes
  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.arc(-w * 0.22, -h * 0.87, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

export function drawMoosePolygons(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  ctx.save();
  ctx.strokeStyle = "#22c55e";
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(x - w * 0.4, y - h * 0.2);
  ctx.lineTo(x + w * 0.4, y - h * 0.2);
  ctx.lineTo(x + w * 0.3, y - h * 0.8);
  ctx.lineTo(x - w * 0.3, y - h * 0.8);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(x - w * 0.2, y - h * 0.8);
  ctx.lineTo(x - w * 0.4, y - h * 1.0);
  ctx.lineTo(x, y - h * 1.0);
  ctx.closePath();
  ctx.stroke();

  ctx.restore();
}

export const MooseCharacterModel = {
  General: MooseGeneral,
  draw3D: drawMoose3D,
  drawExtreme3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, isBull: boolean = true, colorOverride?: string) => {
    drawMoose3D(ctx, x, y, w * 1.25, h * 1.25, isBull, colorOverride || "#3b1e08");
  },
  drawPolygons: drawMoosePolygons,
  Omarosa: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, true, "#381a08");
    }
  },
  Ethan: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, true, "#4a2d14");
    }
  },
  Darrell: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, true, "#573518");
    }
  },
  Payton: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, false, "#633c1c");
    }
  },
  Susanna: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, false, "#6e4522");
    }
  },
  Angelica: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, _isCleaning?: boolean) => {
      drawMoose3D(ctx, x, y, w, h, false, "#784d26");
    }
  },
  Rebecca: {
    draw3D: (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) => {
      drawMoose3D(ctx, x, y, w, h, false, "#f3f4f6");
    }
  }
};

export { MooseGeneral };
