/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - Gemini AI Low-Level VM Assembly Simulator
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Opcode execution, registers mutation, call-stack mechanics, and bitwise operations
 */

import React from "react";
import { AssemblyInstruction, AssemblyRegisters } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export class GeminiAssemblyVM {
  private registers: AssemblyRegisters = {
    EAX: 0,
    EBX: 0,
    ECX: 0,
    EDX: 0,
    ESP: 0xFFFF,
  };
  private callStack: number[] = [];
  private memoryTape: number[] = new Array(1024).fill(0);
  private flags = {
    zero: false,
    sign: false,
    carry: false,
  };
  private instructionsExecuted = 0;

  public executeProgram(instructions: AssemblyInstruction[]): AssemblyRegisters {
    let pc = 0; // Program Counter
    while (pc >= 0 && pc < instructions.length) {
      const instr = instructions[pc];
      const srcVal = typeof instr.src === "number" ? instr.src : this.registers[instr.src || ""] || 0;
      this.instructionsExecuted++;

      switch (instr.opcode) {
        case "MOV":
          this.registers[instr.dest] = srcVal;
          pc++;
          break;
        case "ADD":
          this.registers[instr.dest] += srcVal;
          this.updateFlags(this.registers[instr.dest]);
          pc++;
          break;
        case "SUB":
          this.registers[instr.dest] -= srcVal;
          this.updateFlags(this.registers[instr.dest]);
          pc++;
          break;
        case "MUL":
          this.registers[instr.dest] *= srcVal;
          this.updateFlags(this.registers[instr.dest]);
          pc++;
          break;
        case "DIV":
          if (srcVal === 0) {
            throw new Error("[Assembly VM] DivideByZeroError: division by EAX/EBX constant 0 is invalid");
          }
          this.registers[instr.dest] = Math.floor(this.registers[instr.dest] / srcVal);
          this.updateFlags(this.registers[instr.dest]);
          pc++;
          break;
        case "CMP":
          const diff = this.registers[instr.dest] - srcVal;
          this.flags.zero = diff === 0;
          this.flags.sign = diff < 0;
          pc++;
          break;
        case "JMP":
          pc = typeof instr.src === "number" ? instr.src : pc + 1;
          break;
        case "JE":
          if (this.flags.zero) {
            pc = typeof instr.src === "number" ? instr.src : pc + 1;
          } else {
            pc++;
          }
          break;
        case "JNE":
          if (!this.flags.zero) {
            pc = typeof instr.src === "number" ? instr.src : pc + 1;
          } else {
            pc++;
          }
          break;
        default:
          pc++;
      }
    }
    return this.registers;
  }

  /**
   * Pushes a 32-bit register value onto the simulated call-stack
   */
  public push(val: number): void {
    this.callStack.push(val);
    this.registers.ESP -= 4;
  }

  /**
   * Pops a 32-bit value from the stack
   */
  public pop(): number {
    if (this.callStack.length === 0) {
      throw new Error("[Assembly VM] StackUnderflow: Call stack is empty.");
    }
    this.registers.ESP += 4;
    return this.callStack.pop() || 0;
  }

  /**
   * Bitwise logical operations: AND, OR, XOR, Shift-Left, Shift-Right
   */
  public bitwiseOp(dest: keyof AssemblyRegisters, op: "AND" | "OR" | "XOR" | "SHL" | "SHR", operand: number): number {
    let val = this.registers[dest];
    switch (op) {
      case "AND": val = val & operand; break;
      case "OR":  val = val | operand; break;
      case "XOR": val = val ^ operand; break;
      case "SHL": val = val << operand; break;
      case "SHR": val = val >> operand; break;
    }
    this.registers[dest] = val;
    this.updateFlags(val);
    return val;
  }

  private updateFlags(value: number) {
    this.flags.zero = value === 0;
    this.flags.sign = value < 0;
  }

  public getVMTelemetry() {
    return {
      registers: { ...this.registers },
      flags: { ...this.flags },
      stackDepth: this.callStack.length,
      instructionsExecuted: this.instructionsExecuted
    };
  }

  public getRegisters(): AssemblyRegisters {
    return this.registers;
  }
}

export const GeminiAssemblyVMComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiAssemblyVM" />;
};
