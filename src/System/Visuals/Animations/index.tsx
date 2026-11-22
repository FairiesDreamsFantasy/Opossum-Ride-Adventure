/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GOLDEN_RATIO, ANIMATION_TIMINGS, SPRING_PRESETS } from "./General";
import { GeminiVisualsCPPSIMD } from "./C_Plus_Plus";
import { GeminiVisualsRustBuffer } from "./Rust";
import { GeminiVisualsPythonOptimizer } from "./Python";
import { TwoDAnimationSystem } from "./2-D";
import { ThreeDAnimationSystem } from "./3-D";
import { PolygonSystem } from "./Polygons";
import { GeometrySystem } from "./Geometry";
import { ColorPaletteEngine } from "./Color_Palette";
import { VisualKeyframePredictorAI } from "../../AI/In-Game/Category/Visuals/Animations/KeyframePredictorAI";
import { ProceduralGaitBlenderAI } from "../../AI/In-Game/Category/Visuals/Animations/ProceduralGaitBlenderAI";

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
    const safePos = Number.isFinite(position) ? position : 0;
    const safeVel = Number.isFinite(velocity) ? velocity : 0;
    const safeTarget = Number.isFinite(target) ? target : safePos;
    const safeK = Number.isFinite(stiffness) ? stiffness : 200;
    const safeDamp = Number.isFinite(damping) ? damping : 20;
    const safeMass = Math.max(1e-6, Number.isFinite(mass) ? mass : 1.0);
    const safeDt = Math.max(0, Math.min(0.25, Number.isFinite(deltaTimeSeconds) ? deltaTimeSeconds : 0.016667));

    const displacement = safePos - safeTarget;
    const springForce = -safeK * displacement;
    const dampingForce = -safeDamp * safeVel;
    const acceleration = (springForce + dampingForce) / safeMass;

    const newVelocity = safeVel + acceleration * safeDt;
    const newPosition = safePos + newVelocity * safeDt;

    return {
      position: Number.isFinite(newPosition) ? newPosition : safeTarget,
      velocity: Number.isFinite(newVelocity) ? newVelocity : 0
    };
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
    const t = Number.isFinite(timeSeconds) ? timeSeconds : 0;
    const f = Number.isFinite(frequencyHz) ? frequencyHz : 1.0;
    const a = Number.isFinite(amplitude) ? amplitude : 1.0;
    const p = Number.isFinite(phaseRadians) ? phaseRadians : 0;
    const out = a * Math.sin(2.0 * Math.PI * f * t + p);
    return Number.isFinite(out) ? out : 0;
  }

  /**
   * Computes a cubic Bezier curve point B(t) = (1-t)^3 * P0 + 3(1-t)^2 * t * P1 + 3(1-t) * t^2 * P2 + t^3 * P3
   */
  static evaluateCubicBezier(p0: number, p1: number, p2: number, p3: number, t: number): number {
    const a = Number.isFinite(p0) ? p0 : 0;
    const b = Number.isFinite(p1) ? p1 : 0;
    const c = Number.isFinite(p2) ? p2 : 0;
    const d = Number.isFinite(p3) ? p3 : 0;
    const clampedT = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
    const u = 1 - clampedT;
    return (
      u * u * u * a +
      3 * u * u * clampedT * b +
      3 * u * clampedT * clampedT * c +
      clampedT * clampedT * clampedT * d
    );
  }
}

export const VisualAnimationsEngine = {
  Math: AnimationMathematics,
  Constants: {
    GOLDEN_RATIO,
    ANIMATION_TIMINGS,
    SPRING_PRESETS
  },
  TwoD: TwoDAnimationSystem,
  ThreeD: ThreeDAnimationSystem,
  Polygons: PolygonSystem,
  Geometry: GeometrySystem,
  ColorPalette: ColorPaletteEngine,
  KeyframePredictorAI: VisualKeyframePredictorAI,
  GaitBlenderAI: ProceduralGaitBlenderAI,
  C_Plus_Plus: GeminiVisualsCPPSIMD,
  Rust: GeminiVisualsRustBuffer,
  Python: GeminiVisualsPythonOptimizer
};

export {
  GeminiVisualsCPPSIMD,
  GeminiVisualsRustBuffer,
  GeminiVisualsPythonOptimizer
};

export * from "./General";
