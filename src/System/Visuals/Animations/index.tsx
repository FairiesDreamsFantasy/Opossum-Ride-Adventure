/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GOLDEN_RATIO, ANIMATION_TIMINGS, SPRING_PRESETS } from "./General";

/**
 * High-Precision Scientific Visual Animation Mathematics
 * Evaluates spring-mass damper differential equations, harmonic sinusoidal waveforms,
 * and cubic Bezier parametric curves with microsecond time delta stability.
 */
export class AnimationMathematics {
  /**
   * Numerically integrates a second-order spring-mass damper ODE:
   * F = -k * (x - target) - c * v
   * a = F / m
   */
  static evaluateSpringStep(
    position: number,
    velocity: number,
    target: number,
    stiffness: number = 200,
    damping: number = 20,
    mass: number = 1.0,
    deltaTimeSeconds: number = 0.016667
  ): { position: number; velocity: number } {
    const displacement = position - target;
    const springForce = -stiffness * displacement;
    const dampingForce = -damping * velocity;
    const acceleration = (springForce + dampingForce) / mass;

    const newVelocity = velocity + acceleration * deltaTimeSeconds;
    const newPosition = position + newVelocity * deltaTimeSeconds;

    return { position: newPosition, velocity: newVelocity };
  }

  /**
   * Evaluates a pure sinusoidal harmonic wave f(t) = A * sin(2 * pi * f * t + phase)
   */
  static evaluateSinusoidalHarmonic(
    timeSeconds: number,
    frequencyHz: number = 1.0,
    amplitude: number = 1.0,
    phaseRadians: number = 0
  ): number {
    return amplitude * Math.sin(2.0 * Math.PI * frequencyHz * timeSeconds + phaseRadians);
  }

  /**
   * Computes a cubic Bezier curve point B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * P1 + 3(1-t) * t^2 * P2 + t^3 * P3
   */
  static evaluateCubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const clampedT = Math.max(0, Math.min(1, t));
    const u = 1 - clampedT;
    return (
      u * u * u * p0 +
      3 * u * u * clampedT * p1 +
      3 * u * clampedT * clampedT * p2 +
      clampedT * clampedT * clampedT * p3
    );
  }
}

export const VisualAnimationsEngine = {
  Math: AnimationMathematics,
  Constants: {
    GOLDEN_RATIO,
    ANIMATION_TIMINGS,
    SPRING_PRESETS
  }
};

export * from "./General";
