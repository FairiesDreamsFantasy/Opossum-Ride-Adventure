/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiVisualsWildcard } from "./_Wildcard_";

/**
 * Gemini Visuals Aggregation Subsystem.
 */
class GeminiVisualsSubsystem {
  public readonly Engine = GeminiVisualsWildcard.Engine;
  public readonly Animations = GeminiVisualsWildcard.Animations;
  public readonly Resolution = GeminiVisualsWildcard.Resolution;
  public readonly SD = GeminiVisualsWildcard.SD;
  public readonly HD = GeminiVisualsWildcard.HD;
  public readonly UHD = GeminiVisualsWildcard.UHD;
  public readonly TwoK = GeminiVisualsWildcard.TwoK;
  public readonly FourK = GeminiVisualsWildcard.FourK;
  public readonly EightK = GeminiVisualsWildcard.EightK;
  public readonly SixteenK = GeminiVisualsWildcard.SixteenK;
  public readonly ThirtyTwoK = GeminiVisualsWildcard.ThirtyTwoK;
  public readonly SixtyFourK = GeminiVisualsWildcard.SixtyFourK;
  public readonly OneTwentyEightK = GeminiVisualsWildcard.OneTwentyEightK;
  public readonly TwoFiftySixK = GeminiVisualsWildcard.TwoFiftySixK;
  public readonly FiveTwelveK = GeminiVisualsWildcard.FiveTwelveK;
  public readonly TenTwentyFourK = GeminiVisualsWildcard.TenTwentyFourK;
  public readonly TwoThousandFortyEightK = GeminiVisualsWildcard.TwoThousandFortyEightK;
  public readonly FourThousandNinetySixK = GeminiVisualsWildcard.FourThousandNinetySixK;
  public readonly EightThousandOneHundredNinetyTwoK = GeminiVisualsWildcard.EightThousandOneHundredNinetyTwoK;
  public readonly VeryLow = GeminiVisualsWildcard.VeryLow;
  public readonly UltraLow = GeminiVisualsWildcard.UltraLow;
  public readonly VeryHigh = GeminiVisualsWildcard.VeryHigh;
  public readonly UltraHigh = GeminiVisualsWildcard.UltraHigh;

  public selectProfile(mode: string) {
    return GeminiVisualsWildcard.selectProfile(mode);
  }
}

export const GeminiVisuals = new GeminiVisualsSubsystem();
export * from "./_Wildcard_";
export default GeminiVisuals;

