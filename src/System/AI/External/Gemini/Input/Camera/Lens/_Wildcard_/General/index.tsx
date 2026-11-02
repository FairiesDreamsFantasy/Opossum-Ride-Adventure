/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WildcardLensData } from "../Data";

export class WildcardLensGeneralEngine {
  public static readonly systemName = "Wildcard Lens Grid General Engine";

  public static resolveWildcardLens(tierId: string, customMultiplier: number = 1.0) {
    return {
      tierId,
      gridMultiplier: customMultiplier * WildcardLensData.gridMultiplier,
      chromaticAberration: WildcardLensData.chromaticAberration
    };
  }
}

export const WildcardLensGeneral = {
  systemName: WildcardLensGeneralEngine.systemName,
  Engine: WildcardLensGeneralEngine
};
