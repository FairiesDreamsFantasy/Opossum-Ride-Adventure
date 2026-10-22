/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const InputGamePadGeneral = {
  systemName: "Gemini GamePad Input General Subsystem",
  status: "Active",
  getGamepadState() {
    if (typeof navigator === "undefined" || !navigator.getGamepads) {
      return { connected: false, count: 0 };
    }
    const gps = Array.from(navigator.getGamepads()).filter(Boolean);
    return {
      connected: gps.length > 0,
      count: gps.length,
      pads: gps.map((gp) => ({ id: gp?.id, buttons: gp?.buttons.length, axes: gp?.axes.length }))
    };
  }
};

export default InputGamePadGeneral;
