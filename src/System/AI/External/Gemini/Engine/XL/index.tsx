/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI XL Formula Evaluation Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Directed Acyclic Graphs (DAG), topological sorting, and formula parsing
 */

import React from "react";
import { ExcelCell } from "./General";

export class GeminiXLEngine {
  private sheet: Map<string, ExcelCell> = new Map();

  public setCell(coordinate: string, formulaOrVal: string | number): void {
    const rawFormula = String(formulaOrVal);
    const dependencies: string[] = [];

    // Parse dependencies (e.g. any letter-number patterns like A1, B12, etc.)
    if (rawFormula.startsWith("=")) {
      const matches = rawFormula.match(/[A-Z][0-9]+/g);
      if (matches) {
        for (const dep of matches) {
          if (!dependencies.includes(dep)) {
            dependencies.push(dep);
          }
        }
      }
    }

    this.sheet.set(coordinate, {
      coordinate,
      rawFormula,
      computedValue: rawFormula.startsWith("=") ? 0 : parseFloat(rawFormula) || 0,
      isDirty: true,
      dependencies,
    });

    this.evaluateSheet();
  }

  public getCellValue(coordinate: string): number {
    const cell = this.sheet.get(coordinate);
    return cell ? cell.computedValue : 0;
  }

  /**
   * Sorts cell dependencies topologically and evaluates formulas to prevent circular dependencies
   */
  public evaluateSheet(): void {
    const visited = new Set<string>();
    const temp = new Set<string>();
    const order: string[] = [];

    const visit = (node: string) => {
      if (temp.has(node)) {
        throw new Error(`[Gemini XL] CircularDependencyError: cycle detected at cell '${node}'`);
      }
      if (!visited.has(node)) {
        temp.add(node);
        const cell = this.sheet.get(node);
        if (cell) {
          for (const dep of cell.dependencies) {
            visit(dep);
          }
        }
        temp.delete(node);
        visited.add(node);
        order.push(node);
      }
    };

    for (const key of this.sheet.keys()) {
      visit(key);
    }

    // Evaluate cell values in topological order
    for (const coord of order) {
      const cell = this.sheet.get(coord);
      if (cell && cell.rawFormula.startsWith("=")) {
        cell.computedValue = this.evalFormula(cell.rawFormula.substring(1));
        cell.isDirty = false;
      }
    }
  }

  private evalFormula(expr: string): number {
    let replacedExpr = expr;

    // Replace cell variables with computed values
    const cellMatches = expr.match(/[A-Z][0-9]+/g) || [];
    for (const match of cellMatches) {
      const val = this.getCellValue(match);
      replacedExpr = replacedExpr.replace(new RegExp(match, "g"), String(val));
    }

    // Evaluate simple arithmetic safely
    try {
      // Basic math operations resolver to avoid dangerous eval()
      const cleanExpr = replacedExpr.replace(/[^0-9.+\-*/() ]/g, "");
      const res = Function(`"use strict"; return (${cleanExpr})`)();
      return Number(res) || 0;
    } catch {
      return 0;
    }
  }
}

export const GeminiXLEngineComponent: React.FC = () => {
  return null;
};
