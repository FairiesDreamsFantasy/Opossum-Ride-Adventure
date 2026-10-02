/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { VirtualCpuController, VirtualCpuMetrics } from "./CPU";
import { VirtualRamController, VirtualRamMetrics } from "./RAM";
import { VirtualGpuController, VirtualGpuMetrics } from "./GPU";
import { VirtualVideoCardController, VirtualVideoCardMetrics } from "./Video_Card";
import { VirtualSoundCardController, VirtualSoundCardMetrics } from "./Sound_Card";

export * from "./CPU";
export * from "./RAM";
export * from "./GPU";
export * from "./Video_Card";
export * from "./Sound_Card";

export interface VirtualSysMetrics {
  // Legacy CPU/RAM compatibility fields
  virtualCpuUsage: number;
  ramAllocatedMb: number;
  garbageCollectionCycles: number;
  coreTemperatureCelsius: number;
  activeVirtualCores: number;
  engineHz: number;

  // Rich subsystem expansion metrics
  cpu: VirtualCpuMetrics;
  ram: VirtualRamMetrics;
  gpu: VirtualGpuMetrics;
  video: VirtualVideoCardMetrics;
  sound: VirtualSoundCardMetrics;
}

export class VirtualHardwareController {
  private cpuController = new VirtualCpuController();
  private ramController = new VirtualRamController();
  private gpuController = new VirtualGpuController();
  private videoController = new VirtualVideoCardController();
  private soundController = new VirtualSoundCardController();

  // Cached state structure to prevent allocation spikes during high-rate game updates
  private cachedMetrics: VirtualSysMetrics = {
    virtualCpuUsage: 0,
    ramAllocatedMb: 0,
    garbageCollectionCycles: 0,
    coreTemperatureCelsius: 0,
    activeVirtualCores: 4,
    engineHz: 60,
    cpu: { virtualCpuUsage: 0, coreTemperatureCelsius: 0, activeVirtualCores: 4, engineHz: 60, cycleCount: 0 },
    ram: { ramAllocatedMb: 0, maxRamCap: 32.0, garbageCollectionCycles: 0, memoryBufferHealth: 100 },
    gpu: { gpuUsagePercent: 0, gpuTemperatureCelsius: 0, drawCallsCount: 0, shaderCoreClockMhz: 850 },
    video: { vramAllocatedMb: 0, maxVramCapMb: 1024, memoryBusWidthBits: 256, displayModeText: "" },
    sound: { activeSynthVoices: 0, maxVoiceCapacity: 32, bufferLatencyMs: 5.8, dspUtilizationPercent: 0 }
  };

  /**
   * Safe, zero-allocation cycle update that delegates to sub-controllers
   */
  public updateCycles(
    currentFps: number,
    isHighLoad: boolean,
    elementCount = 120,
    projection3D = true,
    viewMode = "Rider",
    activeVoices = 8,
    reverbWetMix = 0.48
  ): VirtualSysMetrics {
    const cpuMetrics = this.cpuController.updateCycles(currentFps, isHighLoad);
    const ramMetrics = this.ramController.updateMemory(isHighLoad);
    const gpuMetrics = this.gpuController.updateGraphics(currentFps, elementCount);
    const videoMetrics = this.videoController.updateDisplay(projection3D, viewMode);
    const soundMetrics = this.soundController.updateAudioMetrics(activeVoices, reverbWetMix);

    // Reuse existing reference rather than allocating new objects to avoid GC spikes entirely
    const m = this.cachedMetrics;
    m.virtualCpuUsage = cpuMetrics.virtualCpuUsage;
    m.ramAllocatedMb = ramMetrics.ramAllocatedMb;
    m.garbageCollectionCycles = ramMetrics.garbageCollectionCycles;
    m.coreTemperatureCelsius = cpuMetrics.coreTemperatureCelsius;
    m.activeVirtualCores = cpuMetrics.activeVirtualCores;
    m.engineHz = cpuMetrics.engineHz;

    m.cpu = cpuMetrics;
    m.ram = ramMetrics;
    m.gpu = gpuMetrics;
    m.video = videoMetrics;
    m.sound = soundMetrics;

    return m;
  }

  public getHardwareSpecText(): string {
    return `Virtual Hypervisor Subsystem v2.0.0; Threads: ${this.cachedMetrics.activeVirtualCores}; Safe Virtualization Pipeline Active`;
  }
}
