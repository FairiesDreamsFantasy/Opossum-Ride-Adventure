/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualGameControllerConfig {
  platform: "Universal_Gamepad" | "Xbox" | "PlayStation" | "Nintendo_Switch" | "Arcade_Stick";
  analogSticks: number;
  digitalButtons: number;
  vibrationRumbleSupported: boolean;
}

export const GeminiGameController = {
  systemName: "Gemini Virtual Game Controller Perceptual Engine",
  config: {
    platform: "Universal_Gamepad",
    analogSticks: 2,
    digitalButtons: 16,
    vibrationRumbleSupported: true
  } as VirtualGameControllerConfig
};

export default GeminiGameController;
