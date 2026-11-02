/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResolutionConfig } from "../index";
import { VERY_HIGH_CONSTANTS } from "./General";

export const VeryHighResolutionDefinition: ResolutionConfig = {
  width: 2560,
  height: 1440,
  pixelRatio: 3,
  antiAliasing: true
};

export const VeryHighConfig = {
  scaleFactor: VERY_HIGH_CONSTANTS.DEFAULT_SCALE,
  label: VERY_HIGH_CONSTANTS.LABEL
};

export default VeryHighResolutionDefinition;
export * from "./General";
