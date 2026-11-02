/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Linux Kernel POSIX Interface & Audio/Input Sinks
 */

export interface LinuxSyscallResult {
  errno: number;
  returnValue: number | string;
}

export class LinuxKernelEngine {
  public readonly kernelVersion = "6.12.0-opossum-rt";
  public readonly architecture = "x86_64";

  public uname(): { sysname: string; nodename: string; release: string; version: string; machine: string } {
    return {
      sysname: "Linux",
      nodename: "opossum-node-01",
      release: this.kernelVersion,
      version: "#1 SMP PREEMPT_DYNAMIC",
      machine: this.architecture
    };
  }

  public getAudioServer(): "ALSA" | "PulseAudio" | "PipeWire" {
    return "PipeWire";
  }

  public getDisplayServer(): "Wayland" | "X11" {
    return "Wayland";
  }
}

export default LinuxKernelEngine;
