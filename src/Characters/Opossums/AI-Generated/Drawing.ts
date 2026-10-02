import { OpossumCharacter } from "../../../types";

/**
 * AIGeneratedOpossum Drawing Engine
 * Responsible for rendering AI-synthesized opossums using canvas primitives.
 */
export const drawAI3D = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  char: OpossumCharacter
) => {
  const aiData = char.aiData;
  const color = char.color || "#9ca3af";
  const eyeColor = char.eyeColor || "#ff0000";

  ctx.save();
  ctx.translate(x, y);

  // Body
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(0, 0, width / 2, height / 2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(0, -height / 3, width / 3, height / 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = eyeColor;
  ctx.beginPath();
  ctx.arc(-width / 8, -height / 3, 3, 0, Math.PI * 2);
  ctx.arc(width / 8, -height / 3, 3, 0, Math.PI * 2);
  ctx.fill();

  // Nose
  ctx.fillStyle = char.noseColor || "#fda4af";
  ctx.beginPath();
  ctx.arc(0, -height / 4, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const drawAI2D = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  char: OpossumCharacter
) => {
  const color = char.color || "#9ca3af";
  
  ctx.save();
  ctx.translate(x, y);

  // Simple 2D representation (Top-down circle)
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, 0, 15, 0, Math.PI * 2);
  ctx.fill();

  // Snout
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(0, -10, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
};

export const AIGeneratedOpossum = {
  draw3D: drawAI3D,
  draw2D: drawAI2D,
};
