/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeneralAccessibilityConfig } from "../General";

export class ScreenReaderManager {
  private static instance: ScreenReaderManager;
  private isListeningForCancelKey: boolean = false;

  private constructor() {
    this.attachGlobalSpeechCanceller();
  }

  public static getInstance(): ScreenReaderManager {
    if (!ScreenReaderManager.instance) {
      ScreenReaderManager.instance = new ScreenReaderManager();
    }
    return ScreenReaderManager.instance;
  }

  /**
   * Attaches a global listener for the Control (Ctrl) key to instantly cancel speech synthesis.
   */
  private attachGlobalSpeechCanceller(): void {
    if (typeof window === "undefined" || this.isListeningForCancelKey) return;

    window.addEventListener(
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key === "Control" || e.code === "ControlLeft" || e.code === "ControlRight") {
          this.cancelActiveSpeech();
        }
      },
      { passive: true }
    );
    this.isListeningForCancelKey = true;
  }

  /**
   * Instantly stops any active speech synthesis across the entire application.
   */
  public cancelActiveSpeech(): void {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  /**
   * Safe announcement pipeline enforcing strict gameplay rules:
   * - Never announces opossum selection clicks
   * - Never announces interstitial ads
   */
  public announceText(text: string, context?: "OPOSSUM_SELECTION" | "INTERSTITIAL_AD" | "GAMEPLAY_STATUS" | "USER_COMMAND"): void {
    // Mandate checks
    if (context === "OPOSSUM_SELECTION" && !GeneralAccessibilityConfig.mandates.allowOpossumGridSpeech) {
      return; // Suppressed by mandate
    }
    if (context === "INTERSTITIAL_AD" && !GeneralAccessibilityConfig.mandates.allowInterstitialAdSpeech) {
      return; // Suppressed by mandate
    }

    if (typeof window !== "undefined" && window.speechSynthesis && text) {
      this.cancelActiveSpeech();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }
}

export const ScreenReader = ScreenReaderManager.getInstance();
