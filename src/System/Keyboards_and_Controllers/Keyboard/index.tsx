/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../types";

/**
 * Keyboard System Module
 * Manages keyboard layout mappings and input processing.
 */
export interface KeyBinding {
  key: string;
  shiftKey?: boolean;
  action: string;
  description: string;
}

export const CEDELLA_BINDINGS: KeyBinding[] = [
  { key: "ArrowLeft", action: "strafe_left", description: "Strafe Left" },
  { key: "ArrowRight", action: "strafe_right", description: "Strafe Right" },
  { key: "ArrowUp", action: "move_forward", description: "Move Forward" },
  { key: "ArrowDown", action: "move_reverse", description: "Move Reverse" },
  { key: " ", action: "jump", description: "Jump" },
  { key: "s", action: "chatter", description: "Opossum Chatter" },
  { key: "S", action: "chatter", description: "Opossum Chatter" },
  { key: "r", action: "announce_rider", description: "Announce Ridden Opossum" },
  { key: "R", action: "announce_rider", description: "Announce Ridden Opossum" },
  { key: "t", action: "toggle_view", description: "Toggle POV / Rider View" },
  { key: "T", action: "toggle_view", description: "Toggle POV / Rider View" },
  { key: "o", action: "scan_opponents", description: "Scan For Opponents" },
  { key: "O", action: "scan_opponents", description: "Scan For Opponents" },
  { key: "!", shiftKey: true, action: "toggle_chatter_notify", description: "Toggle Chatter Notifications On/Off (Shift+1)" },
  { key: "1", shiftKey: true, action: "toggle_chatter_notify", description: "Toggle Chatter Notifications On/Off (Shift+1)" },
  { key: "3", action: "announce_hud", description: "Announce HUD Information" },
  { key: "@", action: "toggle_feed", description: "Toggle Live Feed Log (Shift+2)" },
  { key: "2", shiftKey: true, action: "toggle_feed", description: "Toggle Live Feed Log (Shift+2)" },
  { key: "&", action: "pause_resume", description: "Pause / Resume Game (Shift+7)" },
  { key: "7", shiftKey: true, action: "pause_resume", description: "Pause / Resume Game (Shift+7)" }
];

export const ARDEN_DENIS_BINDINGS: KeyBinding[] = [
  { key: "a", action: "strafe_left", description: "Strafe Left" },
  { key: "A", action: "strafe_left", description: "Strafe Left" },
  { key: "d", action: "strafe_right", description: "Strafe Right" },
  { key: "D", action: "strafe_right", description: "Strafe Right" },
  { key: "w", action: "move_forward", description: "Move Forward" },
  { key: "W", action: "move_forward", description: "Move Forward" },
  { key: "s", action: "move_reverse", description: "Move Reverse" },
  { key: "S", action: "move_reverse", description: "Move Reverse" },
  { key: " ", action: "jump", description: "Jump" },
  { key: "l", action: "chatter", description: "Opossum Chatter" },
  { key: "L", action: "chatter", description: "Opossum Chatter" },
  { key: "o", action: "scan_opponents", description: "Scan For Opponents" },
  { key: "O", action: "scan_opponents", description: "Scan For Opponents" },
  { key: "r", action: "announce_rider", description: "Announce Ridden Opossum" },
  { key: "R", action: "announce_rider", description: "Announce Ridden Opossum" },
  { key: "t", action: "toggle_view", description: "Toggle POV / Rider View" },
  { key: "T", action: "toggle_view", description: "Toggle POV / Rider View" },
  { key: "!", shiftKey: true, action: "toggle_chatter_notify", description: "Toggle Chatter Notifications (Shift+1)" },
  { key: "1", shiftKey: true, action: "toggle_chatter_notify", description: "Toggle Chatter Notifications (Shift+1)" },
  { key: "3", action: "announce_hud", description: "Announce HUD Information" },
  { key: "@", action: "toggle_feed", description: "Toggle Live Feed Log (Shift+2)" },
  { key: "2", shiftKey: true, action: "toggle_feed", description: "Toggle Live Feed Log (Shift+2)" },
  { key: "&", action: "pause_resume", description: "Pause / Resume Game (Shift+7)" },
  { key: "7", shiftKey: true, action: "pause_resume", description: "Pause / Resume Game (Shift+7)" }
];

export const KeyboardSystem = {
  getBindingsForLayout: (layout: KeyboardLayoutType): KeyBinding[] => {
    return layout === KeyboardLayoutType.CEDELLA ? CEDELLA_BINDINGS : ARDEN_DENIS_BINDINGS;
  },
  layouts: [KeyboardLayoutType.CEDELLA, KeyboardLayoutType.ARDEN_DENIS],
};
