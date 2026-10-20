/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * CSV Sound Calibration & Acoustic Decibel Table Parser
 */

export class CSVSoundTableParser {
  public static parseGainTable(csvContent: string): Array<{ key: string; gain: number }> {
    const lines = csvContent.trim().split("\n");
    const result: Array<{ key: string; gain: number }> = [];
    for (const line of lines) {
      const parts = line.split(",");
      if (parts.length >= 2) {
        result.push({ key: parts[0].trim(), gain: parseFloat(parts[1].trim()) || 1.0 });
      }
    }
    return result;
  }
}

export default CSVSoundTableParser;
