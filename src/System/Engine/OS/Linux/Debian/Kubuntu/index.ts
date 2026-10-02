/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Kubuntu KDE Plasma Desktop Profile Engine
 */

export class KubuntuProfileEngine {
  public readonly distroName = "Kubuntu";
  public readonly desktopEnvironment = "KDE Plasma 6";
  public readonly toolkit = "Qt 6.7";
  public readonly compositor = "KWin Wayland";

  public getDesktopCapabilities(): { hasHDR: boolean; fractionalScaling: boolean } {
    return {
      hasHDR: true,
      fractionalScaling: true
    };
  }
}

export default KubuntuProfileEngine;
