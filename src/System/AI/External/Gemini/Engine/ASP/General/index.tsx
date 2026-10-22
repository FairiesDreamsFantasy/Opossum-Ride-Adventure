/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI ASP Active Server Pages Models
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Requests, responses buffers, session states, and COM ProgIDs
 */

export interface AspRequest {
  queryString: Record<string, string>;
  form: Record<string, string>;
  serverVariables: Record<string, string>;
}

export interface AspResponse {
  buffer: string[];
  cookies: Record<string, string>;
}

export interface AspSession {
  sessionId: string;
  variables: Record<string, any>;
  createdAt: number;
}

export class AspComRegistry {
  private static registeredObjects: Set<string> = new Set([
    "ADODB.Connection", "ADODB.Recordset", "Scripting.FileSystemObject"
  ]);

  public static isValidProgId(progId: string): boolean {
    return this.registeredObjects.has(progId);
  }
}
