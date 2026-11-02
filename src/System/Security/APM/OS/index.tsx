/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MSDOSPlatformProfile } from "./MSDOS";
import { APMProfile } from "../General";

export * from "./MSDOS";

export const WindowsPlatformProfile: APMProfile = {
  platformId: "OS_WINDOWS",
  category: "LEGACY_OS",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "WIN32_WIN64_UNIVERSAL"
};

export const MacOSPlatformProfile: APMProfile = {
  platformId: "OS_MACOS",
  category: "LEGACY_OS",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "DARWIN_MACH_UNIVERSAL"
};

export const ExtendedOSRegistry = {
  MSDOS: MSDOSPlatformProfile,
  Windows: WindowsPlatformProfile,
  macOS: MacOSPlatformProfile
};
