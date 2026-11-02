/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VisualsEngine } from "../Engine";
import { GeminiAnimations } from "../Animations";
import { GeminiResolution } from "../Resolution";
import { VisualsSD } from "../SD";
import { VisualsHD } from "../HD";
import { VisualsUHD } from "../HD_UHD";
import { Visuals2K } from "../2K";
import { Visuals4K } from "../4K";
import { Visuals8K } from "../8K";
import { Visuals16K } from "../16K";
import { Visuals32K } from "../32K";
import { Visuals64K } from "../64K";
import { Visuals128K } from "../128K";
import { Visuals256K } from "../256K";
import { Visuals512K } from "../512K";
import { Visuals1024K } from "../1024K";
import { Visuals2048K } from "../Resolution/2048K";
import { Visuals4096K } from "../Resolution/4096K";
import { Visuals8192K } from "../Resolution/8192K";
import { ResolutionVeryLow } from "../Resolution/Very_Low";
import { ResolutionUltraLow } from "../Resolution/Ultra-Low";
import { ResolutionVeryHigh } from "../Resolution/Very_High";
import { ResolutionUltraHigh } from "../Resolution/Ultra-High";

/**
 * Gemini Visuals Data Registry.
 */
export const GeminiVisualsData = {
  Engine: VisualsEngine,
  Animations: GeminiAnimations,
  Resolution: GeminiResolution,
  SD: VisualsSD,
  HD: VisualsHD,
  UHD: VisualsUHD,
  TwoK: Visuals2K,
  FourK: Visuals4K,
  EightK: Visuals8K,
  SixteenK: Visuals16K,
  ThirtyTwoK: Visuals32K,
  SixtyFourK: Visuals64K,
  OneTwentyEightK: Visuals128K,
  TwoFiftySixK: Visuals256K,
  FiveTwelveK: Visuals512K,
  TenTwentyFourK: Visuals1024K,
  TwoThousandFortyEightK: Visuals2048K,
  FourThousandNinetySixK: Visuals4096K,
  EightThousandOneHundredNinetyTwoK: Visuals8192K,
  VeryLow: ResolutionVeryLow,
  UltraLow: ResolutionUltraLow,
  VeryHigh: ResolutionVeryHigh,
  UltraHigh: ResolutionUltraHigh,
};
