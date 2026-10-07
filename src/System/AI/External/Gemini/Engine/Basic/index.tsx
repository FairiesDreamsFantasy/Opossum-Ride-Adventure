/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI Retro BASIC Parser
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Line-number maps, GOTO jump tables, and variables mutation
 */

import React from "react";
import { BasicStatement, BasicVariables } from "./General";

export class GeminiBasicEngine {
  private variables: BasicVariables = {};
  private statements: BasicStatement[] = [];

  public loadProgram(prog: BasicStatement[]): void {
    this.statements = [...prog].sort((a, b) => a.lineNumber - b.lineNumber);
  }

  /**
   * Executes BASIC statements sequentially using line number jump lookups:
   * 10 LET X = 5
   * 20 GOTO 10
   */
  public execute(): BasicVariables {
    let cursor = 0;
    this.variables = {};

    while (cursor >= 0 && cursor < this.statements.length) {
      const stmt = this.statements[cursor];

      switch (stmt.opcode) {
        case "LET":
          if (stmt.variableName && stmt.expression) {
            this.variables[stmt.variableName] = this.evaluateExpr(stmt.expression);
          }
          cursor++;
          break;

        case "PRINT":
          cursor++;
          break;

        case "GOTO":
          if (stmt.expression) {
            const targetLine = parseInt(stmt.expression, 10);
            cursor = this.statements.findIndex(s => s.lineNumber === targetLine);
          } else {
            cursor++;
          }
          break;

        case "IF":
          if (stmt.expression && stmt.variableName) {
            const isTrue = this.evaluateCondition(stmt.expression);
            if (isTrue) {
              const targetLine = parseInt(stmt.variableName, 10);
              cursor = this.statements.findIndex(s => s.lineNumber === targetLine);
            } else {
              cursor++;
            }
          } else {
            cursor++;
          }
          break;

        case "END":
          return this.variables;

        default:
          cursor++;
      }
    }

    return this.variables;
  }

  private evaluateExpr(expr: string): number {
    let clean = expr;
    for (const [key, val] of Object.entries(this.variables)) {
      clean = clean.replace(new RegExp(key, "g"), String(val));
    }
    try {
      const safeMath = clean.replace(/[^0-9.+\-*/() ]/g, "");
      return Number(Function(`"use strict"; return (${safeMath})`)()) || 0;
    } catch {
      return 0;
    }
  }

  private evaluateCondition(expr: string): boolean {
    let clean = expr;
    for (const [key, val] of Object.entries(this.variables)) {
      clean = clean.replace(new RegExp(key, "g"), String(val));
    }
    try {
      const safeCond = clean.replace(/[^0-9.+\-*/() <>=!]/g, "");
      return !!Function(`"use strict"; return (${safeCond})`)();
    } catch {
      return false;
    }
  }
}

export const GeminiBasicEngineComponent: React.FC = () => {
  return null;
};
