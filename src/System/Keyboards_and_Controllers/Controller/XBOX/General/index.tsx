/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface XboxInputState {
  jump: boolean;
  pause: boolean;
  dpad: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
  };
  leftStick: {
    x: number;
    y: number;
  };
}

export const XboxGeneralConfig = {
  name: "Xbox Controller Driver Config",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  deadzone: 0.15,
  buttons: {
    A: 0,
    START: 9,
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15
  }
};

/**
 * Checks if a gamepad is an Xbox controller based on its product ID / description
 */
export function isXboxController(id: string): boolean {
  const normalized = id.toLowerCase();
  return (
    normalized.includes("xbox") ||
    normalized.includes("x-input") ||
    normalized.includes("xinput") ||
    normalized.includes("microsoft") ||
    normalized.includes("360") ||
    normalized.includes("one")
  );
}

/**
 * Maps standard HTML5 Gamepad inputs into a normalized Xbox input state.
 * Includes continuous mathematical deadzone filtering.
 */
export function mapXboxGamepadInput(gp: Gamepad): XboxInputState {
  const d = XboxGeneralConfig.deadzone;
  const axesX = gp.axes[0] || 0;
  const axesY = gp.axes[1] || 0;

  // Apply continuous quadratic deadzone: f(x) = sign(x) * max(0, |x| - d) / (1 - d)
  const filterAxis = (val: number): number => {
    const absVal = Math.abs(val);
    if (absVal < d) return 0;
    const normalized = (absVal - d) / (1 - d);
    return Math.sign(val) * Math.pow(normalized, 2);
  };

  const jump = gp.buttons[XboxGeneralConfig.buttons.A]?.pressed || false;
  const pause = gp.buttons[XboxGeneralConfig.buttons.START]?.pressed || false;

  const dpadUp = gp.buttons[XboxGeneralConfig.buttons.DPAD_UP]?.pressed || false;
  const dpadDown = gp.buttons[XboxGeneralConfig.buttons.DPAD_DOWN]?.pressed || false;
  const dpadLeft = gp.buttons[XboxGeneralConfig.buttons.DPAD_LEFT]?.pressed || false;
  const dpadRight = gp.buttons[XboxGeneralConfig.buttons.DPAD_RIGHT]?.pressed || false;

  return {
    jump,
    pause,
    dpad: {
      up: dpadUp,
      down: dpadDown,
      left: dpadLeft,
      right: dpadRight
    },
    leftStick: {
      x: Number(filterAxis(axesX).toFixed(4)),
      y: Number(filterAxis(axesY).toFixed(4))
    }
  };
}
