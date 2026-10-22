/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lubuntu LXQt Ultra-Lightweight System Engine
 */

export class LubuntuProfileEngine {
  public readonly distroName = "Lubuntu";
  public readonly desktopEnvironment = "LXQt 2.0";
  public readonly windowManager = "Openbox / KWin";

  public getMemoryProfile(): { targetIdleMemoryMB: number } {
    return { targetIdleMemoryMB: 350 };
  }
}

export default LubuntuProfileEngine;
