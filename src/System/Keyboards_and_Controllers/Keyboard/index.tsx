/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KeyboardLayoutType } from "../../../types";
import { KeyboardLayoutGeneral } from "./General";

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
  General: KeyboardLayoutGeneral,
  getBindingsForLayout: (layout: KeyboardLayoutType): KeyBinding[] => {
    return layout === KeyboardLayoutType.CEDELLA ? CEDELLA_BINDINGS : ARDEN_DENIS_BINDINGS;
  },
  findBinding: (e: KeyboardEvent, layout: KeyboardLayoutType): KeyBinding | undefined => {
    const bindings = layout === KeyboardLayoutType.CEDELLA ? CEDELLA_BINDINGS : ARDEN_DENIS_BINDINGS;
    return bindings.find((b) => {
      if (b.shiftKey !== undefined && b.shiftKey !== e.shiftKey) return false;
      return b.key.toLowerCase() === e.key.toLowerCase() || b.key === e.key;
    });
  },
  layouts: [KeyboardLayoutType.CEDELLA, KeyboardLayoutType.ARDEN_DENIS],
  handleGlobalCtrlCancel: (e: KeyboardEvent): boolean => {
    if (e.key === "Control" || e.ctrlKey) {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      return true;
    }
    return false;
  },
  handleUnitToggle: (e: KeyboardEvent, isImperial: boolean, onToggle: (next: boolean) => void): boolean => {
    if (e.key === "4") {
      const next = !isImperial;
      onToggle(next);
      return true;
    }
    return false;
  },
  handleCruiseControl: (
    e: KeyboardEvent,
    layout: KeyboardLayoutType,
    currentCruise: number,
    isPlaying: boolean,
    onUpdate: (nextCruise: number, status: string) => void
  ): boolean => {
    if (!isPlaying) return false;
    const isCedella = layout === KeyboardLayoutType.CEDELLA;
    const isArden = layout === KeyboardLayoutType.ARDEN_DENIS;

    if ((isCedella && e.key === "]") || (isArden && (e.key === "i" || e.key === "I"))) {
      const next = Math.min(30, currentCruise + 5);
      onUpdate(next, `Cruise control increased to ${Math.round(next)} mph`);
      return true;
    }
    if ((isCedella && e.key === "[") || (isArden && (e.key === "k" || e.key === "K"))) {
      const next = Math.max(0, currentCruise - 5);
      onUpdate(next, `Cruise control decreased to ${Math.round(next)} mph`);
      return true;
    }
    if (isCedella && e.key === "0") {
      onUpdate(0, "Cruise control stopped");
      return true;
    }
    return false;
  }
};

export { KeyboardLayoutGeneral };
export default KeyboardSystem;
