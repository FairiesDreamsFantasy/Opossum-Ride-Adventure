/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResolutionConfig } from "../index";
import { ULTRA_LOW_CONSTANTS } from "./General";

export const UltraLowResolutionDefinition: ResolutionConfig = {
  width: 160,
  height: 120,
  pixelRatio: 0.5,
  antiAliasing: false
};

export const UltraLowConfig = {
  scaleFactor: ULTRA_LOW_CONSTANTS.DEFAULT_SCALE,
  label: ULTRA_LOW_CONSTANTS.LABEL
};

export default UltraLowResolutionDefinition;
export * from "./General";
