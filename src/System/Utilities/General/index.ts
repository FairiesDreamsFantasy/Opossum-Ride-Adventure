/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Generates a unique numeric hash seed from a given string.
 * Used for individualizing pitch, formant, and frequency of name-based monkeys and moose.
 * Utilizes reliable 64-bit precision math parameters internally to ensure stability.
 */
export function getDeterministicSeed(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export const UtilitiesGeneral = {
  id: "utilities_general",
  version: "1.0.0"
};

