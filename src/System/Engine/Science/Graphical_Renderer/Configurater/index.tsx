/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../../types";
import { VISUAL_PRESETS, getLayoutName, VisualConfig } from "./General";
import { speakWords } from "../../../../Sound/TTS";

export * from "./General";

export class Configurater {
  public static applyPreset(preset: string, setters: any): void {
    const p = preset as keyof typeof VISUAL_PRESETS;
    if (VISUAL_PRESETS[p]) {
      const config = VISUAL_PRESETS[p];
      if (setters.setIs3D) setters.setIs3D(config.is3D);
    }
    speakWords(`Applying visual preset: ${preset}`);
  }

  public static applyLayout(layout: KeyboardLayoutType, setLayout: (l: KeyboardLayoutType) => void): void {
    setLayout(layout);
    speakWords(`Applying layout: ${layout}`);
  }

  public static getLayoutInfo(layout: KeyboardLayoutType): string {
    return getLayoutName(layout);
  }
}
