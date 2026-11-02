/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Scientific input state buffer for signal debouncing using a circular ring buffer.
 */
export class InputStateBuffer {
  private buffer: number[];
  private head: number;
  private size: number;

  constructor(size: number = 10) {
    this.buffer = new Array(size).fill(0);
    this.head = 0;
    this.size = size;
  }

  // Push timestamp of input event
  push(timestamp: number) {
    this.buffer[this.head] = timestamp;
    this.head = (this.head + 1) % this.size;
  }

  // Calculate scientific jitter: difference between latest and oldest in buffer
  calculateJitter(): number {
    const sorted = [...this.buffer].sort((a, b) => a - b);
    return sorted[this.size - 1] - sorted[0];
  }

  // Is input valid based on time threshold (debouncing)
  isValid(thresholdMs: number): boolean {
    return this.calculateJitter() > thresholdMs;
  }
}

export const InputKeyboardGeneral = {
  systemName: "Gemini Keyboard Input General Subsystem",
  status: "Active",
  inputBuffer: new InputStateBuffer(20),
  
  mapLayout(layoutName: string = "QWERTY") {
    return {
      layout: layoutName,
      keyCount: 104,
      supportsControlSpeechCancel: true
    };
  },

  handleInputEvent(timestamp: number): boolean {
    this.inputBuffer.push(timestamp);
    // Debounce noise if jitter is below 50ms
    return this.inputBuffer.isValid(50);
  }
};

export default InputKeyboardGeneral;
