/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * 2D projected screen coordinates.
 */
export interface ScreenProjection {
  x: number;
  y: number;
  scale: number;
  visible: boolean;
}

/**
 * Color channels structure.
 */
export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Scientific Mathematical Graphical Renderer Utilities.
 */
export const GeminiEngineGraphicalRenderer = {
  /**
   * Projects a 3D coordinate point onto a 2D viewport plane using perspective projection.
   * Standard perspective transformation:
   * x_proj = center_x + (x - cam_x) * focal_length / (z - cam_z)
   * y_proj = horizon_y - (y - cam_y) * focal_length / (z - cam_z)
   */
  project3D(
    x: number,
    y: number,
    z: number,
    cameraX: number,
    cameraY: number,
    cameraZ: number,
    focalLength: number,
    viewWidth: number,
    viewHeight: number,
    horizonY: number
  ): ScreenProjection {
    const relZ = z - cameraZ;
    
    // Check if behind or extremely close to the camera lens clipping plane
    if (relZ <= 0.1) {
      return { x: 0, y: 0, scale: 0, visible: false };
    }

    const scale = focalLength / relZ;
    const projectedX = viewWidth / 2 + (x - cameraX) * scale;
    const projectedY = horizonY - (y - cameraY) * scale;

    const margin = 150; // Clipping threshold margin
    const visible = 
      projectedX >= -margin && 
      projectedX <= viewWidth + margin && 
      projectedY >= -margin && 
      projectedY <= viewHeight + margin;

    return {
      x: projectedX,
      y: projectedY,
      scale,
      visible
    };
  },

  /**
   * Parses hex string into numeric Red, Green, and Blue color channels.
   */
  parseHexColor(hex: string): RGBColor {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    
    if (cleanHex.length === 3) {
      const r = ((bigint >> 8) & 0xf) * 17;
      const g = ((bigint >> 4) & 0xf) * 17;
      const b = (bigint & 0xf) * 17;
      return { r, g, b };
    }

    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  },

  /**
   * Linear interpolation (LERP) between two RGB color models
   * to simulate high-power atmospheric lighting shifts at depth.
   */
  interpolateColors(startHex: string, endHex: string, factor: number): string {
    const start = this.parseHexColor(startHex);
    const end = this.parseHexColor(endHex);
    
    const clampFactor = Math.max(0, Math.min(1, factor));

    const r = Math.round(start.r + (end.r - start.r) * clampFactor);
    const g = Math.round(start.g + (end.g - start.g) * clampFactor);
    const b = Math.round(start.b + (end.b - start.b) * clampFactor);

    return `rgb(${r}, ${g}, ${b})`;
  },

  /**
   * Renders a wireframe polygon grid cleanly using mathematical coordinates.
   */
  drawMathematicalPolygon(
    ctx: CanvasRenderingContext2D,
    vertices: { x: number; y: number }[],
    strokeColor: string,
    fillColor?: string,
    lineWidth: number = 1
  ) {
    if (vertices.length < 3) return;

    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    
    ctx.closePath();
    
    if (fillColor) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    
    ctx.stroke();
    ctx.restore();
  }
};
