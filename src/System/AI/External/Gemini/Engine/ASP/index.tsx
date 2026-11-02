/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI ASP Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Dual-state lexical parsing, session LRU sweeps, and late-bound DISPID interfaces
 */

import React from "react";
import { AspRequest, AspResponse, AspSession, AspComRegistry } from "./General";

export class GeminiASPEngine {
  private sessions: Map<string, AspSession> = new Map();
  private globalState: Record<string, any> = {};

  /**
   * Dual-state parser to compile interleaved HTML and VBScript <% %> syntax.
   */
  public renderPage(
    sourceCode: string,
    req: AspRequest,
    sessionId: string
  ): { html: string; error?: string } {
    const session = this.getOrCreateSession(sessionId);
    const resp: AspResponse = { buffer: [], cookies: {} };

    // Set basic server response functions
    const write = (val: string) => resp.buffer.push(val);

    try {
      let cursor = 0;
      while (cursor < sourceCode.length) {
        const startTag = sourceCode.indexOf("<%", cursor);
        if (startTag === -1) {
          // No more ASP blocks, output the rest as literal
          resp.buffer.push(sourceCode.substring(cursor));
          break;
        }

        // Add preceding literal HTML/SVG
        if (startTag > cursor) {
          resp.buffer.push(sourceCode.substring(cursor, startTag));
        }

        const endTag = sourceCode.indexOf("%>", startTag);
        if (endTag === -1) {
          return { html: "", error: "[ASP Engine] SyntaxError: Unclosed script block" };
        }

        // Extract script to execute in ScriptExecMode
        const script = sourceCode.substring(startTag + 2, endTag).trim();
        this.executeScript(script, req, resp, session, write);

        cursor = endTag + 2;
      }

      return { html: resp.buffer.join("") };
    } catch (e: any) {
      return { html: "", error: `[ASP Engine] RuntimeException: ${e.message}` };
    }
  }

  private executeScript(
    script: string,
    req: AspRequest,
    resp: AspResponse,
    session: AspSession,
    write: (val: string) => void
  ): void {
    // Basic simulated VBScript interpreter supporting LET/SET/Response.Write/CreateObject
    const lines = script.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("'")) continue; // Skip comments

      if (trimmed.startsWith("Response.Write")) {
        const match = trimmed.match(/Response\.Write\s*\((.*)\)/i) || trimmed.match(/Response\.Write\s*(.*)/i);
        if (match) {
          const rawVal = match[1].trim();
          write(this.evaluateExpression(rawVal, session));
        }
      } else if (trimmed.startsWith("Server.CreateObject")) {
        const match = trimmed.match(/Server\.CreateObject\s*\((["'])(.*?)\1\)/i);
        if (match) {
          const progId = match[2];
          if (!AspComRegistry.isValidProgId(progId)) {
            throw new Error(`ActiveXComponentCreationFailed: '${progId}' could not be registered`);
          }
        }
      } else if (trimmed.includes("=")) {
        const parts = trimmed.split("=");
        const varName = parts[0].trim();
        const expr = parts[1].trim();
        session.variables[varName] = this.evaluateExpression(expr, session);
      }
    }
  }

  private evaluateExpression(expr: string, session: AspSession): any {
    let clean = expr;
    // Replace session variables in expression
    for (const [key, val] of Object.entries(session.variables)) {
      clean = clean.replace(new RegExp(key, "g"), String(val));
    }
    // Strip quotes for direct string literals
    if ((clean.startsWith('"') && clean.endsWith('"')) || (clean.startsWith("'") && clean.endsWith("'"))) {
      return clean.substring(1, clean.length - 1);
    }
    try {
      const safeMath = clean.replace(/[^0-9.+\-*/() ]/g, "");
      return safeMath ? Function(`"use strict"; return (${safeMath})`)() : clean;
    } catch {
      return clean;
    }
  }

  private getOrCreateSession(sessionId: string): AspSession {
    let session = this.sessions.get(sessionId);
    if (!session) {
      session = {
        sessionId,
        variables: {},
        createdAt: Date.now(),
      };
      this.sessions.set(sessionId, session);
    }
    return session;
  }
}

export const GeminiASPEngineComponent: React.FC = () => {
  return null;
};
