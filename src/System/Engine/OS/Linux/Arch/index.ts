/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Arch Linux Rolling Release Subsystem & Pacman Manifest Bridge
 */

export class ArchLinuxEngine {
  public readonly distroName = "Arch Linux";
  public readonly releaseModel = "Rolling Release";
  public readonly packageManager = "pacman (libalpm)";
  public readonly initSystem = "systemd";

  public getArchMetadata(): { distro: string; model: string; pacmanVersion: string } {
    return {
      distro: this.distroName,
      model: this.releaseModel,
      pacmanVersion: "v6.1"
    };
  }
}

export const Arch = new ArchLinuxEngine();
export default Arch;
