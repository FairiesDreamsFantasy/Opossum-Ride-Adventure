/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResolutionConfig } from "../index";
import { VERY_LOW_CONSTANTS } from "./General";

export const VeryLowResolutionDefinition: ResolutionConfig = {
  width: 480,
  height: 360,
  pixelRatio: 0.75,
  antiAliasing: false
};

export const VeryLowConfig = {
  scaleFactor: VERY_LOW_CONSTANTS.DEFAULT_SCALE,
  label: VERY_LOW_CONSTANTS.LABEL
};

export default VeryLowResolutionDefinition;
export * from "./General";
