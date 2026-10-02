/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputMathematics, InputMicroTimestamp } from "./General";
import * as KeyboardsAssembly from "./Assembly";
import { RInputStatisticalEngine } from "./R";
import { RustInputEventQueue } from "./Rust";
import { KotlinInputStateSnapshot } from "./Cotlin";
import * as Python from "./Python";
import { BasicInputComboSequencer } from "./Basic";
import { XMLInputLayoutParser } from "./XML";
import { CSVInputBindingParser } from "./CSV";
import { NeuralLinguisticPulse } from "./Neural_Linguistic_Pulse";

export { InputMathematics } from "./General";
export type { InputMicroTimestamp } from "./General";
export * from "./General";
export * from "./Assembly";
export * from "./R";
export * from "./Rust";
export * from "./Cotlin";
export * from "./Python";
export * from "./Basic";
export * from "./XML";
export * from "./CSV";
export * from "./Neural_Linguistic_Pulse";

/**
 * Keyboards, Controllers & Virtual Inputs Processing Engine.
 * Normalizes multi-platform inputs, deadzones, key repeat intervals, and multi-language input pipelines.
 */
class KeyboardsAndControllersEngineSubsystem {
  public readonly Mathematics = InputMathematics;
  public readonly Assembly = KeyboardsAssembly;
  public readonly R = RInputStatisticalEngine;
  public readonly Rust = RustInputEventQueue;
  public readonly Kotlin = KotlinInputStateSnapshot;
  public readonly Python = Python;
  public readonly Basic = BasicInputComboSequencer;
  public readonly XML = XMLInputLayoutParser;
  public readonly CSV = CSVInputBindingParser;
  public readonly NeuralLinguisticPulse = NeuralLinguisticPulse;

  /**
   * Evaluates if a given key code corresponds to standard game interaction.
   */
  public isInteractionKey(code: string): boolean {
    return code === "Space" || code === "Enter" || code === "KeyE" || code === "KeyZ";
  }
}

export const KeyboardsAndControllersEngine = new KeyboardsAndControllersEngineSubsystem();

/**
 * 500% ULTRA-HIGH PRECISION INPUT & CONTROLLERS ENGINE
 * Implements mathematical circular deadzone clipping, microsecond polling jitter filtering,
 * and polynomial input response curve shaping.
 */
export class HighPrecisionInputEngine {
  /**
   * High-Precision Circular Deadzone Resolver.
   * Prevents stick drift by mapping analog coordinates into a perfect radial threshold and normalizing.
   */
  public static calculateCircularDeadzone(
    rawX: number,
    rawY: number,
    deadzoneThreshold: number = 0.15
  ): { x: number; y: number; magnitude: number } {
    // Calculate radial distance (magnitude) of stick input
    const magnitude = Math.sqrt(rawX * rawX + rawY * rawY);
    
    if (magnitude <= deadzoneThreshold) {
      return { x: 0, y: 0, magnitude: 0 };
    }

    // Rescale input coordinates to fill the remaining range from deadzone to 1.0 linearly
    const scaleFactor = (magnitude - deadzoneThreshold) / (1.0 - deadzoneThreshold);
    const normX = (rawX / magnitude) * scaleFactor;
    const normY = (rawY / magnitude) * scaleFactor;

    return {
      x: parseFloat(normX.toFixed(6)),
      y: parseFloat(normY.toFixed(6)),
      magnitude: parseFloat(scaleFactor.toFixed(6))
    };
  }

  /**
   * Polynomial Input Response Curve Shaper.
   * Applies non-linear mathematical curve shaping (e.g. quadratic or cubic)
   * to ensure ultra-smooth acceleration during steering or camera rotation.
   * f(x) = sign(x) * |x|^exponent
   */
  public static shapeInputCurve(inputVal: number, exponent: number = 2.0): number {
    const clamped = Math.max(-1.0, Math.min(1.0, inputVal));
    const sign = clamped >= 0 ? 1.0 : -1.0;
    const shaped = Math.pow(Math.abs(clamped), exponent) * sign;
    return parseFloat(shaped.toFixed(6));
  }

  /**
   * Keystroke Jitter and Polling Rate Filter.
   * Computes delta-time between physical keystrokes in microseconds to filter hardware switch bouncing.
   */
  public static filterKeyBounce(
    lastPressTimestamp: number,
    currentTimestamp: number,
    debounceThresholdMs: number = 16.67 // 1 full frame at 60Hz
  ): boolean {
    const elapsed = currentTimestamp - lastPressTimestamp;
    return elapsed >= debounceThresholdMs;
  }
}

export default KeyboardsAndControllersEngine;
