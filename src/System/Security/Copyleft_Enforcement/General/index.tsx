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

  // 1. Detection of closed Nintendo Switch proprietary browser/webview wrappers
  const isNintendoClosed = 
    userAgent.includes("nintendo switch") || 
    userAgent.includes("nintendobrowser") ||
    !!win.Nintendo || 
    !!win.nx;

  // 2. Detection of closed Sony PlayStation proprietary wrappers
  const isPlayStationClosed = 
    userAgent.includes("playstation") || 
    userAgent.includes("playstation 4") || 
    userAgent.includes("playstation 5") ||
    !!win.PlayStation ||
    !!win.psn;

  // 3. Detection of closed Microsoft Xbox proprietary app wrappers
  const isXboxClosed = 
    userAgent.includes("xbox") || 
    userAgent.includes("xbox one") || 
    userAgent.includes("xbox series") ||
    !!win.Xbox;

  // 4. Verify legitimate open homebrew devices (Linux-based retro handhelds, custom kernels)
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

  // Hard enforcement trip if a closed corporate DRM console wrapper is identified
  if (isNintendoClosed || isPlayStationClosed || isXboxClosed) {
    const signature = isNintendoClosed ? "Nintendo Closed DRM" : isPlayStationClosed ? "PlayStation Closed DRM" : "Xbox Closed DRM";
    return {
      isCompliant: false,
      platformType: "CLOSED_PROPRIETARY_DRM_CONSOLE",
      detectedSignature: signature,
      enforcementMessage: "To play this game, please use a PC, or a home brew device. Thank you!!"
    };
  }

  // Standard open web browser on PC (Linux, Windows, macOS, BSD)
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
