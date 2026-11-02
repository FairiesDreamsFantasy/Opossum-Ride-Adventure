/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MobileAnimationState {
  touchRippleOpacity: number;
  layoutTransitionProgress: number;
  screenShakeMagnitude: number;
}

export class MobileAnimationEngine {
  /**
   * Applies ease-out decay to touch ripples
   */
  public static decayRipple(currentOpacity: number, decayRate: number = 0.08): number {
    return Math.max(0, currentOpacity - decayRate);
  }

  /**
   * Generates screen shake vector for collisions
   */
  public static calculateShake(magnitude: number): { x: number; y: number } {
    if (magnitude <= 0) return { x: 0, y: 0 };
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude
    };
  }
}
