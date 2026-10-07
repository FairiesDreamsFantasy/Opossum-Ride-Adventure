/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TouchscreenCommandItem {
  id: string;
  gesture: string;
  action: string;
  description: string;
  category: "movement" | "actions" | "ui_gestures";
  hapticPattern?: number | number[];
}

export const TOUCHSCREEN_COMMANDS_DATA: TouchscreenCommandItem[] = [
  {
    id: "dpad_left",
    gesture: "◀ Left D-Pad Button",
    action: "Move / Strafe Left",
    description: "Tap the on-screen left directional button to switch lanes left.",
    category: "movement",
    hapticPattern: 15
  },
  {
    id: "dpad_right",
    gesture: "▶ Right D-Pad Button",
    action: "Move / Strafe Right",
    description: "Tap the on-screen right directional button to switch lanes right.",
    category: "movement",
    hapticPattern: 15
  },
  {
    id: "button_jump",
    gesture: "▲ JUMP Button",
    action: "Parabolic Gravity Jump",
    description: "Tap the prominent jump button on the right to leap over obstacles, mud, and water.",
    category: "movement",
    hapticPattern: [15, 30]
  },
  {
    id: "swipe_up",
    gesture: "Swipe Up Gesture",
    action: "Swipe Jump",
    description: "Flick your finger upward anywhere across the touch surface to jump.",
    category: "ui_gestures",
    hapticPattern: [10, 30, 10]
  },
  {
    id: "swipe_horizontal",
    gesture: "Swipe Left / Right",
    action: "Lane Shift",
    description: "Swipe horizontally to swiftly change lanes.",
    category: "ui_gestures",
    hapticPattern: 15
  },
  {
    id: "tap_zones",
    gesture: "Left / Right Screen Tap",
    action: "Quick Lane Shift",
    description: "Tap the left or right third of the screen to quickly adjust position.",
    category: "ui_gestures",
    hapticPattern: 12
  },
  {
    id: "menu_layout_toggle",
    gesture: "🔄 Layout Button (Top Bar)",
    action: "Cycle Screen Layout",
    description: "Single-button toggle cycling between Retro Vertical, Picture Window, and Double Screen.",
    category: "actions"
  },
  {
    id: "menu_back_exit",
    gesture: "◀ Exit Button (Top Left)",
    action: "Return to Landing Page",
    description: "Tap to safely conclude the game and return directly to the main landing hub.",
    category: "actions"
  }
];

export const TOUCHSCREEN_MODAL_METADATA = {
  title: "Touchscreen Commands",
  subtitle: "For Mobile Phones & Touchscreen Devices",
  orientationNotice: "Optimized for vertical/portrait orientation handheld play.",
  hapticNotice: "Includes integrated tactile haptic feedback responses."
};
