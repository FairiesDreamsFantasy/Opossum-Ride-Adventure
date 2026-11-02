/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualMicrophoneConfig, DEFAULT_VIRTUAL_MICROPHONE_CONFIG } from "../Data";

export class GeminiMicrophoneGeneralEngine {
  public static readonly systemName = "Gemini Virtual Microphone Perception General Engine";

  private config: VirtualMicrophoneConfig = { ...DEFAULT_VIRTUAL_MICROPHONE_CONFIG };

  public getConfig(): VirtualMicrophoneConfig {
    return { ...this.config };
  }

  public setGainLevel(gain: number) {
    this.config.gainLevel = Math.max(0, Math.min(2.0, gain));
  }

  public setStereoPanner(pan: number) {
    this.config.stereoPanner = Math.max(-1.0, Math.min(1.0, pan));
  }
}

export const GeminiMicrophoneGeneral = {
  systemName: GeminiMicrophoneGeneralEngine.systemName,
  Engine: GeminiMicrophoneGeneralEngine,
};
