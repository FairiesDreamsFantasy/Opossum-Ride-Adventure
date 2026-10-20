/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualGpuMetrics {
  gpuUsagePercent: number;
  gpuTemperatureCelsius: number;
  drawCallsCount: number;
  shaderCoreClockMhz: number;
}

export class VirtualGpuController {
  private baseClock = 850; // MHz
  private totalCycles = 0;

  public updateGraphics(fps: number, elementCount: number): VirtualGpuMetrics {
    this.totalCycles++;

    // Calculate simulated usage based on element count and current frame rates
    const calculatedUsage = Math.min(100, Math.max(1, Math.round((elementCount * 0.15) + (60 - fps) * 0.5 + Math.sin(this.totalCycles * 0.08) * 3)));
    
    // Shader clock scales slightly under load
    const activeClock = calculatedUsage > 50 ? this.baseClock + 200 : this.baseClock;

    // GPU thermal dissipation curves
    const temp = 40.0 + (calculatedUsage * 0.25) + Math.cos(this.totalCycles * 0.02) * 1.5;

    return {
      gpuUsagePercent: calculatedUsage,
      gpuTemperatureCelsius: Math.round(temp * 10) / 10,
      drawCallsCount: Math.round(elementCount * 1.2),
      shaderCoreClockMhz: activeClock
    };
  }

  public getGpuSpec(): string {
    return `Virtual GPU Architecture; Core Base Clock: ${this.baseClock}MHz; Vector Pipelines: Unified Shading`;
  }
}
