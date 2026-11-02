/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface GridNode {
  x: number;
  y: number;
  walkable: boolean;
  cost?: number;
}

export interface PathResult {
  path: { x: number; y: number }[];
  exploredNodesCount: number;
  totalCost: number;
}

/**
 * Fundamental Computer Science Algorithms Engine.
 * Provides deterministic pathfinding, combinatorial graph traversal, and sorting routines.
 */
export class AlgorithmsEngine {
  /**
   * A* (A-Star) Pathfinding on a 2D discrete grid.
   * Uses optimal admissible heuristic metrics (Euclidean or Manhattan).
   */
  public static aStarPath(
    grid: boolean[][], // true = walkable, false = obstacle
    start: { x: number; y: number },
    goal: { x: number; y: number },
    heuristic: "manhattan" | "euclidean" | "octile" = "octile"
  ): PathResult {
    const width = grid.length;
    if (width === 0) return { path: [], exploredNodesCount: 0, totalCost: 0 };
    const height = grid[0].length;

    const key = (x: number, y: number) => `${x},${y}`;

    const h = (x: number, y: number): number => {
      const dx = Math.abs(x - goal.x);
      const dy = Math.abs(y - goal.y);
      if (heuristic === "manhattan") return dx + dy;
      if (heuristic === "euclidean") return Math.sqrt(dx * dx + dy * dy);
      // Octile distance (diagonal movements cost sqrt(2))
      return Math.max(dx, dy) + (Math.SQRT2 - 1) * Math.min(dx, dy);
    };

    const openSet: { x: number; y: number; f: number; g: number }[] = [
      { x: start.x, y: start.y, g: 0, f: h(start.x, start.y) },
    ];
    const cameFrom: Map<string, { x: number; y: number }> = new Map();
    const gScore: Map<string, number> = new Map();
    gScore.set(key(start.x, start.y), 0);

    const closedSet: Set<string> = new Set();
    let exploredCount = 0;

    const directions = [
      { dx: 1, dy: 0, cost: 1 },
      { dx: -1, dy: 0, cost: 1 },
      { dx: 0, dy: 1, cost: 1 },
      { dx: 0, dy: -1, cost: 1 },
      { dx: 1, dy: 1, cost: Math.SQRT2 },
      { dx: -1, dy: 1, cost: Math.SQRT2 },
      { dx: 1, dy: -1, cost: Math.SQRT2 },
      { dx: -1, dy: -1, cost: Math.SQRT2 },
    ];

    while (openSet.length > 0) {
      // Find lowest f score
      let lowestIndex = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
      }

      const current = openSet.splice(lowestIndex, 1)[0];
      const currentKey = key(current.x, current.y);
      exploredCount++;

      if (current.x === goal.x && current.y === goal.y) {
        // Reconstruct path
        const path: { x: number; y: number }[] = [{ x: current.x, y: current.y }];
        let curr = { x: current.x, y: current.y };
        while (cameFrom.has(key(curr.x, curr.y))) {
          curr = cameFrom.get(key(curr.x, curr.y))!;
          path.unshift(curr);
        }
        return { path, exploredNodesCount: exploredCount, totalCost: current.g };
      }

      closedSet.add(currentKey);

      for (const dir of directions) {
        const nx = current.x + dir.dx;
        const ny = current.y + dir.dy;

        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        if (!grid[nx][ny]) continue; // Wall / obstacle

        const neighborKey = key(nx, ny);
        if (closedSet.has(neighborKey)) continue;

        const tentativeG = (gScore.get(currentKey) ?? Infinity) + dir.cost;

        if (tentativeG < (gScore.get(neighborKey) ?? Infinity)) {
          cameFrom.set(neighborKey, { x: current.x, y: current.y });
          gScore.set(neighborKey, tentativeG);
          const f = tentativeG + h(nx, ny);

          const existingOpen = openSet.find((node) => node.x === nx && node.y === ny);
          if (!existingOpen) {
            openSet.push({ x: nx, y: ny, g: tentativeG, f });
          } else {
            existingOpen.g = tentativeG;
            existingOpen.f = f;
          }
        }
      }
    }

    return { path: [], exploredNodesCount: exploredCount, totalCost: Infinity };
  }

  /**
   * Deterministic In-Place QuickSort with Median-of-Three pivot selection: O(N log N).
   */
  public static quickSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    const a = [...arr];

    function sortRange(low: number, high: number) {
      if (low < high) {
        const p = partition(low, high);
        sortRange(low, p - 1);
        sortRange(p + 1, high);
      }
    }

    function partition(low: number, high: number): number {
      const mid = Math.floor((low + high) / 2);
      if (compareFn(a[mid], a[low]) < 0) [a[low], a[mid]] = [a[mid], a[low]];
      if (compareFn(a[high], a[low]) < 0) [a[low], a[high]] = [a[high], a[low]];
      if (compareFn(a[high], a[mid]) < 0) [a[mid], a[high]] = [a[high], a[mid]];
      [a[mid], a[high]] = [a[high], a[mid]]; // Place pivot at end

      const pivot = a[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        if (compareFn(a[j], pivot) <= 0) {
          i++;
          [a[i], a[j]] = [a[j], a[i]];
        }
      }
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      return i + 1;
    }

    sortRange(0, a.length - 1);
    return a;
  }

  /**
   * Binary Search on a sorted array: O(log N).
   */
  public static binarySearch<T>(arr: T[], target: T, compareFn: (a: T, b: T) => number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const cmp = compareFn(arr[mid], target);
      if (cmp === 0) return mid;
      if (cmp < 0) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  }
}
