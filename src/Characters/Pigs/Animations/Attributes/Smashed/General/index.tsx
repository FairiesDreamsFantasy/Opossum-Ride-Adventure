/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Smashed Pig Animation & Elimination System:
 * When an opossum lands a jump on a feral pig, the pig transitions into a flattened
 * compressed state (with head intact), is erased rapidly from game view to free RAM,
 * and displays a floating score popup that disappears after exactly 3.0 seconds.
 */
export interface SmashedPigRenderState {
  scaleY: number; // Compresses from 1.0 down to 0.18 (flattened)
  scaleX: number; // Expands outward from 1.0 to 1.45 (squash physics)
  headOffsetZ: number; // Head remains visible and intact
  scoreText: string;
  scoreScoreValue: number;
  scoreOpacity: number;
  isReadyForGarbageCollection: boolean;
}

export class SmashedPigMechanic {
  public static readonly FLATTEN_DURATION_MS = 240;
  public static readonly SCORE_DURATION_MS = 3000; // 3 seconds
  public static readonly BASE_SCORE_VALUE = 250;

  public static calculateSmashState(
    elapsedSinceSmashMs: number
  ): SmashedPigRenderState {
    if (elapsedSinceSmashMs < 0) {
      return {
        scaleY: 1.0,
        scaleX: 1.0,
        headOffsetZ: 0,
        scoreText: "",
        scoreScoreValue: 0,
        scoreOpacity: 0,
        isReadyForGarbageCollection: false
      };
    }

    // Flattening phase (0 - 240ms)
    const flattenProgress = Math.min(1.0, elapsedSinceSmashMs / this.FLATTEN_DURATION_MS);
    const scaleY = 1.0 - (0.82 * flattenProgress); // Compresses down to 0.18
    const scaleX = 1.0 + (0.45 * flattenProgress); // Spreads horizontally

    // Score visibility phase (0 - 3000ms)
    const scoreProgress = elapsedSinceSmashMs / this.SCORE_DURATION_MS;
    let scoreOpacity = 1.0;
    if (scoreProgress > 0.8) {
      // Fade out smoothly in the last 20% (final 600ms of the 3 seconds)
      scoreOpacity = Math.max(0, 1.0 - ((scoreProgress - 0.8) / 0.2));
    }

    // After 3 seconds, mark ready to be purged from RAM
    const isReadyForGarbageCollection = elapsedSinceSmashMs >= this.SCORE_DURATION_MS;

    return {
      scaleY,
      scaleX,
      headOffsetZ: 4.0, // Head preserves anatomical height
      scoreText: `+${this.BASE_SCORE_VALUE}`,
      scoreScoreValue: this.BASE_SCORE_VALUE,
      scoreOpacity: scoreProgress <= 1.0 ? scoreOpacity : 0,
      isReadyForGarbageCollection
    };
  }
}
