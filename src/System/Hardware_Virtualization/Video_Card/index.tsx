/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VirtualVideoCardMetrics {
  vramAllocatedMb: number;
  maxVramCapMb: number;
  memoryBusWidthBits: number;
  displayModeText: string;
}

export class VirtualVideoCardController {
  private maxVram = 1024; // MB
  private busWidth = 256; // Bits

  public updateDisplay(projection3D: boolean, viewMode: string): VirtualVideoCardMetrics {
    // Dynamic memory allocations based on projection complexity
    const baseMemory = projection3D ? 128.0 : 64.0;
    const modeMultiplier = viewMode === "POV" ? 1.4 : 1.0;
    const calculatedVram = baseMemory * modeMultiplier;

    return {
      vramAllocatedMb: Math.round(calculatedVram * 10) / 10,
      maxVramCapMb: this.maxVram,
      memoryBusWidthBits: this.busWidth,
      displayModeText: `${projection3D ? "3-D Projection" : "2-D Blueprint"} - Mode: ${viewMode}`
    };
  }

  public getVideoCardSpec(): string {
    return `Virtual Display Adapter; Dedicated VRAM capacity: ${this.maxVram}MB; Interface Bus: ${this.busWidth}-bit`;
  }
}
