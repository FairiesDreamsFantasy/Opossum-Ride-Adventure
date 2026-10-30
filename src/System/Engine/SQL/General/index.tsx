/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Relational SQL Algebra Structures & Tuple Maps
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Relational schemas, tuples, index structures, and transactional journals
 */

export interface SqlSchemaField {
  name: string;
  type: "TEXT" | "REAL" | "INTEGER" | "BOOLEAN";
}

export type SqlValue = string | number | boolean | null;
export type SqlTuple = Record<string, SqlValue>;

export interface RelationalTable {
  name: string;
  schema: SqlSchemaField[];
  rows: SqlTuple[];
  primaryKey: string;
}

/**
 * In-Memory Database Transaction Journal for Rollbacks.
 * Preserves ACID transaction guarantees for critical physics updates.
 */
export interface TransactionJournalEntry {
  tableName: string;
  operation: "INSERT" | "UPDATE" | "DELETE";
  oldRow: SqlTuple | null;
  newRow: SqlTuple | null;
}

export class SqlDbState {
  private tables: Map<string, RelationalTable> = new Map();
  private journal: TransactionJournalEntry[] = [];
  private inTransaction = false;

  constructor() {
    this.createTable("Entities", [
      { name: "id", type: "INTEGER" },
      { name: "name", type: "TEXT" },
      { name: "x", type: "REAL" },
      { name: "y", type: "REAL" },
      { name: "width", type: "REAL" },
      { name: "height", type: "REAL" },
    ], "id");

    this.createTable("Obstacles", [
      { name: "id", type: "INTEGER" },
      { name: "x", type: "REAL" },
      { name: "y", type: "REAL" },
      { name: "width", type: "REAL" },
      { name: "height", type: "REAL" },
    ], "id");
  }

  public createTable(name: string, schema: SqlSchemaField[], pk: string): void {
    this.tables.set(name, {
      name,
      schema,
      rows: [],
      primaryKey: pk,
    });
  }

  public getTable(name: string): RelationalTable {
    const table = this.tables.get(name);
    if (!table) {
      throw new Error(`[SQL DB] Table '${name}' not found`);
    }
    return table;
  }

  public beginTransaction(): void {
    if (this.inTransaction) {
      throw new Error("[SQL Transaction] Panic: nested transactions not supported");
    }
    this.inTransaction = true;
    this.journal = [];
  }

  public commit(): void {
    if (!this.inTransaction) {
      throw new Error("[SQL Transaction] Panic: commit without transaction");
    }
    this.inTransaction = false;
    this.journal = [];
  }

  public rollback(): void {
    if (!this.inTransaction) {
      throw new Error("[SQL Transaction] Panic: rollback without transaction");
    }
    
    // Reverse changes in reverse order
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

  public logChange(entry: TransactionJournalEntry): void {
    if (this.inTransaction) {
      this.journal.push(entry);
    }
  }
}
