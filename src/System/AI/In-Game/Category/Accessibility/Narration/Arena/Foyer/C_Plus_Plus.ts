/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FoyerNarrationCPP {
  public static calculatePhonemeDecay(textLength: number, speechRateWpm: number): number {
    return Math.max(0.1, (textLength / 5.0) * (60.0 / Math.max(60, speechRateWpm)));
  }
}
