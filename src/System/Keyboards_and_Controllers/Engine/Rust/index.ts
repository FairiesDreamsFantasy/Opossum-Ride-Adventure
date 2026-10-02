/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Rust Input Race-Free Event Queue Buffer
 */

export interface InputEventItem {
  timestamp: number;
  type: "keydown" | "keyup" | "axis";
  code: string;
  value: number;
}

export class RustInputEventQueue {
  private queue: InputEventItem[] = [];

  public enqueue(event: InputEventItem): void {
    this.queue.push(event);
  }

  public dequeue(): InputEventItem | undefined {
    return this.queue.shift();
  }

  public size(): number {
    return this.queue.length;
  }
}

export default RustInputEventQueue;
