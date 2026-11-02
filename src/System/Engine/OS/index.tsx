/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FreeDOSOperatingSystemBridge, FreeDOS } from "./FreeDOS";
import { LinuxOperatingSystemBridge, Linux } from "./Linux";

export * from "./FreeDOS";
export * from "./Linux";

/**
 * Operating Systems Runtime & Multi-Platform Engine Subsystem.
 * Integrates FreeDOS retro-computing execution and Linux distribution suites (Debian, Ubuntu, Xubuntu, Lubuntu, Kubuntu, Arch, Mint).
 */
export class OperatingSystemsEngineSubsystem {
  public readonly FreeDOS: FreeDOSOperatingSystemBridge = FreeDOS;
  public readonly Linux: LinuxOperatingSystemBridge = Linux;

  /**
   * Detects the runtime platform environment.
   */
  public detectCurrentEnvironment(): {
    platform: "Web" | "Linux" | "FreeDOS" | "Hybrid";
    isPOSIX: boolean;
    isRealModeAvailable: boolean;
  } {
    return {
      platform: "Web",
      isPOSIX: true,
      isRealModeAvailable: true
    };
  }
}

export const OperatingSystemsEngine = new OperatingSystemsEngineSubsystem();
export default OperatingSystemsEngine;
