/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KeyframeHeuristic {
  durationMs: number;
  easingFunction: (t: number) => number;
}

export function getSkeletalMovementAI(characterState: string): KeyframeHeuristic {
  switch (characterState) {
    case "gallop":
      return {
        durationMs: 400,
        easingFunction: (t: number) => t * t * (3 - 2 * t), // Smoothstep
      };
    case "revive":
      return {
        durationMs: 800,
        easingFunction: (t: number) => 1 - Math.cos((t * Math.PI) / 2), // Sine Out
      };
    default:
      return {
        durationMs: 600,
        easingFunction: (t: number) => t, // Linear
      };
  }
}
