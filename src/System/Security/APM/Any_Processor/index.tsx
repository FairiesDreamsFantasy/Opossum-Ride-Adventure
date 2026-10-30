/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../General";

export const AnyProcessorProfile: APMProfile = {
  platformId: "UNIVERSAL_ANY_PROCESSOR_ADAPTER",
  category: "ANY_PROCESSOR",
  supported: true,
  capabilities: {
    webAudio: true,
    canvas2D: true,
    highPrecisionTimer: true,
    cryptoSubtle: true,
    gamepadAPI: true,
    touchEvents: true
  },
  architectureTarget: "CPU_AGNOSTIC_EXECUTION_MATRIX"
};
