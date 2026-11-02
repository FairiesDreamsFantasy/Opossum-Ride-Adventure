/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputGamePadGeneral } from "./General";

export const InputGamePad = {
  General: InputGamePadGeneral,
  pollGamepads() {
    return InputGamePadGeneral.getGamepadState();
  }
};

export { InputGamePadGeneral };
export default InputGamePad;
