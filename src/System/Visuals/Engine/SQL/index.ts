/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * In-Memory Relational Scene Graph SQL Query Simulator
 */

export interface SceneGraphRecord {
  id: string;
  type: string;
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

export class RelationalSceneGraphQueryEngine {
  private records: SceneGraphRecord[] = [];

  public insert(rec: SceneGraphRecord): void {
    this.records.push(rec);
  }

  public selectWhereType(type: string): SceneGraphRecord[] {
    return this.records.filter((r) => r.type === type && r.visible);
  }

  public selectWithinRadius(cx: number, cy: number, radius: number): SceneGraphRecord[] {
    const rSq = radius * radius;
    return this.records.filter((r) => {
      const dx = r.x - cx;
      const dy = r.y - cy;
      return dx * dx + dy * dy <= rSq;
    });
  }
}

export default RelationalSceneGraphQueryEngine;
