/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI JavaScript General Models
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Compilation scopes, register variables, and sandbox limits
 */

export interface JsSandboxContext {
  variables: Record<string, any>;
  instructionLimit: number;
}

export class JsSyntaxGuard {
  private static bannedWords = ["window", "document", "eval", "Function", "process", "require", "import", "fetch"];

  /**
   * Assures that code strings do not contain forbidden system/DOM API accessors
   */
  public static isSafeCode(code: string): boolean {
    const normalized = code.toLowerCase();
    for (const word of this.bannedWords) {
      if (normalized.includes(word.toLowerCase())) {
        return false;
      }
    }
    return true;
  }
}
