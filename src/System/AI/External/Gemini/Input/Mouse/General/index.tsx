/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const InputMouseGeneral = {
  systemName: "Gemini Mouse Input General Subsystem",
  status: "Active",
  getSensitivitySettings() {
    return {
      pointerLock: true,
      sensitivity: 1.0,
      invertY: false
    };
  }
};

export default InputMouseGeneral;
