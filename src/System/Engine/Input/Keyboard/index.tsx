/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../types";
import { KeyboardSystem, KeyBinding } from "../../../Keyboards_and_Controllers/Keyboard";
import { KeyboardGeneralInput } from "./General";

export const InputKeyboard = {
  General: KeyboardGeneralInput,

  /**
   * Helper to identify matching key bindings for key events.
   */
  findBinding: (
    e: { key: string; code?: string; shiftKey: boolean }, 
    layout: KeyboardLayoutType
  ): KeyBinding | undefined => {
    return KeyboardSystem.findBinding(e as any, layout);
  }
};

export default InputKeyboard;
