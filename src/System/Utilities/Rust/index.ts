/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Fast FNV-1a Hash & Deterministic Shuffle
 * Native Rust Utilities Bridge
 */

export const UtilitiesFnvHashRust = {
  /**
   * Computes 32-bit FNV-1a non-cryptographic hash for string keys:
   */
  fnv1a32: (input: string): number => {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0; // Return unsigned 32-bit integer
  }
};

export default UtilitiesFnvHashRust;
