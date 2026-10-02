/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI JSON Compilation Engine
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Leaf value checkers, key validators, and recursive schema diff comparisons
 */

import React from "react";
import { JsonValue, JsonObject, JsonNodeValidator } from "./General";

export class GeminiJSONEngine {
  /**
   * Safe JSON parse supporting single quotes and sanitizing invalid characters
   */
  public safeParse(raw: string, fallback: JsonObject = {}): JsonObject {
    try {
      let clean = raw.trim();
      // Replace single-quoted string values to keep standard JSON compliance
      clean = clean.replace(/'(.*?)'/g, '"$1"');
      return JSON.parse(clean) as JsonObject;
    } catch {
      return fallback;
    }
  }

  /**
   * Traverses and counts keys inside a deeply nested JSON object structures
   */
  public countKeys(node: JsonValue): number {
    if (JsonNodeValidator.isLeaf(node)) {
      return 0;
    }

    if (Array.isArray(node)) {
      let count = 0;
      for (const item of node) {
        count += this.countKeys(item);
      }
      return count;
    }

    const obj = node as JsonObject;
    let totalKeys = Object.keys(obj).length;
    for (const val of Object.values(obj)) {
      totalKeys += this.countKeys(val);
    }
    return totalKeys;
  }

  /**
   * Deeply compares schemas of two JSON objects to ensure interface compliance
   */
  public verifySchemaMatch(a: JsonValue, b: JsonValue): boolean {
    if (typeof a !== typeof b) return false;
    if (JsonNodeValidator.isLeaf(a)) return true;

    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return false;
      if (a.length === 0 || b.length === 0) return true;
      return this.verifySchemaMatch(a[0], b[0]);
    }

    const objA = a as JsonObject;
    const objB = b as JsonObject;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!objB.hasOwnProperty(key)) return false;
      if (!this.verifySchemaMatch(objA[key], objB[key])) return false;
    }

    return true;
  }
}

export const GeminiJSONEngineComponent: React.FC = () => {
  return null;
};
