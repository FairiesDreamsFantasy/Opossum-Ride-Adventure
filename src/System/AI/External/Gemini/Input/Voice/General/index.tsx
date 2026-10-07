/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const InputVoiceGeneral = {
  systemName: "Gemini Voice Input General Subsystem",
  status: "Active",
  getVoiceCapabilities() {
    return {
      speechRecognition: typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window),
      voiceCommandSet: ["ride", "jump", "stop", "chatter", "steer"],
      continuous: true
    };
  }
};

export const InputVoice = {
  General: InputVoiceGeneral,
  isVoiceSupported(): boolean {
    return InputVoiceGeneral.getVoiceCapabilities().speechRecognition;
  }
};

export default InputVoice;
