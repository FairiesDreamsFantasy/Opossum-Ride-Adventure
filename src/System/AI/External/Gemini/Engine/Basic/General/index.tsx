/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Retro Basic Program Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Line numbers, instruction statements, and BASIC variables
 */

export interface BasicStatement {
  lineNumber: number;
  opcode: "LET" | "PRINT" | "GOTO" | "IF" | "END";
  variableName?: string;
  expression?: string;
}

export type BasicVariables = Record<string, number>;
