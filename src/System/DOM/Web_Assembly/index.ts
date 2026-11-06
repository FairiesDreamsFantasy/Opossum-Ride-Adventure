/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Non-Blocking DOM Event Debouncer
 * WebAssembly 2.0 DOM Optimization Pipeline
 */

export const DOMEventDebouncerWASM = {
  /**
   * Evaluates if event timestamp exceeds debounce interval:
   */
  shouldProcessEvent: (lastTimestampMs: number, currentTimestampMs: number, debounceMs: number = 100): boolean => {
    return (currentTimestampMs - lastTimestampMs) >= debounceMs;
  }
};

export default DOMEventDebouncerWASM;
