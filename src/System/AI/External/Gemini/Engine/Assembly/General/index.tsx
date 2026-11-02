/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Low-Level Assembly Structs
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Registers (EAX, EBX, ECX, EDX), instruction sets, and operations opcodes
 */

export interface AssemblyInstruction {
  opcode: "MOV" | "ADD" | "SUB" | "MUL" | "DIV" | "CMP" | "JMP" | "JE" | "JNE";
  dest: string;
  src?: string | number;
}

export type AssemblyRegisters = Record<string, number>;
