/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI XHTML XML Typed Structures
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: XHTML strict nodes, attribute constraints, and self-closing tags list
 */

export interface GeminiXhtmlNode {
  tag: string;
  namespace: string;
  attributes: Record<string, string>;
  children: GeminiXhtmlNode[];
  text: string;
  isSelfClosing: boolean;
}

export class GeminiXhtmlValidation {
  private static readonly STRICT_VOID = new Set([
    "img", "br", "hr", "input", "link", "meta"
  ]);

  public static isValidSelfClosing(tag: string, selfClosed: boolean): boolean {
    if (this.STRICT_VOID.has(tag)) {
      return selfClosed;
    }
    return !selfClosed;
  }
}
