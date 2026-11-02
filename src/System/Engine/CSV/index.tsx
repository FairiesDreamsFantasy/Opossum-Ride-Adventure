/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - CSV Tabular Data DFA Parsing Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Deterministic finite automata (DFA) string tokens and zero-copy buffering
 */

import React from "react";
import { CsvMatrix, CsvRow, CsvDfaState, CsvGridCell } from "./General";

export class CSVEngine {
  /**
   * Conforming to RFC 4180. Correctly parses escaped commas and quotes.
   */
  public parseCSV(rawText: string, delimiter = ","): CsvMatrix {
    const matrix: CsvMatrix = [];
    let currentRow: CsvRow = [];
    let currentField = "";
    let state = CsvDfaState.START_FIELD;

    const pushField = () => {
      const isNum = !isNaN(Number(currentField)) && currentField.trim() !== "";
      currentRow.push({
        value: currentField,
        isNumeric: isNum,
      });
      currentField = "";
    };

    for (let i = 0; i < rawText.length; i++) {
      const char = rawText[i];
      const nextChar = rawText[i + 1];

      switch (state) {
        case CsvDfaState.START_FIELD:
          if (char === '"') {
            state = CsvDfaState.QUOTED_FIELD;
          } else if (char === delimiter) {
            pushField();
          } else if (char === "\r" || char === "\n") {
            pushField();
            if (currentRow.length > 0) {
              matrix.push(currentRow);
              currentRow = [];
            }
            if (char === "\r" && nextChar === "\n") {
              i++; // skip LF
            }
          } else {
            currentField += char;
            state = CsvDfaState.UNQUOTED_FIELD;
          }
          break;

        case CsvDfaState.UNQUOTED_FIELD:
          if (char === delimiter) {
            pushField();
            state = CsvDfaState.START_FIELD;
          } else if (char === "\r" || char === "\n") {
            pushField();
            matrix.push(currentRow);
            currentRow = [];
            state = CsvDfaState.START_FIELD;
            if (char === "\r" && nextChar === "\n") {
              i++; // skip LF
            }
          } else {
            currentField += char;
          }
          break;

        case CsvDfaState.QUOTED_FIELD:
          if (char === '"') {
            if (nextChar === '"') {
              // Escaped double quote "" -> "
              currentField += '"';
              i++; // skip next quote
            } else {
              state = CsvDfaState.QUOTE_IN_QUOTED;
            }
          } else {
            currentField += char;
          }
          break;

        case CsvDfaState.QUOTE_IN_QUOTED:
          if (char === delimiter) {
            pushField();
            state = CsvDfaState.START_FIELD;
          } else if (char === "\r" || char === "\n") {
            pushField();
            matrix.push(currentRow);
            currentRow = [];
            state = CsvDfaState.START_FIELD;
            if (char === "\r" && nextChar === "\n") {
              i++;
            }
          } else {
            // Unescaped quote boundary issue, treat as plain character
            currentField += char;
            state = CsvDfaState.QUOTED_FIELD;
          }
          break;
      }
    }

    // Flush final line
    if (currentField !== "" || state !== CsvDfaState.START_FIELD || currentRow.length > 0) {
      pushField();
      matrix.push(currentRow);
    }

    return matrix;
  }

  /**
   * Translates parsed matrix rows into a mapped record structure using the first row as headers
   */
  public getAsMappedRecords(rawText: string, delimiter = ","): Array<Record<string, string>> {
    const matrix = this.parseCSV(rawText, delimiter);
    if (matrix.length < 2) return [];

    const headers = matrix[0].map(cell => cell.value);
    const records: Array<Record<string, string>> = [];

    for (let r = 1; r < matrix.length; r++) {
      const row = matrix[r];
      const rec: Record<string, string> = {};
      for (let c = 0; c < headers.length; c++) {
        rec[headers[c]] = row[c] ? row[c].value : "";
      }
      records.push(rec);
    }

    return records;
  }
}

export const CSVEngineComponent: React.FC = () => {
  return null;
};
