/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../General";

export const AnyHardwareProfile: APMProfile = {
  platformId: "UNIVERSAL_ANY_HARDWARE_ADAPTER",
  category: "ANY_HARDWARE",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "VIRTUAL_HARDWARE_LAYER_BRIDGE"
};
