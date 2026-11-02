/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResolutionConfig } from "../index";
import { ULTRA_HIGH_CONSTANTS } from "./General";

export const UltraHighResolutionDefinition: ResolutionConfig = {
  width: 7680,
  height: 4320,
  pixelRatio: 4,
  antiAliasing: true
};

export const UltraHighConfig = {
  scaleFactor: ULTRA_HIGH_CONSTANTS.DEFAULT_SCALE,
  label: ULTRA_HIGH_CONSTANTS.LABEL
};

export default UltraHighResolutionDefinition;
export * from "./General";
