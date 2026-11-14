/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FoyerNarrationPython {
  public static scorePronunciationClarity(syllables: number, pitchHz: number): number {
    return Math.min(1.0, (syllables * 0.15) * (pitchHz / 440.0));
  }
}
