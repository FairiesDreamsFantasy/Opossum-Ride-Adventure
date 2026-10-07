/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Xubuntu Xfce Fast Lightweight Profile Engine
 */

export class XubuntuProfileEngine {
  public readonly distroName = "Xubuntu";
  public readonly desktopEnvironment = "Xfce 4.18";
  public readonly compositor = "Xfwm4";

  public getPerformanceFlags(): { lightweightMode: boolean; compositingDelayMs: number } {
    return {
      lightweightMode: true,
      compositingDelayMs: 0
    };
  }
}

export default XubuntuProfileEngine;
