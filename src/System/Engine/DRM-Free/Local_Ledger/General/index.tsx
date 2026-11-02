/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Local_Ledger General: Data Sovereignty Models
 */

export interface LedgerEntry {
  key: string;
  value: any;
  hash: string;
  timestamp: number;
}

export class LocalLedgerMath {
  /**
   * Generates a simple DJB2 hash for entry integrity.
   */
  public static generateIntegrityHash(key: string, value: string): string {
    let hash = 5381;
    const str = key + value;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return hash.toString(16);
  }
}

export default LocalLedgerMath;
