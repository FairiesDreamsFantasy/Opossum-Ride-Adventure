/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CopyleftPlatformCheckResult {
  isCompliant: boolean;
  platformType: "PC_OPEN_BROWSER" | "HOMEBREW_DEVICE" | "CLOSED_PROPRIETARY_DRM_CONSOLE" | "UNKNOWN";
  detectedSignature?: string;
  enforcementMessage?: string;
}

/**
 * Hard enforcement copyleft verification logic.
 * Detects closed-source DRM console wrappers and Anti-Tivoization violations.
 */
export function evaluateCopyleftCompliance(): CopyleftPlatformCheckResult {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      isCompliant: true,
      platformType: "PC_OPEN_BROWSER"
    };
  }

  const userAgent = (navigator.userAgent || "").toLowerCase();
  const win = window as any;

  // 1. Detection of closed Nintendo Switch native app/store wrappers & proprietary SDK shims
  const isNintendoNativeWrapper = 
    !!win.Nintendo || 
    !!win.nx || 
    !!win.webkit?.messageHandlers?.nintendo ||
    (userAgent.includes("nintendo switch") && !userAgent.includes("mozilla"));

  // 2. Detection of closed Sony PlayStation native store app wrappers & SDK shims
  const isPlayStationNativeWrapper = 
    !!win.PlayStation ||
    !!win.psn ||
    !!win.webkit?.messageHandlers?.playstation ||
    (userAgent.includes("playstation") && !userAgent.includes("mozilla"));

  // 3. Detection of closed Microsoft Xbox native store app wrappers & UWP DRM containers
  const isXboxNativeWrapper = 
    !!win.Xbox ||
    !!win.Windows?.Xbox ||
    userAgent.includes("ms-appx") ||
    userAgent.includes("packagedapp");

  // 4. Detection of unauthorized binary wrapping frameworks (attempting to turn open web into closed binaries)
  const isClosedBinaryWrapper = 
    !!win.electron || 
    !!win.__TAURI__ || 
    !!win.cordova || 
    !!win.Capacitor;

  // 5. Verify legitimate open homebrew devices (Linux-based retro handhelds, custom kernels)
  const isHomebrew = 
    userAgent.includes("homebrew") || 
    userAgent.includes("retroarch") ||
    userAgent.includes("miyoo") ||
    userAgent.includes("anbernic") ||
    win.__FDF_HOMEBREW_AUTHENTICATED__ === true;

  if (isHomebrew) {
    return {
      isCompliant: true,
      platformType: "HOMEBREW_DEVICE"
    };
  }

  // Hard enforcement trip ONLY if an unauthorized closed DRM wrapper / store container is detected
  if (isNintendoNativeWrapper || isPlayStationNativeWrapper || isXboxNativeWrapper || isClosedBinaryWrapper) {
    const signature = isNintendoNativeWrapper
      ? "Nintendo Native DRM Wrapper"
      : isPlayStationNativeWrapper
      ? "PlayStation Native DRM Wrapper"
      : isXboxNativeWrapper
      ? "Xbox Native DRM Container"
      : "Closed Binary Wrapper DRM";

    return {
      isCompliant: false,
      platformType: "CLOSED_PROPRIETARY_DRM_CONSOLE",
      detectedSignature: signature,
      enforcementMessage: "To play this game, please use a PC, or a home brew device. Thank you!!"
    };
  }

  // Permitted: Standard open web browsers on PC (Linux, Windows, macOS, BSD) or open console browsers (e.g. Edge on Xbox)
  return {
    isCompliant: true,
    platformType: "PC_OPEN_BROWSER"
  };
}

export const CopyleftEnforcementGeneral = {
  version: "1.0.0",
  standard: "GNU GPL v3 Section 6 Anti-Tivoization Hard Enforcement",
  evaluate: evaluateCopyleftCompliance,
  defaultEnforcementMessage: "To play this game, please use a PC, or a home brew device. Thank you!!"
};
