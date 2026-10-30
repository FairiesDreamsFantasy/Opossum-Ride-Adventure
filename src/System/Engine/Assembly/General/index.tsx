/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - CPU Register State and Instruction Set Emulation
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: x86-64 Architecture Simulation / SIMD Vectors
 */

export interface RegisterState {
  // General Purpose Registers (64-bit integer simulation)
  rax: number;
  rbx: number;
  rcx: number;
  rdx: number;
  rsi: number;
  rdi: number;
  rsp: number; // Stack pointer
  rbp: number; // Base pointer
  rip: number; // Instruction pointer

  // SSE/AVX SIMD Registers (Double-precision float simulation)
  xmm0: number;
  xmm1: number;
  xmm2: number;
  xmm3: number;
  xmm4: number;
  xmm5: number;
  xmm6: number;
  xmm7: number;
}

export type AssemblyOpcode =
  | "MOV"  | "MOVSD"
  | "ADD"  | "ADDSD"
  | "SUB"  | "SUBSD"
  | "MUL"  | "MULSD"
  | "DIV"  | "DIVSD"
  | "SQRTSD"
  | "SHL"  | "SHR"
  | "AND"  | "OR"    | "XOR"
  | "PUSH" | "POP"
  | "CMP"  | "JMP"   | "JE"    | "JNE"   | "JG" | "JL";

export interface AssemblyInstruction {
  opcode: AssemblyOpcode;
  dest: keyof RegisterState | string; // Register name or memory address
  src: keyof RegisterState | number | string; // Register name, constant, or memory address
}

export class AssemblyCpuHardware {
  public registers: RegisterState;
  public stack: number[] = [];
  private static MAX_STACK_SIZE = 1024;

  constructor() {
    this.registers = {
      rax: 0, rbx: 0, rcx: 0, rdx: 0, rsi: 0, rdi: 0,
      rsp: 0x7ffffff, rbp: 0x7ffffff, rip: 0,
      xmm0: 0.0, xmm1: 0.0, xmm2: 0.0, xmm3: 0.0,
      xmm4: 0.0, xmm5: 0.0, xmm6: 0.0, xmm7: 0.0,
    };
  }

  public push(value: number): void {
    if (this.stack.length >= AssemblyCpuHardware.MAX_STACK_SIZE) {
      throw new Error("[Assembly Stack] Stack Overflow Exception");
    }
    this.stack.push(value);
    this.registers.rsp -= 8; // Moving stack pointer down (x86-64 behavior)
  }

  public pop(): number {
    if (this.stack.length === 0) {
      throw new Error("[Assembly Stack] Stack Underflow Exception");
    }
    this.registers.rsp += 8;
    return this.stack.pop()!;
  }

  public clear(): void {
    this.stack = [];
    this.registers = {
      rax: 0, rbx: 0, rcx: 0, rdx: 0, rsi: 0, rdi: 0,
      rsp: 0x7ffffff, rbp: 0x7ffffff, rip: 0,
      xmm0: 0.0, xmm1: 0.0, xmm2: 0.0, xmm3: 0.0,
      xmm4: 0.0, xmm5: 0.0, xmm6: 0.0, xmm7: 0.0,
    };
  }
}

/**
 * Fast Inverse Square Root algorithm (Quake III Arena style) emulated mathematically.
 * 1 / sqrt(x)
 */
export function fastInverseSquareRoot(x: number): number {
  const buf = new ArrayBuffer(4);
  const f32 = new Float32Array(buf);
  const u32 = new Uint32Array(buf);

  f32[0] = x;
  let i = u32[0];
  i = 0x5f3759df - (i >> 1); // Magical constant
  u32[0] = i;

  const y = f32[0];
  return y * (1.5 - (x * 0.5 * y * y)); // 1 iteration of Newton's method
}
