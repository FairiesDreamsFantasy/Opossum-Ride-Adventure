/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CSV Input Keybinding Table & Controller Profile Parser
 */

export interface KeybindingRow {
  action: string;
  primaryKey: string;
  secondaryKey: string;
  gamepadButton: number;
}

export class CSVInputBindingParser {
  public static parseBindingTable(csvContent: string): KeybindingRow[] {
    const lines = csvContent.trim().split("\n");
    const results: KeybindingRow[] = [];
    for (const line of lines) {
      const p = line.split(",");
      if (p.length >= 4) {
        results.push({
          action: p[0].trim(),
          primaryKey: p[1].trim(),
          secondaryKey: p[2].trim(),
          gamepadButton: parseInt(p[3].trim(), 10) || 0,
        });
      }
    }
    return results;
  }
}

export default CSVInputBindingParser;
