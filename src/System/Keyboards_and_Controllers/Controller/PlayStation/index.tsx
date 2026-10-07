/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { isPlayStationController, mapPlayStationGamepadInput, PlayStationInputState } from "./General";

export * from "./General";

/**
 * PlayStation Gamepad Controller Manager
 * Monitors Sony hardware state, parses digital inputs, and handles analog vectors.
 */
export class PlayStationControllerManagerController {
  private static instance: PlayStationControllerManagerController;

  private constructor() {}

  public static getInstance(): PlayStationControllerManagerController {
    if (!PlayStationControllerManagerController.instance) {
      PlayStationControllerManagerController.instance = new PlayStationControllerManagerController();
    }
    return PlayStationControllerManagerController.instance;
  }

  public detectPlayStationController(): Gamepad | null {
    if (typeof navigator === "undefined" || !navigator.getGamepads) return null;
    const gamepads = navigator.getGamepads();
    for (const gp of gamepads) {
      if (gp && isPlayStationController(gp.id)) {
        return gp;
      }
    }
    return null;
  }

  public getPlayStationInput(): PlayStationInputState | null {
    const gp = this.detectPlayStationController();
    if (!gp) return null;
    return mapPlayStationGamepadInput(gp);
  }
}

export const PlayStationControllerManager = PlayStationControllerManagerController.getInstance();
