/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../../General";

export const LinuxPlatformProfile: APMProfile = {
  platformId: "OPEN_SOURCE_OS_LINUX",
  category: "OPEN_SOURCE_OS",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "POSIX_KERNEL_UNIVERSAL"
};
