/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const InputKeyboardGeneral = {
  systemName: "Gemini Keyboard Input General Subsystem",
  status: "Active",
  mapLayout(layoutName: string = "QWERTY") {
    return {
      layout: layoutName,
      keyCount: 104,
      supportsControlSpeechCancel: true
    };
  }
};

export default InputKeyboardGeneral;
