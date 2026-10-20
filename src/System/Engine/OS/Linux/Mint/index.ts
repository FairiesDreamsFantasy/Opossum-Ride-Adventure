/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Linux Mint Cinnamon Desktop & Driver Integration Engine
 */

export class LinuxMintEngine {
  public readonly distroName = "Linux Mint";
  public readonly release = "22 (Wilma)";
  public readonly desktopEnvironment = "Cinnamon 6.2";
  public readonly updateManagerPolicy = "Stability-First";

  public getMintProfile(): { name: string; release: string; desktop: string } {
    return {
      name: this.distroName,
      release: this.release,
      desktop: this.desktopEnvironment
    };
  }
}

export const Mint = new LinuxMintEngine();
export default Mint;
