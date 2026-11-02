/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Spatial Hash Grid for O(1) broadphase 2D/3D collision checks and spatial partitioning.
 * Eliminates reliance on heavy third-party physics packages.
 */
export class SpatialHashGrid<T> {
  private cellSize: number;
  private cells: Map<string, T[]> = new Map();

  constructor(cellSize: number = 64) {
    this.cellSize = cellSize;
  }

  private hashKey(x: number, y: number): string {
    const cx = Math.floor(x / this.cellSize);
    const cy = Math.floor(y / this.cellSize);
    return `${cx}:${cy}`;
  }

  public insert(item: T, x: number, y: number): void {
    const key = this.hashKey(x, y);
    const list = this.cells.get(key) || [];
    list.push(item);
    this.cells.set(key, list);
  }

  public queryArea(minX: number, minY: number, maxX: number, maxY: number): T[] {
    const startCx = Math.floor(minX / this.cellSize);
    const endCx = Math.floor(maxX / this.cellSize);
    const startCy = Math.floor(minY / this.cellSize);
    const endCy = Math.floor(maxY / this.cellSize);

    const results: Set<T> = new Set();
    for (let cx = startCx; cx <= endCx; cx++) {
      for (let cy = startCy; cy <= endCy; cy++) {
        const key = `${cx}:${cy}`;
        const cellItems = this.cells.get(key);
        if (cellItems) {
          for (const item of cellItems) results.add(item);
        }
      }
    }
    return Array.from(results);
  }

  public clear(): void {
    this.cells.clear();
  }
}

/**
 * Binary Min-Heap Priority Queue: O(log N) insertion and extraction.
 */
export class PriorityQueue<T> {
  private heap: { item: T; priority: number }[] = [];

  public push(item: T, priority: number): void {
    this.heap.push({ item, priority });
    this.bubbleUp(this.heap.length - 1);
  }

  public pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0].item;
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return top;
  }

  public peek(): T | undefined {
    return this.heap[0]?.item;
  }

  public size(): number {
    return this.heap.length;
  }

  private bubbleUp(n: number): void {
    const element = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n - 1) / 2);
      const parent = this.heap[parentN];
      if (element.priority >= parent.priority) break;
      this.heap[n] = parent;
      this.heap[parentN] = element;
      n = parentN;
    }
  }

  private sinkDown(n: number): void {
    const length = this.heap.length;
    const element = this.heap[n];

    while (true) {
      const leftChildN = 2 * n + 1;
      const rightChildN = 2 * n + 2;
      let swap: number | null = null;

      if (leftChildN < length) {
        if (this.heap[leftChildN].priority < element.priority) {
          swap = leftChildN;
        }
      }

      if (rightChildN < length) {
        if (
          (swap === null && this.heap[rightChildN].priority < element.priority) ||
          (swap !== null && this.heap[rightChildN].priority < this.heap[leftChildN].priority)
        ) {
          swap = rightChildN;
        }
      }

      if (swap === null) break;
      this.heap[n] = this.heap[swap];
      this.heap[swap] = element;
      n = swap;
    }
  }
}

/**
 * Disjoint Set Union (DSU) with Path Compression and Union by Rank: O(alpha(N)).
 * Crucial for maze generation, connectivity verification, and minimum spanning trees.
 */
export class DisjointSetUnion {
  private parent: number[];
  private rank: number[];

  constructor(size: number) {
    this.parent = new Array(size);
    this.rank = new Array(size).fill(0);
    for (let i = 0; i < size; i++) this.parent[i] = i;
  }

  public find(i: number): number {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]); // Path compression
    return this.parent[i];
  }

  public union(i: number, j: number): boolean {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return false;

    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootJ] = rootI;
      this.rank[rootI]++;
    }
    return true;
  }
}

/**
 * Zero-Allocation Ring Buffer for fixed-size history telemetry and audio frames.
 */
export class RingBuffer<T> {
  private buffer: (T | undefined)[];
  private head: number = 0;
  private tail: number = 0;
  private count: number = 0;
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array(capacity);
  }

  public push(item: T): void {
    this.buffer[this.head] = item;
    this.head = (this.head + 1) % this.capacity;
    if (this.count < this.capacity) {
      this.count++;
    } else {
      this.tail = (this.tail + 1) % this.capacity;
    }
  }

  public toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const idx = (this.tail + i) % this.capacity;
      const val = this.buffer[idx];
      if (val !== undefined) result.push(val);
    }
    return result;
  }

  public size(): number {
    return this.count;
  }
}
