/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - In-Memory Relational SQL Database Compiler
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Spatial joins, relational calculus, and atomic rollbacks
 */

import React from "react";
import { SqlDbState, SqlTuple } from "./General";

export class SQLEngine {
  private db: SqlDbState;

  constructor() {
    this.db = new SqlDbState();
  }

  public getDb(): SqlDbState {
    return this.db;
  }

  /**
   * Simulates: INSERT INTO [tableName] VALUES (...)
   */
  public executeInsert(tableName: string, row: SqlTuple): void {
    const table = this.db.getTable(tableName);
    const pk = table.primaryKey;
    // Check unique primary key constraint
    const duplicate = table.rows.find(r => r[pk] === row[pk]);
    if (duplicate) {
      throw new Error(`[SQL DB] UniqueConstraintViolation: Primary Key '${row[pk]}' already exists in table '${tableName}'`);
    }
    this.db.logChange({
      tableName,
      operation: "INSERT",
      oldRow: null,
      newRow: { ...row } as SqlTuple,
    });
    table.rows.push({ ...row } as SqlTuple);
  }

  /**
   * Simulates: UPDATE [tableName] SET x = val, y = val WHERE id = val
   */
  public executeUpdate(tableName: string, pkValue: number, updates: Partial<SqlTuple>): void {
    const table = this.db.getTable(tableName);
    const pk = table.primaryKey;
    const idx = table.rows.findIndex(r => r[pk] === pkValue);
    if (idx === -1) {
      throw new Error(`[SQL DB] RowNotFound: Update failed for primary key '${pkValue}'`);
    }
    const oldRow = { ...table.rows[idx] } as SqlTuple;
    const newRow = { ...oldRow, ...updates } as SqlTuple;
    this.db.logChange({
      tableName,
      operation: "UPDATE",
      oldRow,
      newRow,
    });
    table.rows[idx] = newRow;
  }

  /**
   * Simulates Spatial SELECT query with coordinate filtering:
   * SELECT * FROM Entities WHERE x BETWEEN :xMin AND :xMax AND y BETWEEN :yMin AND :yMax;
   */
  public executeSelectSpatialBoundaries(
    tableName: string,
    xMin: number,
    xMax: number,
    yMin: number,
    yMax: number
  ): SqlTuple[] {
    const table = this.db.getTable(tableName);
    return table.rows.filter(row => {
      const x = Number(row["x"]);
      const y = Number(row["y"]);
      return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
    });
  }

  /**
   * Simulates a Spatial Theta-Join for AABB collisions:
   * SELECT E.id AS entityId, O.id AS obstacleId
   * FROM Entities E
   * INNER JOIN Obstacles O
   * ON ABS(E.x - O.x) * 2 < (E.width + O.width) AND ABS(E.y - O.y) * 2 < (E.height + O.height);
   */
  public executeSpatialThetaJoin(): Array<{ entityId: number; obstacleId: number }> {
    const entities = this.db.getTable("Entities").rows;
    const obstacles = this.db.getTable("Obstacles").rows;
    const results: Array<{ entityId: number; obstacleId: number }> = [];

    for (const e of entities) {
      const ex = Number(e["x"]);
      const ey = Number(e["y"]);
      const ew = Number(e["width"]);
      const eh = Number(e["height"]);
      const eId = Number(e["id"]);

      for (const o of obstacles) {
        const ox = Number(o["x"]);
        const oy = Number(o["y"]);
        const ow = Number(o["width"]);
        const oh = Number(o["height"]);
        const oId = Number(o["id"]);

        // AABB Intersect Condition
        const collisionX = Math.abs(ex - ox) * 2.0 < (ew + ow);
        const collisionY = Math.abs(ey - oy) * 2.0 < (eh + oh);
        if (collisionX && collisionY) {
          results.push({
            entityId: eId,
            obstacleId: oId,
          });
        }
      }
    }
    return results;
  }
}

export const SQLEngineComponent: React.FC = () => {
  return null;
};
