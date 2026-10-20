/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Keyboards and Controllers General Configuration & Key Mappings
 */
export const KEY_MAPPINGS = {
  MOVEMENT: {
    FORWARD: ["KeyW", "ArrowUp"],
    BACKWARD: ["KeyS", "ArrowDown"],
    LEFT: ["KeyA", "ArrowLeft"],
    RIGHT: ["KeyD", "ArrowRight"],
    JUMP: ["Space", "KeyK"],
    ACTION: ["Enter", "KeyE", "KeyJ"]
  },
  SYSTEM: {
    CANCEL_SPEECH: ["ControlLeft", "ControlRight", "Control"],
    PAUSE: ["Escape", "KeyP"]
  }
};

export const GAMEPAD_DEAFULT_CONFIG = {
  DEADZONE_INNER: 0.12,
  DEADZONE_OUTER: 0.95,
  POLLING_INTERVAL_MS: 16.666666666666668 // 60 FPS exact frame time
};
