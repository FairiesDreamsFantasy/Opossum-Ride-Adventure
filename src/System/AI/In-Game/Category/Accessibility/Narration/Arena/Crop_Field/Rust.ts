/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CropFieldNarrationRust {
  private buffer: string[] = [];
  public push(s: string): void {
    if (this.buffer.length < 32) this.buffer.push(s);
  }
  public pop(): string | undefined {
    return this.buffer.shift();
  }
}
