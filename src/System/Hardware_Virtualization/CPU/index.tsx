/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualCpuMetrics {
  virtualCpuUsage: number; // Simulated percentage
  coreTemperatureCelsius: number;
  activeVirtualCores: number;
  engineHz: number;
  cycleCount: number;
}

export class VirtualCpuController {
  private activeCores = 4;
  private cycleCount = 0;

  public updateCycles(currentFps: number, isHighLoad: boolean): VirtualCpuMetrics {
    this.cycleCount++;
    
    // Smooth CPU usage calculation to prevent spikes
    const cpuTarget = isHighLoad ? 45.0 + Math.sin(this.cycleCount * 0.1) * 10 : 8.0 + currentFps * 0.1;
    const cpuUsage = Math.min(100, Math.max(1, Math.round(cpuTarget)));
    
    // Dynamic core temperatures
    const tempTarget = 36.5 + (isHighLoad ? 12.0 : 4.0) + Math.cos(this.cycleCount * 0.01) * 2.0;
    const coreTemp = Math.round(tempTarget * 10) / 10;

    return {
      virtualCpuUsage: cpuUsage,
      coreTemperatureCelsius: coreTemp,
      activeVirtualCores: this.activeCores,
      engineHz: Math.round(currentFps),
      cycleCount: this.cycleCount
    };
  }

  public getHardwareSpecText(): string {
    return `Virtual Hypervisor CPU Subsystem v1.0.0; Cores: ${this.activeCores}; Active Virtualization Allocated`;
  }
}
