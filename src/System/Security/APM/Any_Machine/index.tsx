/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../General";

export const AnyMachineProfile: APMProfile = {
  platformId: "UNIVERSAL_ANY_MACHINE_ADAPTER",
  category: "ANY_MACHINE",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "VIRTUAL_MACHINE_AGNOSTIC_CORE"
};
