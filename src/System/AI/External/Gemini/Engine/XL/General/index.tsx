/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI XL Formula Matrix Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Cells, values, dependency formulas, and DAG node mappings
 */

export interface ExcelCell {
  coordinate: string; // e.g. "A1"
  rawFormula: string; // e.g. "=B1 * 2"
  computedValue: number;
  isDirty: boolean;
  dependencies: string[]; // cell coordinates this cell depends on
}

export class ExcelCellCoordConverter {
  public static parse(coord: string): { col: number; row: number } {
    const colStr = coord.replace(/[0-9]/g, "").toUpperCase();
    const rowStr = coord.replace(/[^0-9]/g, "");

    const col = colStr.charCodeAt(0) - 65; // A=0, B=1, ...
    const row = parseInt(rowStr, 10) - 1; // 1-based to 0-based

    return { col, row };
  }
}
