/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpeechOptions {
  interrupt?: boolean;
  rate?: number;
  pitch?: number;
  volume?: number;
}

/**
 * Low-level Web Speech Synthesis API abstraction for Accessible TTS output.
 */
export const TTSGeneral = {
  /**
   * Speak a string of words using Web Speech Synthesis.
   */
  speakWords: (text: string, options: SpeechOptions = {}) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    
    const synth = window.speechSynthesis;
    if (options.interrupt !== false) {
      synth.cancel();
    }

    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    if (options.volume !== undefined) utterance.volume = options.volume;

    synth.speak(utterance);
  },

  /**
   * Immediately halt any active speech synthesis.
   */
  cancelSpeech: () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
};
