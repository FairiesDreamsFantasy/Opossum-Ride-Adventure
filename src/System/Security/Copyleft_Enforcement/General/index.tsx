/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CopyleftPlatformCheckResult {
  isCompliant: boolean;
  platformType: "PC_OPEN_BROWSER" | "HOMEBREW_DEVICE" | "CLOSED_PROPRIETARY_DRM_CONSOLE" | "PHYSICAL_OPTICAL_DISC_DRM" | "DIGITAL_DOWNLOAD_DRM" | "UNKNOWN";
  detectedSignature?: string;
  enforcementMessage?: string;
}

export const COPYLEFT_MESSAGES = {
  // Physical Optical Disc with DRM
  PHYSICAL_OPTICAL_DISC_DRM:
    "Warning: This game appears to be compromized by DRM implemented by a disgruntled developer or company. If you somehow got this disc that violates copy left, you should always report a problem with proper professionals available in your area. This is an unauthorized DRM-Enabled copy of this material.",
  
  // Downloaded Digital Copy with DRM / unauthorized packaging
  DIGITAL_DOWNLOAD_DRM:
    "Unfortunately, you must've got the wrong copy of this game. Please visit our website to play our game that is 'DRM-Free', or find a home brew network where this game is available. You can always report a problem with this copy.",

  // Closed Proprietary Console Wrapper
  CLOSED_CONSOLE_DRM:
    "To play this game, please use a PC, or a home brew device. Thank you!!"
};

/**
 * Hard enforcement copyleft verification logic.
 * Detects closed-source DRM console wrappers, infected optical discs, and unauthorized digital download packages.
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
  const href = (window.location && window.location.href ? window.location.href : "").toLowerCase();
  const protocol = (window.location && window.location.protocol ? window.location.protocol : "").toLowerCase();

  // 1. Detection of Physical Optical Discs with unauthorized DRM wrappers / sector locks
  const isOpticalDiscEnvironment = 
    protocol === "file:" && (
      href.includes("/cdrom") ||
      href.includes("/media/cdrom") ||
      href.includes("/mnt/cdrom") ||
      /^[a-z]:[\\/].*(?:cd|dvd|bluray|disc)/i.test(href) ||
      !!win.__OPTICAL_DISC_SESSION__
    );

  const hasOpticalDiscDRM = 
    isOpticalDiscEnvironment && (
      !!win.__SECURE_DISC__ ||
      !!win.__SECTOR_VALIDATION__ ||
      !!win.__DISC_ENCRYPTED__ ||
      !!win.__DRM_DONGLE_ACTIVE__ ||
      userAgent.includes("securom") ||
      userAgent.includes("safedisc") ||
      userAgent.includes("starforce")
    );

  if (hasOpticalDiscDRM) {
    return {
      isCompliant: false,
      platformType: "PHYSICAL_OPTICAL_DISC_DRM",
      detectedSignature: "Physical Optical Disc DRM Infection",
      enforcementMessage: COPYLEFT_MESSAGES.PHYSICAL_OPTICAL_DISC_DRM
    };
  }

  // 2. Detection of unauthorized Downloaded Digital Binary Wrappers (Electron/Tauri/Cordova packaging with DRM)
  const isClosedBinaryWrapper = 
    !!win.electron || 
    !!win.__TAURI__ || 
    !!win.cordova || 
    !!win.Capacitor ||
    !!win.__DIGITAL_DOWNLOAD_DRM__ ||
    userAgent.includes("ms-appx") ||
    userAgent.includes("packagedapp");

  if (isClosedBinaryWrapper) {
    return {
      isCompliant: false,
      platformType: "DIGITAL_DOWNLOAD_DRM",
      detectedSignature: "Digital Download Unauthorized DRM Wrapper",
      enforcementMessage: COPYLEFT_MESSAGES.DIGITAL_DOWNLOAD_DRM
    };
  }

  // 3. Detection of closed Nintendo Switch native app/store wrappers & proprietary SDK shims
  const isNintendoNativeWrapper = 
    !!win.Nintendo || 
    !!win.nx || 
    !!win.webkit?.messageHandlers?.nintendo ||
    (userAgent.includes("nintendo switch") && !userAgent.includes("mozilla"));

  // 4. Detection of closed Sony PlayStation native store app wrappers & SDK shims
  const isPlayStationNativeWrapper = 
    !!win.PlayStation ||
    !!win.psn ||
    !!win.webkit?.messageHandlers?.playstation ||
    (userAgent.includes("playstation") && !userAgent.includes("mozilla"));

  // 5. Detection of closed Microsoft Xbox native store app wrappers & UWP DRM containers
  const isXboxNativeWrapper = 
    !!win.Xbox ||
    !!win.Windows?.Xbox;

  // 6. Verify legitimate open homebrew devices (Linux-based retro handhelds, custom kernels)
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

  // Hard enforcement trip if closed corporate DRM console wrappers are identified
  if (isNintendoNativeWrapper || isPlayStationNativeWrapper || isXboxNativeWrapper) {
    const signature = isNintendoNativeWrapper
      ? "Nintendo Native DRM Wrapper"
      : isPlayStationNativeWrapper
      ? "PlayStation Native DRM Wrapper"
      : "Xbox Native DRM Container";

    return {
      isCompliant: false,
      platformType: "CLOSED_PROPRIETARY_DRM_CONSOLE",
      detectedSignature: signature,
      enforcementMessage: COPYLEFT_MESSAGES.CLOSED_CONSOLE_DRM
    };
  }

  // Permitted: Standard open web browsers on PC (Linux, Windows, macOS, BSD) or open console browsers (e.g. Edge on Xbox)
  return {
    isCompliant: true,
    platformType: "PC_OPEN_BROWSER"
  };
}

export const CopyleftEnforcementGeneral = {
  version: "1.1.0",
  standard: "GNU GPL v3 Section 6 Anti-Tivoization Hard Enforcement",
  evaluate: evaluateCopyleftCompliance,
  messages: COPYLEFT_MESSAGES,
  defaultEnforcementMessage: COPYLEFT_MESSAGES.CLOSED_CONSOLE_DRM
};
