/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * FreeDOS x86 Real-Mode CPU & Interrupt Vector Dispatcher
 */

export interface X86Registers {
  ax: number;
  bx: number;
  cx: number;
  dx: number;
  si: number;
  di: number;
  sp: number;
  bp: number;
  ip: number;
  flags: number;
}

export class FreeDOSCPUEngine {
  private registers: X86Registers = {
    ax: 0,
    bx: 0,
    cx: 0,
    dx: 0,
    si: 0,
    di: 0,
    sp: 0xfffe,
    bp: 0,
    ip: 0x0100,
    flags: 0x0202 // IF (Interrupt Flag) enabled
  };

  private interruptHandlers: Map<number, (regs: X86Registers) => void> = new Map();

  constructor() {
    this.registerDefaultInterrupts();
  }

  private registerDefaultInterrupts(): void {
    // INT 21h - DOS Function Dispatcher
    this.interruptHandlers.set(0x21, (regs) => {
      const ah = (regs.ax >> 8) & 0xff;
      switch (ah) {
        case 0x09: // Display string at DS:DX ($ terminated)
          break;
        case 0x4c: // Exit program with return code
          regs.flags |= 1; // Terminate
          break;
        case 0x30: // Get DOS Version (FreeDOS returns major=5, minor=0)
          regs.ax = 0x0005; // AL=05h (major), AH=00h (minor)
          regs.bx = 0xff00; // FreeDOS revision token
          break;
        default:
          break;
      }
    });

    // INT 10h - Video BIOS Services
    this.interruptHandlers.set(0x10, (regs) => {
      const ah = (regs.ax >> 8) & 0xff;
      const al = regs.ax & 0xff;
      if (ah === 0x00) {
        // Set video mode (e.g., 0x13 = 320x200 256 colors)
        regs.bx = al;
      }
    });

    // INT 33h - Mouse Services
    this.interruptHandlers.set(0x33, (regs) => {
      const ax = regs.ax;
      if (ax === 0x0000) {
        regs.ax = 0xffff; // Mouse driver installed
        regs.bx = 2;      // 2 buttons
      }
    });
  }

  public triggerInterrupt(intVector: number): X86Registers {
    const handler = this.interruptHandlers.get(intVector);
    if (handler) {
      handler(this.registers);
    }
    return { ...this.registers };
  }

  public getRegisters(): Readonly<X86Registers> {
    return { ...this.registers };
  }

  public setRegisters(updated: Partial<X86Registers>): void {
    this.registers = { ...this.registers, ...updated };
  }
}

export default FreeDOSCPUEngine;
