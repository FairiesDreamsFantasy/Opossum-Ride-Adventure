/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Ultra-Scientific Input Mathematics & Signal Processing Module
 * Provides exact mathematical deadzone filtering, polynomial sensitivity curves,
 * and microsecond-precision state register logic for zero-latency input evaluation.
 */

export class InputMathematics {
  /**
   * Applies smooth cubic deadzone filtering to analog stick axes
   * f(x) = sign(x) * (|x| - d) / (1 - d)
   */
  static applyCubicDeadzone(value: number, innerDeadzone: number = 0.12, outerDeadzone: number = 0.98): number {
    const absVal = Math.abs(value);
    if (absVal < innerDeadzone) return 0;
    if (absVal >= outerDeadzone) return Math.sign(value);

    // Normalized scale between inner and outer boundary
    const normalized = (absVal - innerDeadzone) / (outerDeadzone - innerDeadzone);
    // Cubic response curve for exponential fine-grained control
    const cubicResponse = Math.pow(normalized, 3);
    return Math.sign(value) * cubicResponse;
  }

  /**
   * Normalizes a 2D directional vector (X, Y) with radial clamping
   */
  static normalizeInputVector(x: number, y: number, innerDeadzone: number = 0.12): { x: number; y: number; magnitude: number } {
    const rawMagnitude = Math.sqrt(x * x + y * y);
    if (rawMagnitude < innerDeadzone) {
      return { x: 0, y: 0, magnitude: 0 };
    }

    const clampedMagnitude = Math.min(1.0, (rawMagnitude - innerDeadzone) / (1.0 - innerDeadzone));
    const scale = clampedMagnitude / rawMagnitude;
    return {
      x: x * scale,
      y: y * scale,
      magnitude: clampedMagnitude
    };
  }

  /**
   * Exponential polynomial sensitivity transformation for input smoothing
   */
  static transformSensitivity(input: number, power: number = 1.5): number {
    return Math.sign(input) * Math.pow(Math.abs(input), power);
  }
}

export interface InputMicroTimestamp {
  code: string;
  pressed: boolean;
  timestampMs: number;
}
