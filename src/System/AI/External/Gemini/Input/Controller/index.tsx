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

export const InputController = {
  systemName: "Gemini Input Master Controller Subsystem",
  status: "Active",
  getActiveInputs() {
    return {
      keyboard: true,
      mouse: true,
      touch: InputTouchscreen.isTouchDevice(),
      voice: InputVoice.isVoiceSupported(),
      gamepad: InputGamePad.pollGamepads().connected
    };
  }
};

export default InputController;
