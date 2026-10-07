/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../../General";

export const MSDOSPlatformProfile: APMProfile = {
  platformId: "LEGACY_OS_MSDOS",
  category: "LEGACY_OS",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: false,
    touchEvents: false
  },
  architectureTarget: "MSDOS_COMPATIBILITY_SUBSYSTEM"
};
