/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI CSV Grid Structs
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: CSV row vectors, grid cells, and DFA parsing state indices
 */

export interface GeminiCsvCell {
  value: string;
  isNumeric: boolean;
}

export type GeminiCsvRow = GeminiCsvCell[];
export type GeminiCsvMatrix = GeminiCsvRow[];

export enum GeminiCsvDfaState {
  START,
  UNQUOTED,
  QUOTED,
  QUOTE_CHECK,
}
