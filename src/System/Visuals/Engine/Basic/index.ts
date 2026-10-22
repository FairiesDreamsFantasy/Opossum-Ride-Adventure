/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BASIC Linear Instruction Step & Line-Number Sequencer Engine
 */

export interface BasicInstruction {
  lineNumber: number;
  command: string;
  args: any[];
}

export class BasicVisualSequencer {
  private instructions: BasicInstruction[] = [];

  public addLine(lineNumber: number, command: string, ...args: any[]): void {
    this.instructions.push({ lineNumber, command, args });
    this.instructions.sort((a, b) => a.lineNumber - b.lineNumber);
  }

  public run(callback: (cmd: string, args: any[]) => void): void {
    for (const inst of this.instructions) {
      callback(inst.command, inst.args);
    }
  }
}

export default BasicVisualSequencer;
