/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiInputWildcard } from "./_Wildcard_";

/**
 * Gemini Input Coordination Subsystem.
 */
class GeminiInputSubsystem {
  public readonly Keyboard = GeminiInputWildcard.Keyboard;
  public readonly Mouse = GeminiInputWildcard.Mouse;
  public readonly Touch = GeminiInputWildcard.Touch;
  public readonly AcousticFeedback = GeminiInputWildcard.AcousticFeedback;
  public readonly Voice = GeminiInputWildcard.Voice;
  public readonly Touchscreen = GeminiInputWildcard.Touchscreen;
  public readonly GamePad = GeminiInputWildcard.GamePad;
  public readonly Controller = GeminiInputWildcard.Controller;
}

export const GeminiInput = new GeminiInputSubsystem();
export * from "./_Wildcard_";
export default GeminiInput;
