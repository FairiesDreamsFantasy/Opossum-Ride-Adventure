/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Scientific Visual Panner Logic
 * 
 * Provides high-precision coordinate translation and texture/UI panning 
 * grounded in 100% pure computer science and Vector2 mathematics.
 */
export class Visual_Panner_Logic {
  /**
   * Calculates a panned coordinate based on time, speed, and axis.
   * Uses wrap-around (modulo) logic for infinite seamless panning.
   */
  public static calculatePannedCoordinate(
    currentTime: number,
    speed: number,
    baseOffset: number = 0,
    range: number = 1.0
  ): number {
    // Scientific modulo translation for seamless wrapping
    const totalOffset = baseOffset + (currentTime * speed);
    return ((totalOffset % range) + range) % range;
  }

  /**
   * Generates a 2D translation vector for UV or UI panning.
   */
  public static calculateVector2Panning(
    currentTime: number,
    speedX: number,
    speedY: number,
    range: number = 1.0
  ): { x: number; y: number } {
    return {
      x: this.calculatePannedCoordinate(currentTime, speedX, 0, range),
      y: this.calculatePannedCoordinate(currentTime, speedY, 0, range)
    };
  }

  /**
   * Applies a CSS transform-ready panning string.
   */
  public static getPanningTransform(
    currentTime: number,
    speedX: number,
    speedY: number,
    unit: string = "px"
  ): string {
    const x = currentTime * speedX;
    const y = currentTime * speedY;
    return `translate(${x}${unit}, ${y}${unit})`;
  }
}

export default Visual_Panner_Logic;
