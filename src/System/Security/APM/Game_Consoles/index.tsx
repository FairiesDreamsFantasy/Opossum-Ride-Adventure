/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APMProfile } from "../General";

export const GameConsoleProfiles: Record<string, APMProfile> = {
  UniversalConsole: {
    platformId: "CONSOLE_UNIVERSAL",
    category: "GAME_CONSOLE",
    supported: true,
    capabilities: {
      webAudio: true,
      canvas2D: true,
      highPrecisionTimer: true,
      cryptoSubtle: true,
      gamepadAPI: true,
      touchEvents: false
    },
    architectureTarget: "DIRECT_GAMEPAD_RENDER_PIPELINE"
  },
  CustomBuiltMachine: {
    platformId: "CUSTOM_BUILT_MACHINE",
    category: "GAME_CONSOLE",
    supported: true,
    capabilities: {
      webAudio: true,
      canvas2D: true,
      highPrecisionTimer: true,
      cryptoSubtle: true,
      gamepadAPI: true,
      touchEvents: true
    },
    architectureTarget: "CUSTOM_HARDWARE_INTEGRATION"
  }
};
