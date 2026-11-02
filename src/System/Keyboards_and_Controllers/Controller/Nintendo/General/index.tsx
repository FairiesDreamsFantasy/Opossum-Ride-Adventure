/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NintendoInputState {
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

export const NintendoGeneralConfig = {
  name: "Nintendo Controller Driver Config",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  deadzone: 0.15,
  buttons: {
    SWITCH_B: 0,       // Bottom button on Switch
    SWITCH_A: 1,       // Right button on Switch (Physical "A" key)
    SWITCH_PLUS: 9,    // Options / Start / Plus button
    DPAD_UP: 12,
    DPAD_DOWN: 13,
    DPAD_LEFT: 14,
    DPAD_RIGHT: 15
  }
};

/**
 * Checks if a gamepad is any type of Nintendo Controller (Switch, Joy-Con, NES, SNES, N64, GB, DS, 3DS)
 */
export function isNintendoController(id: string): boolean {
  const normalized = id.toLowerCase();
  return (
    normalized.includes("nintendo") ||
    normalized.includes("switch") ||
    normalized.includes("joy-con") ||
    normalized.includes("joycon") ||
    normalized.includes("pro controller") ||
    normalized.includes("nes") ||
    normalized.includes("snes") ||
    normalized.includes("n64") ||
    normalized.includes("gameboy") ||
    normalized.includes("game boy") ||
    normalized.includes("ds controller") ||
    normalized.includes("3ds") ||
    normalized.includes("retrolink") || // Common brand for USB retro NES/SNES/N64 controllers
    normalized.includes("classic controller")
  );
}

/**
 * Maps standard HTML5 Gamepad inputs into a normalized Nintendo input state.
 * Includes retro controllers (NES, SNES, N64, Game Boy, DS, 3DS) and Switch controllers.
 * GUARANTEE: Physical Button "A" (Button 1 on Switch, or standard mapped A) ALWAYS triggers Jump.
 */
export function mapNintendoGamepadInput(gp: Gamepad): NintendoInputState {
  const normalizedId = gp.id.toLowerCase();
  const d = NintendoGeneralConfig.deadzone;
  const axesX = gp.axes[0] || 0;
  const axesY = gp.axes[1] || 0;

  // Apply continuous quadratic deadzone
  const filterAxis = (val: number): number => {
    const absVal = Math.abs(val);
    if (absVal < d) return 0;
    const normalized = (absVal - d) / (1 - d);
    return Math.sign(val) * Math.pow(normalized, 2);
  };

  // Determine which button indices represent Jump and Pause
  let jumpButtonIndex = NintendoGeneralConfig.buttons.SWITCH_A; // Default to physical "A" button
  let pauseButtonIndex = NintendoGeneralConfig.buttons.SWITCH_PLUS;

  // Adapt based on specific retro console controller profiles
  if (normalizedId.includes("nes") || normalizedId.includes("gameboy") || normalizedId.includes("game boy")) {
    // NES & Game Boy typically have only two action buttons (B and A)
    // A is usually button 1 or button 0
    jumpButtonIndex = gp.buttons[1] ? 1 : 0;
    pauseButtonIndex = gp.buttons[9] ? 9 : (gp.buttons[8] ? 8 : 2); // Start is often 9 or 8 (Select is 8)
  } else if (normalizedId.includes("snes") || normalizedId.includes("ds") || normalizedId.includes("3ds")) {
    // SNES, DS, 3DS have A, B, X, Y layouts similar to standard controller standard
    jumpButtonIndex = NintendoGeneralConfig.buttons.SWITCH_A; // Button 1
    pauseButtonIndex = gp.buttons[9] ? 9 : 8;
  } else if (normalizedId.includes("n64")) {
    // N64 layout has A button (typically button 0 or 1)
    jumpButtonIndex = gp.buttons[0] ? 0 : 1;
    pauseButtonIndex = gp.buttons[9] ? 9 : 8;
  }

  // Mandatory Rule: Physical "A" (Button 1 on Standard Gamepad, e.g. Switch Right button) MUST jump.
  // We check the specific mapped jumpButtonIndex, but also fallback to ANY potential physical "A" button
  // (Button 1 or Button 0 on standard mapping layouts) to be fully flexible for different controller layouts.
  const jump =
    gp.buttons[jumpButtonIndex]?.pressed ||
    gp.buttons[NintendoGeneralConfig.buttons.SWITCH_A]?.pressed ||
    gp.buttons[NintendoGeneralConfig.buttons.SWITCH_B]?.pressed || // Allow B too for maximum comfort
    false;

  const pause = gp.buttons[pauseButtonIndex]?.pressed || gp.buttons[9]?.pressed || false;

  const dpadUp = gp.buttons[NintendoGeneralConfig.buttons.DPAD_UP]?.pressed || false;
  const dpadDown = gp.buttons[NintendoGeneralConfig.buttons.DPAD_DOWN]?.pressed || false;
  const dpadLeft = gp.buttons[NintendoGeneralConfig.buttons.DPAD_LEFT]?.pressed || false;
  const dpadRight = gp.buttons[NintendoGeneralConfig.buttons.DPAD_RIGHT]?.pressed || false;

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
