/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Safari Browser Engine Simulation (WebKit)
 */

export class SafariBrowserBridge {
  public static readonly platform = "MacIntel";

  /**
   * Simulates Safari WebKit-specific hardware acceleration.
   */
  public static enableAcceleratedCompositing(): boolean {
    return true;
  }
}

export default SafariBrowserBridge;
