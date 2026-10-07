/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InputTouchscreenGeneral } from "./General";

export const InputTouchscreen = {
  General: InputTouchscreenGeneral,
  isTouchDevice(): boolean {
    return typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }
};

export { InputTouchscreenGeneral };
export default InputTouchscreen;
