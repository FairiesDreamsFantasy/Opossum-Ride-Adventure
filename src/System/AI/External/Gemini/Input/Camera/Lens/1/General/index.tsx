/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LensTier1Data } from "../Data";

export class LensTier1GeneralEngine {
  public static readonly systemName = "Lens Numeric Tier 1 Optics Grid Engine";

  public static getSubGrid(level: "1" | "2" | "4") {
    return LensTier1Data.subGrids[level] || LensTier1Data.subGrids["4"];
  }
}

export const LensTier1General = {
  systemName: LensTier1GeneralEngine.systemName,
  Engine: LensTier1GeneralEngine
};
