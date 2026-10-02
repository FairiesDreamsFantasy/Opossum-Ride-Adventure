/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General helper for keyboard input processing and global control key detection.
 */
export const KeyboardGeneralInput = {
  /**
   * Instantly cancels any ongoing speech synthesis output if Control (Ctrl) key is pressed.
   */
  handleGlobalCtrlCancel: (e: KeyboardEvent): boolean => {
    if (e.key === "Control" || e.code === "ControlLeft" || e.code === "ControlRight") {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return true;
    }
    return false;
  }
};
