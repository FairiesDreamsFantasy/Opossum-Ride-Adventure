/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../../General";

export const FreeDOSPlatformProfile: APMProfile = {
  platformId: "OPEN_SOURCE_OS_FREEDOS",
  category: "OPEN_SOURCE_OS",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: false,
    touchEvents: false
  },
  architectureTarget: "X86_REAL_OR_PROTECTED_MODE_ADAPTER"
};
