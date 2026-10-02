/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FreeDOSCPUEngine } from "./CPU";
import { FreeDOSMemoryEngine } from "./Memory";
import { FreeDOSVideoEngine } from "./Video";
import { FreeDOSSoundEngine } from "./Sound";

export * from "./CPU";
export * from "./Memory";
export * from "./Video";
export * from "./Sound";

/**
 * FreeDOS Operating System Bridge Subsystem.
 * Models 16/32-bit real-mode execution, VGA Mode 13h, conventional memory, and Sound Blaster / OPL3 FM synthesis.
 */
export class FreeDOSOperatingSystemBridge {
  public readonly CPU = new FreeDOSCPUEngine();
  public readonly Memory = new FreeDOSMemoryEngine();
  public readonly Video = new FreeDOSVideoEngine();
  public readonly Sound = new FreeDOSSoundEngine();

  public readonly version = "FreeDOS 1.3";
  public readonly kernelRevision = "2043";

  public getStatus(): {
    os: string;
    kernel: string;
    conventionalMemoryKB: number;
    videoMode: string;
    soundBlasterPort: string;
  } {
    const mem = this.Memory.getConventionalMemoryUsage();
    return {
      os: this.version,
      kernel: this.kernelRevision,
      conventionalMemoryKB: mem.totalBytes / 1024,
      videoMode: `Mode 0x${this.Video.getMode().toString(16)} (320x200 256c)`,
      soundBlasterPort: `0x${this.Sound.getConfig().basePort.toString(16).toUpperCase()}`
    };
  }
}

export const FreeDOS = new FreeDOSOperatingSystemBridge();
export default FreeDOS;
