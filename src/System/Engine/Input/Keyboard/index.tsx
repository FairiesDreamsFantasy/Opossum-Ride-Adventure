/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../types";
import { KeyboardSystem, KeyBinding } from "../../../Keyboards_and_Controllers/Keyboard";

export const InputKeyboard = {
  /**
   * Helper to identify matching key bindings for key events.
   */
  findBinding: (
    e: { key: string; code?: string; shiftKey: boolean }, 
    layout: KeyboardLayoutType
  ): KeyBinding | undefined => {
    const activeBindings = KeyboardSystem.getBindingsForLayout(layout);
    
    // Check for special Shift modifiers
    const isShift1 = (e.key === "1" || e.key === "!") && e.shiftKey;
    const isShift2 = (e.key === "2" || e.key === "@") && e.shiftKey;
    const isShift7 = (e.key === "7" || e.key === "&") && e.shiftKey;

    return activeBindings.find((b) => {
      if (isShift1) return b.action === "toggle_chatter_notify";
      if (isShift2) return b.action === "toggle_feed";
      if (isShift7) return b.action === "pause_resume";

      // Match Space bar robustly across browser key/code variations
      if (b.action === "jump") {
        if (e.key === " " || e.key === "Space" || e.key === "Spacebar" || e.code === "Space") {
          return true;
        }
      }

      // Match Arrow keys robustly
      if (b.key === "ArrowUp" && (e.key === "ArrowUp" || e.code === "ArrowUp")) return true;
      if (b.key === "ArrowDown" && (e.key === "ArrowDown" || e.code === "ArrowDown")) return true;
      if (b.key === "ArrowLeft" && (e.key === "ArrowLeft" || e.code === "ArrowLeft")) return true;
      if (b.key === "ArrowRight" && (e.key === "ArrowRight" || e.code === "ArrowRight")) return true;

      // Match WASD keys robustly
      if (e.code) {
        const codeKey = e.code.replace("Key", "");
        if (b.key.toUpperCase() === codeKey.toUpperCase()) {
          return (b.shiftKey ? e.shiftKey : true);
        }
      }

      return b.key === e.key && (b.shiftKey ? e.shiftKey : true);
    });
  }
};
