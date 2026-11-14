/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export class CellarNarrationRust {
  private queue: string[] = [];
  public enqueue(msg: string): void {
    if (this.queue.length < 32) this.queue.push(msg);
  }
  public dequeue(): string | undefined {
    return this.queue.shift();
  }
}
