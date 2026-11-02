/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AccessibilityPreferences {
  screenReaderEnabled: boolean;
  highContrastEnabled: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  keyboardFocusOutline: boolean;
  audioDescriptions: boolean;
}

export interface ScreenReaderDirectives {
  allowOpossumGridSpeech: false; // MANDATE: No announcement on opossum grid click
  allowInterstitialAdSpeech: false; // MANDATE: No announcement on ads
  globalCtrlKeyCancelsSpeech: true; // MANDATE: Ctrl key cancels window.speechSynthesis
}

export const GeneralAccessibilityConfig = {
  version: "0.2.6.0",
  standard: "40,000,000,000%_ULTRA_BROAD",
  mandates: {
    allowOpossumGridSpeech: false,
    allowInterstitialAdSpeech: false,
    globalCtrlKeyCancelsSpeech: true
  } as const
};
