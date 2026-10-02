/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { isNintendoController, mapNintendoGamepadInput, NintendoInputState } from "./General";

export * from "./General";

/**
 * Nintendo Gamepad Controller Manager
 * Monitors Nintendo hardware state (including NES, SNES, N64, GB, DS, 3DS, Switch),
 * parses inputs, and translates them into normalized action values.
 */
export class NintendoControllerManagerController {
  private static instance: NintendoControllerManagerController;

  private constructor() {}

  public static getInstance(): NintendoControllerManagerController {
    if (!NintendoControllerManagerController.instance) {
      NintendoControllerManagerController.instance = new NintendoControllerManagerController();
    }
    return NintendoControllerManagerController.instance;
  }

  public detectNintendoController(): Gamepad | null {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return null;
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
      if (gp && isNintendoController(gp.id)) {
        return gp;
      }
    }
    return null;
  }

  public getNintendoInput(): NintendoInputState | null {
    const gp = this.detectNintendoController();
    if (!gp) return null;
    return mapNintendoGamepadInput(gp);
  }
}

export const NintendoControllerManager = NintendoControllerManagerController.getInstance();
