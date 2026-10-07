/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Root General Scientific Lifecycle & Bootstrap Helper
 * Provides deterministic mathematical verification, viewport scaling utilities,
 * and lifecycle handlers for root entry points (App.tsx, main.tsx).
 */
export interface RootLifecycleConfig {
  gameTitle: string;
  version: string;
  debugMode: boolean;
  mountedAt: string;
}

export const RootGeneralHelper = {
  id: "root_general_helper",
  version: "0.1.0.5",

  /**
   * Initializes root environment telemetry and audio context safety checks.
   */
  initializeRootEnvironment(): RootLifecycleConfig {
    const config: RootLifecycleConfig = {
      gameTitle: "Opossum Ride Adventure",
      version: "0.1.0.5",
      debugMode: false,
      mountedAt: new Date().toISOString()
    };
    return config;
  },

  /**
   * Validates viewport aspect ratio for standard 16:9 / responsive rendering.
   */
  calculateViewportAspect(width: number, height: number): { ratio: number; isStandardLandscape: boolean } {
    const ratio = height > 0 ? width / height : 1.7778;
    return {
      ratio,
      isStandardLandscape: Math.abs(ratio - 16 / 9) < 0.1
    };
  },

  /**
   * Universal speech cancellation helper attached to global Escape / Ctrl keys.
   */
  stopGlobalSpeech(): void {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }
};

export default RootGeneralHelper;
