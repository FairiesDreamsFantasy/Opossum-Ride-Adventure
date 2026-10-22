/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiVisualsData } from "../Data";

/**
 * Wildcard module for Gemini Visuals AI
 */
export const GeminiVisualsWildcard = {
  ...GeminiVisualsData,
  selectProfile: (mode: string) => {
    const v = GeminiVisualsData;
    if (mode.includes("8192K")) return v.EightThousandOneHundredNinetyTwoK;
    if (mode.includes("4096K")) return v.FourThousandNinetySixK;
    if (mode.includes("2048K")) return v.TwoThousandFortyEightK;
    if (mode.includes("1024K")) return v.TenTwentyFourK;
    if (mode.includes("512K")) return v.FiveTwelveK;
    if (mode.includes("256K")) return v.TwoFiftySixK;
    if (mode.includes("128K")) return v.OneTwentyEightK;
    if (mode.includes("64K")) return v.SixtyFourK;
    if (mode.includes("32K")) return v.ThirtyTwoK;
    if (mode.includes("16K")) return v.SixteenK;
    if (mode.includes("8K")) return v.EightK;
    if (mode.includes("4K")) return v.FourK;
    if (mode.includes("2K")) return v.TwoK;
    if (mode.includes("UHD")) return v.UHD;
    if (mode.includes("HD")) return v.HD;
    if (mode.includes("Ultra-Low")) return v.UltraLow;
    if (mode.includes("Very-Low")) return v.VeryLow;
    if (mode.includes("Very-High")) return v.VeryHigh;
    if (mode.includes("Ultra-High")) return v.UltraHigh;
    return v.SD;
  }
};

export * from "../Data";
