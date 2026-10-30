/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { isXboxController, mapXboxGamepadInput, XboxInputState } from "./General";

export * from "./General";

/**
 * Xbox Gamepad Controller Manager
 * Monitors Xbox hardware state, parses digital inputs, and handles analog vectors.
 */
export class XboxControllerManagerController {
  private static instance: XboxControllerManagerController;

  private constructor() {}

  public static getInstance(): XboxControllerManagerController {
    if (!XboxControllerManagerController.instance) {
      XboxControllerManagerController.instance = new XboxControllerManagerController();
    }
    return XboxControllerManagerController.instance;
  }

  public detectXboxController(): Gamepad | null {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return null;
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
      if (gp && isXboxController(gp.id)) {
        return gp;
      }
    }
    return null;
  }

  public getXboxInput(): XboxInputState | null {
    const gp = this.detectXboxController();
    if (!gp) return null;
    return mapXboxGamepadInput(gp);
  }
}

export const XboxControllerManager = XboxControllerManagerController.getInstance();
