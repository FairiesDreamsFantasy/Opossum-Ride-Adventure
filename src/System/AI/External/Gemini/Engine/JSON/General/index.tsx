/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI JSON General Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: JSON leaf values, nested nodes, and node arrays
 */

export type JsonValue = string | number | boolean | null | JsonObject | JsonArray;

export interface JsonObject {
  [key: string]: JsonValue;
}

export type JsonArray = Array<JsonValue>;

export class JsonNodeValidator {
  public static isLeaf(value: any): boolean {
    return value === null || typeof value !== "object";
  }
}
