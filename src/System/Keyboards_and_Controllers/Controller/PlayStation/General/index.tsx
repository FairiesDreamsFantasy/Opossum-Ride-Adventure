/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayStationInputState {
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

export const PlayStationGeneralConfig = {
  name: "PlayStation Controller Driver Config",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  deadzone: 0.15,
  buttons: {
    CROSS: 0,   // Standard PS Cross/X is Button 0
    START: 9,   // Standard PS Options/Start is Button 9
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15
  }
};

/**
 * Checks if a gamepad is a PlayStation controller (PS3, PS4 DualShock, PS5 DualSense) based on its description
 */
export function isPlayStationController(id: string): boolean {
  const normalized = id.toLowerCase();
  return (
    normalized.includes("playstation") ||
    normalized.includes("ps3") ||
    normalized.includes("ps4") ||
    normalized.includes("ps5") ||
    normalized.includes("sony") ||
    normalized.includes("dualshock") ||
    normalized.includes("dualsense") ||
    normalized.includes("wireless controller") // Often default fallback name for PS4/5 controllers over Bluetooth
  );
}

/**
 * Maps standard HTML5 Gamepad inputs into a normalized PlayStation input state.
 * Includes continuous mathematical deadzone filtering.
 */
export function mapPlayStationGamepadInput(gp: Gamepad): PlayStationInputState {
  const d = PlayStationGeneralConfig.deadzone;
  const axesX = gp.axes[0] || 0;
  const axesY = gp.axes[1] || 0;

  // Apply continuous quadratic deadzone
  const filterAxis = (val: number): number => {
    const absVal = Math.abs(val);
    if (absVal < d) return 0;
    const normalized = (absVal - d) / (1 - d);
    return Math.sign(val) * Math.pow(normalized, 2);
  };

  const jump = gp.buttons[PlayStationGeneralConfig.buttons.CROSS]?.pressed || false;
  const pause = gp.buttons[PlayStationGeneralConfig.buttons.START]?.pressed || false;

  const dpadUp = gp.buttons[PlayStationGeneralConfig.buttons.DPAD_UP]?.pressed || false;
  const dpadDown = gp.buttons[PlayStationGeneralConfig.buttons.DPAD_DOWN]?.pressed || false;
  const dpadLeft = gp.buttons[PlayStationGeneralConfig.buttons.DPAD_LEFT]?.pressed || false;
  const dpadRight = gp.buttons[PlayStationGeneralConfig.buttons.DPAD_RIGHT]?.pressed || false;

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
