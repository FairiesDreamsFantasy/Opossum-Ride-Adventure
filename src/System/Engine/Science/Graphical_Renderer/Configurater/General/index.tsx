/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../../../types";

export interface VisualConfig {
  is3D: boolean;
  resolution: number;
  antiAliasing: boolean;
  keyboardLayout: KeyboardLayoutType;
}

export const VISUAL_PRESETS = {
  PERFORMANCE: { is3D: false, resolution: 1, antiAliasing: false },
  QUALITY: { is3D: true, resolution: 2, antiAliasing: true }
};

export function getLayoutName(layout: KeyboardLayoutType): string {
  return "Scientific Layout: " + layout;
}
