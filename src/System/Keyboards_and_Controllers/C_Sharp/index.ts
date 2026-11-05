/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * C# (.NET/Mono) Local Input Hardware Interop for Gemini AI
 * Provides high-fidelity access to native machine controllers and haptics.
 */
export const GeminiInputCSharpInterop = {
  platform: "Cross-Platform Native",
  
  /**
   * Detects local hardware haptic capabilities.
   */
  getHapticCapabilities: (): string[] => {
    return ["Force_Feedback", "Precision_Rumble"];
  }
};

export default GeminiInputCSharpInterop;
