/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * C++ Input Deadzone & Vector Curve Processor
 */

export class CPPInputDeadzoneProcessor {
  public static applyRadialDeadzone(x: number, y: number, deadzone: number = 0.15): { x: number; y: number } {
    const mag = Math.sqrt(x * x + y * y);
    if (mag < deadzone) return { x: 0, y: 0 };
    const factor = (mag - deadzone) / (1 - deadzone);
    return { x: (x / mag) * factor, y: (y / mag) * factor };
  }
}

export default CPPInputDeadzoneProcessor;
