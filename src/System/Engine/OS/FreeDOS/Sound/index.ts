/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FreeDOS Sound Blaster 16 & AdLib OPL3 FM Synthesis Engine
 */

export interface SoundBlasterConfig {
  basePort: number; // 0x220
  irq: number;      // 5 or 7
  dma8: number;     // 1
  dma16: number;    // 5
  oplPort: number;  // 0x388
}

export class FreeDOSSoundEngine {
  private config: SoundBlasterConfig = {
    basePort: 0x220,
    irq: 5,
    dma8: 1,
    dma16: 5,
    oplPort: 0x388
  };

  private oplRegisters: Uint8Array = new Uint8Array(512);

  public writeOPL(registerIndex: number, value: number): void {
    if (registerIndex >= 0 && registerIndex < 512) {
      this.oplRegisters[registerIndex] = value & 0xff;
    }
  }

  public readOPL(registerIndex: number): number {
    return this.oplRegisters[registerIndex] || 0;
  }

  public getConfig(): Readonly<SoundBlasterConfig> {
    return { ...this.config };
  }
}

export default FreeDOSSoundEngine;
