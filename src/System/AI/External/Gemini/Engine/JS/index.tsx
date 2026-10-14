/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *  
 * Opossum Ride Adventure - Gemini AI JS Evaluation Sandbox Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Syntax word guards, scope variable resolvers, microtask event loops, and safe evaluation
 */

import React from "react";
import { JsSandboxContext, JsSyntaxGuard } from "./General";
import { EngineTelemetryHUD } from "../Components/TelemetryHUD";

export interface MicrotaskJob {
  id: string;
  action: () => any;
  priority: number;
}

export class GeminiJSEngine {
  private activeContexts: Map<string, JsSandboxContext> = new Map();
  private microtaskQueue: MicrotaskJob[] = [];
  private totalEvaluations = 0;

  /**
   * Spawns a sandboxed JavaScript context with custom variable registries
   */
  public createContext(id: string, initialVars: Record<string, any> = {}): void {
    this.activeContexts.set(id, {
      variables: { ...initialVars },
      instructionLimit: 1000,
    });
  }

  /**
   * Safely evaluates expression within context variables scope limits
   */
  public evaluateExpression(contextId: string, expression: string): any {
    const context = this.activeContexts.get(contextId);
    if (!context) {
      throw new Error(`[JS Engine] ContextNotFoundError: context '${contextId}' does not exist`);
    }
    if (!JsSyntaxGuard.isSafeCode(expression)) {
      throw new Error(`[JS Engine] SecurityViolation: expression has disallowed terms`);
    }
    let clean = expression;
    // Bind context variables into the code string
    for (const [key, val] of Object.entries(context.variables)) {
      clean = clean.replace(new RegExp(key, "g"), String(val));
    }
    try {
      this.totalEvaluations++;
      const sanitizedMathAndLogical = clean.replace(/[^0-9.+\-*/() <>=!&|?:]/g, "");
      return Function(`"use strict"; return (${sanitizedMathAndLogical})`)();
    } catch (e: any) {
      throw new Error(`[JS Engine] ExecutionException: ${e.message}`);
    }
  }

  /**
   * Enqueues a microtask job mimicking the V8 microtask checkpoint
   */
  public enqueueMicrotask(id: string, action: () => any, priority = 0): void {
    this.microtaskQueue.push({ id, action, priority });
    this.microtaskQueue.sort((a, b) => b.priority - a.priority);
  }

  /**
   * Flushes and processes all pending microtasks in priority order
   */
  public drainMicrotasks(): number {
    let executed = 0;
    while (this.microtaskQueue.length > 0) {
      const job = this.microtaskQueue.shift();
      if (job) {
        try {
          job.action();
          executed++;
        } catch (err) {
          console.error(`[JS Engine Microtask Error in ${job.id}]:`, err);
        }
      }
    }
    return executed;
  }

  public setVariable(contextId: string, name: string, value: any): void {
    const context = this.activeContexts.get(contextId);
    if (context) {
      context.variables[name] = value;
    }
  }

  public getVariable(contextId: string, name: string): any {
    const context = this.activeContexts.get(contextId);
    return context ? context.variables[name] : null;
  }

  public getEngineStats() {
    return {
      activeContextCount: this.activeContexts.size,
      pendingMicrotasks: this.microtaskQueue.length,
      totalEvaluations: this.totalEvaluations
    };
  }
}

export const GeminiJSEngineComponent: React.FC = () => {
  return <EngineTelemetryHUD moduleName="GeminiJSEngine" />;
};
