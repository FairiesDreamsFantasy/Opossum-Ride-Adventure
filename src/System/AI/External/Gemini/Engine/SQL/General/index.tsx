/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Relational SQL Tuple Storage
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Relational table schemas, data integrity keys, and transaction history journals
 */

export interface GeminiSqlSchemaField {
  name: string;
  type: "TEXT" | "REAL" | "INTEGER" | "BOOLEAN";
}

export type GeminiSqlValue = string | number | boolean | null;
export type GeminiSqlTuple = Record<string, GeminiSqlValue>;

export interface GeminiRelationalTable {
  name: string;
  schema: GeminiSqlSchemaField[];
  rows: GeminiSqlTuple[];
  primaryKey: string;
}

export interface GeminiTransactionJournalEntry {
  tableName: string;
  operation: "INSERT" | "UPDATE" | "DELETE";
  oldRow: GeminiSqlTuple | null;
  newRow: GeminiSqlTuple | null;
}

export class GeminiSqlDbState {
  private tables: Map<string, GeminiRelationalTable> = new Map();
  private journal: GeminiTransactionJournalEntry[] = [];
  private inTransaction = false;

  constructor() {
    this.createTable("OpossumMetrics", [
      { name: "id", type: "INTEGER" },
      { name: "name", type: "TEXT" },
      { name: "height", type: "REAL" },
      { name: "width", type: "REAL" },
      { name: "length", type: "REAL" },
    ], "id");
  }

  public createTable(name: string, schema: GeminiSqlSchemaField[], pk: string): void {
    this.tables.set(name, {
      name,
      schema,
      rows: [],
      primaryKey: pk,
    });
  }

  public getTable(name: string): GeminiRelationalTable {
    const table = this.tables.get(name);
    if (!table) {
      throw new Error(`[Gemini SQL] Table '${name}' not found`);
    }
    return table;
  }

  public beginTransaction(): void {
    if (this.inTransaction) {
      throw new Error("[Gemini SQL Transaction] Nested transactions not supported");
    }
    this.inTransaction = true;
    this.journal = [];
  }

  public commit(): void {
    if (!this.inTransaction) {
      throw new Error("[Gemini SQL Transaction] Commit without transaction");
    }
    this.inTransaction = false;
    this.journal = [];
  }

  public rollback(): void {
    if (!this.inTransaction) {
      throw new Error("[Gemini SQL Transaction] Rollback without transaction");
    }

    for (let i = this.journal.length - 1; i >= 0; i--) {
      const entry = this.journal[i];
      const table = this.getTable(entry.tableName);
      const pkField = table.primaryKey;

      if (entry.operation === "INSERT") {
        const pkVal = entry.newRow![pkField];
        table.rows = table.rows.filter(r => r[pkField] !== pkVal);
      } else if (entry.operation === "UPDATE") {
        const pkVal = entry.newRow![pkField];
        const idx = table.rows.findIndex(r => r[pkField] === pkVal);
        if (idx !== -1) {
          table.rows[idx] = { ...entry.oldRow! };
        }
      } else if (entry.operation === "DELETE") {
        table.rows.push({ ...entry.oldRow! });
      }
    }

    this.inTransaction = false;
    this.journal = [];
  }

  public logChange(entry: GeminiTransactionJournalEntry): void {
    if (this.inTransaction) {
      this.journal.push(entry);
    }
  }
}
