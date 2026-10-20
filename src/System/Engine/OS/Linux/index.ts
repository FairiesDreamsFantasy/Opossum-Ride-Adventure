/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LinuxKernelEngine } from "./Kernel";
import { DebianOperatingSystemEngine, Debian } from "./Debian";
import { ArchLinuxEngine, Arch } from "./Arch";
import { LinuxMintEngine, Mint } from "./Mint";

export * from "./Kernel";
export * from "./Debian";
export * from "./Arch";
export * from "./Mint";

/**
 * Linux Operating System Ecosystem Subsystem.
 * Coordinates Linux Kernel POSIX interfaces, Debian (and Ubuntu/Xubuntu/Lubuntu/Kubuntu), Arch, and Mint.
 */
export class LinuxOperatingSystemBridge {
  public readonly Kernel = new LinuxKernelEngine();
  public readonly Debian: DebianOperatingSystemEngine = Debian;
  public readonly Arch: ArchLinuxEngine = Arch;
  public readonly Mint: LinuxMintEngine = Mint;

  public getDistributionList(): string[] {
    return ["Debian", "Ubuntu", "Xubuntu", "Lubuntu", "Kubuntu", "Arch", "Mint"];
  }
}

export const Linux = new LinuxOperatingSystemBridge();
export default Linux;
