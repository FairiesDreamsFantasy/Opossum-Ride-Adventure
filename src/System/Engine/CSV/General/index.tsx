/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - CSV Matrix Buffers & Row Parsers
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: RFC 4180 parsing states, zero-copy pointer vectors, and matrix sheets
 */

export interface CsvGridCell {
  value: string;
  isNumeric: boolean;
}

export type CsvRow = CsvGridCell[];
export type CsvMatrix = CsvRow[];

export enum CsvDfaState {
  START_FIELD,
  UNQUOTED_FIELD,
  QUOTED_FIELD,
  QUOTE_IN_QUOTED,
  END_OF_LINE
}
