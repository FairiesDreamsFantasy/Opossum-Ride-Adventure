/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * General helper for keyboard input processing, modal/menu focus guards, and global control key detection.
 */
export const KeyboardGeneralInput = {
  /**
   * Checks if the active focused element is an interactive input, modal, or menubar.
   * If true, game keystrokes should typically be bypassed.
   */
  isFormOrMenuFocused: (): boolean => {
    if (typeof document === "undefined") return false;
    const activeEl = document.activeElement;
    if (!activeEl) return false;

    return !!(
      activeEl.closest("#Menu_Bar") ||
      activeEl.closest("[role='menubar']") ||
      activeEl.closest("[role='dialog']") ||
      activeEl.tagName === "INPUT" ||
      activeEl.tagName === "SELECT" ||
      activeEl.tagName === "TEXTAREA"
    );
  },

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

export default KeyboardGeneralInput;
