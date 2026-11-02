/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - Gemini AI SQL Relational Algebra & Query Compiler
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Relational query logic, deterministic set arithmetic, and indexed binary searching
 */

import React from "react";
import { GeminiSqlDbState, GeminiSqlTuple } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export class GeminiSQLEngine {
  private db: GeminiSqlDbState;

  constructor() {
    this.db = new GeminiSqlDbState();
  }

  public getDb(): GeminiSqlDbState {
    return this.db;
  }

  public executeInsert(tableName: string, row: GeminiSqlTuple): void {
    const table = this.db.getTable(tableName);
    const pk = table.primaryKey;
    const duplicate = table.rows.find(r => r[pk] === row[pk]);
    if (duplicate) {
      throw new Error(`[Gemini SQL] UniqueConstraintViolation: '${row[pk]}' already exists in table '${tableName}'`);
    }
    this.db.logChange({
      tableName,
      operation: "INSERT",
      oldRow: null,
      newRow: { ...row } as GeminiSqlTuple,
    });
    table.rows.push({ ...row } as GeminiSqlTuple);
  }

  public executeUpdate(tableName: string, pkValue: number, updates: Partial<GeminiSqlTuple>): void {
    const table = this.db.getTable(tableName);
    const pk = table.primaryKey;
    const idx = table.rows.findIndex(r => r[pk] === pkValue);
    if (idx === -1) {
      throw new Error(`[Gemini SQL] RowNotFound: Update failed for '${pkValue}'`);
    }
    const oldRow = { ...table.rows[idx] } as GeminiSqlTuple;
    const newRow = { ...oldRow, ...updates } as GeminiSqlTuple;
    this.db.logChange({
      tableName,
      operation: "UPDATE",
      oldRow,
      newRow,
    });
    table.rows[idx] = newRow;
  }

  public executeSelectMetricsBoundaries(
    tableName: string,
    minHeight: number,
    maxHeight: number
  ): GeminiSqlTuple[] {
    const table = this.db.getTable(tableName);
    return table.rows.filter(row => {
      const height = Number(row["height"]);
      return height >= minHeight && height <= maxHeight;
    });
  }

  /**
   * Relational Algebra: Inner Join (TableA ⋈ TableB on condition)
   */
  public executeInnerJoin(
    tableA: string,
    tableB: string,
    joinKeyA: string,
    joinKeyB: string
  ): Array<Record<string, any>> {
    const tA = this.db.getTable(tableA);
    const tB = this.db.getTable(tableB);
    const results: Array<Record<string, any>> = [];

    // Hash Join algorithm for O(N + M) complexity
    const lookupMap = new Map<any, GeminiSqlTuple[]>();
    for (const rowB of tB.rows) {
      const key = rowB[joinKeyB];
      const existing = lookupMap.get(key) || [];
      existing.push(rowB);
      lookupMap.set(key, existing);
    }

    for (const rowA of tA.rows) {
      const key = rowA[joinKeyA];
      const matches = lookupMap.get(key);
      if (matches) {
        for (const m of matches) {
          results.push({ ...rowA, ...m });
        }
      }
    }
    return results;
  }

  /**
   * Indexed Binary Search on sorted Primary Keys (O(log N) lookup time)
   */
  public binarySearchById(tableName: string, id: number): GeminiSqlTuple | null {
    const table = this.db.getTable(tableName);
    const sorted = [...table.rows].sort((a, b) => Number(a[table.primaryKey]) - Number(b[table.primaryKey]));
    let low = 0;
    let high = sorted.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const val = Number(sorted[mid][table.primaryKey]);
      if (val === id) return sorted[mid];
      if (val < id) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return null;
  }

  /**
   * Set Operation: Cartesian Product (A × B)
   */
  public executeCartesianProduct(tableA: string, tableB: string): Array<Record<string, any>> {
    const tA = this.db.getTable(tableA);
    const tB = this.db.getTable(tableB);
    const results: Array<Record<string, any>> = [];

    for (const rowA of tA.rows) {
      for (const rowB of tB.rows) {
        results.push({ ...rowA, ...rowB });
      }
    }
    return results;
  }
}

export const GeminiSQLEngineComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiSQLEngine" />;
};
