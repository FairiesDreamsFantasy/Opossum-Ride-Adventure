/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../../types";
import { CEDELLA_BINDINGS, ARDEN_DENIS_BINDINGS, KeyBinding } from "../index";

/**
 * General helper utilities for Keyboard Layouts and Action resolution.
 */
export const KeyboardLayoutGeneral = {
  /**
   * Retrieves the active key bindings for a designated keyboard layout.
   */
  getBindings: (layout: KeyboardLayoutType): KeyBinding[] => {
    return layout === KeyboardLayoutType.CEDELLA ? CEDELLA_BINDINGS : ARDEN_DENIS_BINDINGS;
  },

  /**
   * Returns human-readable control documentation for the specified layout.
   */
  getLayoutSummary: (layout: KeyboardLayoutType): string => {
    if (layout === KeyboardLayoutType.CEDELLA) {
      return "Cedella Layout: Arrow keys for movement, Space for jump, S for chatter, r for ridden opossum description, Shift+R for rider description, T for POV toggle, O for opponent radar, 3 for HUD readout, Shift+1 for chatter notifications, Shift+2 for feed log, Shift+7 for pause/resume.";
    }
    return "Arden Denis Layout: W/A/S/D for movement, Space for jump, L for chatter, r for ridden opossum description, Shift+R for rider description, T for POV toggle, O for opponent radar, 3 for HUD readout, Shift+1 for chatter notifications, Shift+2 for feed log, Shift+7 for pause/resume.";
  },

  /**
   * Returns whether a key corresponds to the designated multi-tap narrative key for a layout.
   * Cedella: 'a'
   * Arden Denis: 'u'
   */
  isMultiTapKey: (key: string, layout: KeyboardLayoutType): boolean => {
    const k = key.toLowerCase();
    return (
      (k === "a" && layout === KeyboardLayoutType.CEDELLA) ||
      (k === "u" && layout === KeyboardLayoutType.ARDEN_DENIS)
    );
  }
};

export default KeyboardLayoutGeneral;
