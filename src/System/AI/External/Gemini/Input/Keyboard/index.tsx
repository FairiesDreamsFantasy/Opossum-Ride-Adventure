/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-performance Keyboard event mapping.
 */
export const InputKeyboard = {
  /**
   * Evaluates if a pressed key code is a movement control (WASD / Arrows).
   */
  isMovementKey(keyCode: string): boolean {
    return (
      keyCode === "KeyW" ||
      keyCode === "KeyA" ||
      keyCode === "KeyS" ||
      keyCode === "KeyD" ||
      keyCode === "ArrowUp" ||
      keyCode === "ArrowDown" ||
      keyCode === "ArrowLeft" ||
      keyCode === "ArrowRight" ||
      keyCode === "Space"
    );
  },

  /**
   * Detects global Control key press to cancel active Speech Synthesis instantly.
   */
  checkSpeechCancelTrigger(keyCode: string): boolean {
    return keyCode === "ControlLeft" || keyCode === "ControlRight" || keyCode === "Control";
  }
};
