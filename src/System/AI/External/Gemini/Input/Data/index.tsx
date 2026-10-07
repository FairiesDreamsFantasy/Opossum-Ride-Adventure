/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputKeyboard } from "../Keyboard";
import { InputMouse } from "../Mouse";
import { InputTouch } from "../Touch";
import { InputAcousticFeedback } from "../Acoustic_Feedback";
import { InputVoice } from "../Voice";
import { InputTouchscreen } from "../Touchscreen";
import { InputGamePad } from "../Game_Pad";
import { InputController } from "../Controller";

export const GeminiInputData = {
  Keyboard: InputKeyboard,
  Mouse: InputMouse,
  Touch: InputTouch,
  AcousticFeedback: InputAcousticFeedback,
  Voice: InputVoice,
  Touchscreen: InputTouchscreen,
  GamePad: InputGamePad,
  Controller: InputController,
};
