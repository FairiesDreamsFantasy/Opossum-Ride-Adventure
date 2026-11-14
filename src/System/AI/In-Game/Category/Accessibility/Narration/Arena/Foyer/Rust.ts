/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class FoyerNarrationRust {
  private buffer: string[] = [];
  public pushSentence(sentence: string): void {
    if (this.buffer.length < 32) this.buffer.push(sentence);
  }
  public popSentence(): string | undefined {
    return this.buffer.shift();
  }
}
