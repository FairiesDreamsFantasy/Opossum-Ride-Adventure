/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PigColorProfile } from "../../Color_Palette";

export class Pig3DProjection {
  public static projectPigWireframe(
    profile: PigColorProfile,
    animTime: number
  ) {
    return {
      bodyLength: 52,
      shoulderHeight: 36,
      tuskLength: profile.gender === "Boar" ? 8.5 : 2.0,
      trotCycleOffset: Math.sin(animTime * 6.0) * 4.0
    };
  }
}
