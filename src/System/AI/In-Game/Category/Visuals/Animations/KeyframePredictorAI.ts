/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * KeyframePredictorAI — Velocity-Aware Animation Timing & Lookahead Easing Predictor.
 */

export interface VisualKeyframePrediction {
  durationMs: number;
  lookaheadFrames: number;
  easingWeight: number;
  evaluate: (t: number) => number;
}

export class VisualKeyframePredictorAI {
  public static predictTiming(characterState: string, speedMetersPerSec: number = 0): VisualKeyframePrediction {
    const cleanState = typeof characterState === "string" ? characterState.trim().toLowerCase() : "idle";
    const safeSpeed = Math.max(0, Math.min(80, Number.isFinite(speedMetersPerSec) ? Math.abs(speedMetersPerSec) : 0));
    const speedFactor = 1.0 / (1.0 + safeSpeed * 0.045);

    if (cleanState === "charge" || cleanState === "gallop") {
      return {
        durationMs: Math.max(160, Math.round(380 * speedFactor)),
        lookaheadFrames: Math.min(8, 2 + Math.floor(safeSpeed * 0.15)),
        easingWeight: 0.92,
        evaluate: (t: number) => {
          const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
          return u * u * (3 - 2 * u);
        }
      };
    }

    if (cleanState === "revive" || cleanState === "stunned") {
      return {
        durationMs: cleanState === "stunned" ? 720 : 800,
        lookaheadFrames: 1,
        easingWeight: 0.65,
        evaluate: (t: number) => {
          const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
          return 1 - Math.cos((u * Math.PI) / 2);
        }
      };
    }

    if (cleanState === "trot" || cleanState === "walk") {
      return {
        durationMs: Math.max(220, Math.round(520 * speedFactor)),
        lookaheadFrames: 2,
        easingWeight: 0.8,
        evaluate: (t: number) => {
          const u = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
          return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
        }
      };
    }

    return {
      durationMs: 600,
      lookaheadFrames: 1,
      easingWeight: 0.5,
      evaluate: (t: number) => Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0))
    };
  }
}
