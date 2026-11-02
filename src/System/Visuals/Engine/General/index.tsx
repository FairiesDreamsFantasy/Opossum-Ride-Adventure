/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Bounds checking model for high-speed coordinate processing.
 */
export interface BoundingBox2D {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Ultra-high performance visual optimization calculations and rendering routines.
 */
export const VisualEngineGeneral = {
  /**
   * Fast viewport intersection check (Frustum Culling approximation)
   * to determine if an object is visible on the display area.
   */
  isWithinViewport(
    x: number,
    y: number,
    width: number,
    height: number,
    viewWidth: number,
    viewHeight: number,
    margin: number = 64
  ): boolean {
    return (
      x + width + margin >= 0 &&
      x - margin <= viewWidth &&
      y + height + margin >= 0 &&
      y - margin <= viewHeight
    );
  },

  /**
   * Generates a spatial lookup index key for canvas grid partitioning,
   * significantly reducing broadphase collision and drawing checks.
   */
  getGridCellKey(x: number, y: number, cellSize: number = 100): string {
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    return `${col},${row}`;
  },

  /**
   * Throttles high-frequency particle emission to maintain smooth 60 FPS performance.
   * If frame-time exceeds standard threshold, reduces requested particle count.
   */
  getOptimizedParticleCount(
    requestedCount: number,
    currentFps: number,
    targetFps: number = 60
  ): number {
    if (currentFps >= targetFps - 5) {
      return requestedCount;
    }
    const ratio = Math.max(0.2, currentFps / targetFps);
    return Math.round(requestedCount * ratio);
  },

  /**
   * Calculates a 2D bounding box from a collection of points for precise collision and redraw framing.
   */
  computeBoundingBox(points: { x: number; y: number }[]): BoundingBox2D {
    if (points.length === 0) {
      return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    }
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (p.x < minX) minX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.x > maxX) maxX = p.x;
      if (p.y > maxY) maxY = p.y;
    }

    return { minX, minY, maxX, maxY };
  },

  /**
   * Cohen-Sutherland line clipping algorithm against 2D viewport boundaries.
   * Eliminates off-screen geometry before sending to canvas/WebGL rasterizer.
   */
  clipLineCohenSutherland(
    x0: number, y0: number,
    x1: number, y1: number,
    clip: BoundingBox2D
  ): { visible: boolean; x0: number; y0: number; x1: number; y1: number } {
    const INSIDE = 0; // 0000
    const LEFT   = 1; // 0001
    const RIGHT  = 2; // 0010
    const BOTTOM = 4; // 0100
    const TOP    = 8; // 1000

    const computeCode = (x: number, y: number): number => {
      let code = INSIDE;
      if (x < clip.minX) code |= LEFT;
      else if (x > clip.maxX) code |= RIGHT;
      if (y < clip.minY) code |= BOTTOM;
      else if (y > clip.maxY) code |= TOP;
      return code;
    };

    let code0 = computeCode(x0, y0);
    let code1 = computeCode(x1, y1);
    let accept = false;

    while (true) {
      if ((code0 | code1) === 0) {
        accept = true;
        break;
      } else if ((code0 & code1) !== 0) {
        break;
      } else {
        let x = 0;
        let y = 0;
        const codeOut = code1 > code0 ? code1 : code0;

        if (codeOut & TOP) {
          x = x0 + (x1 - x0) * (clip.maxY - y0) / (y1 - y0);
          y = clip.maxY;
        } else if (codeOut & BOTTOM) {
          x = x0 + (x1 - x0) * (clip.minY - y0) / (y1 - y0);
          y = clip.minY;
        } else if (codeOut & RIGHT) {
          y = y0 + (y1 - y0) * (clip.maxX - x0) / (x1 - x0);
          x = clip.maxX;
        } else if (codeOut & LEFT) {
          y = y0 + (y1 - y0) * (clip.minX - x0) / (x1 - x0);
          x = clip.minX;
        }

        if (codeOut === code0) {
          x0 = x; y0 = y;
          code0 = computeCode(x0, y0);
        } else {
          x1 = x; y1 = y;
          code1 = computeCode(x1, y1);
        }
      }
    }

    return { visible: accept, x0: Number(x0.toFixed(3)), y0: Number(y0.toFixed(3)), x1: Number(x1.toFixed(3)), y1: Number(y1.toFixed(3)) };
  },

  /**
   * Calculates perspective-correct Barycentric Coordinates (lambda1, lambda2, lambda3)
   * for point P within triangle ABC: P = lambda1*A + lambda2*B + lambda3*C
   */
  computeBarycentricCoordinates(
    px: number, py: number,
    ax: number, ay: number,
    bx: number, by: number,
    cx: number, cy: number
  ): { lambda1: number; lambda2: number; lambda3: number; isInside: boolean } {
    const detT = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy);
    if (Math.abs(detT) < 1e-12) {
      return { lambda1: 0, lambda2: 0, lambda3: 0, isInside: false };
    }

    const lambda1 = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / detT;
    const lambda2 = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / detT;
    const lambda3 = 1.0 - lambda1 - lambda2;

    const isInside = lambda1 >= 0 && lambda2 >= 0 && lambda3 >= 0;
    return {
      lambda1: Number(lambda1.toFixed(5)),
      lambda2: Number(lambda2.toFixed(5)),
      lambda3: Number(lambda3.toFixed(5)),
      isInside
    };
  },

  /**
   * Applies a 3x3 spatial image filter convolution matrix (e.g. Gaussian blur, sharpen, edge detect)
   */
  applyKernelConvolution(
    pixels: Uint8ClampedArray,
    width: number,
    height: number,
    kernel: number[] // 9 elements
  ): Uint8ClampedArray {
    if (kernel.length !== 9) return pixels;
    const output = new Uint8ClampedArray(pixels.length);
    const kernelWeight = kernel.reduce((a, b) => a + b, 0) || 1.0;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0, g = 0, b = 0;
        let kIdx = 0;

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const pixelIdx = ((y + ky) * width + (x + kx)) * 4;
            const w = kernel[kIdx++];
            r += pixels[pixelIdx] * w;
            g += pixels[pixelIdx + 1] * w;
            b += pixels[pixelIdx + 2] * w;
          }
        }

        const outIdx = (y * width + x) * 4;
        output[outIdx]     = Math.max(0, Math.min(255, Math.round(r / kernelWeight)));
        output[outIdx + 1] = Math.max(0, Math.min(255, Math.round(g / kernelWeight)));
        output[outIdx + 2] = Math.max(0, Math.min(255, Math.round(b / kernelWeight)));
        output[outIdx + 3] = pixels[outIdx + 3]; // Preserve alpha
      }
    }
    return output;
  }
};
