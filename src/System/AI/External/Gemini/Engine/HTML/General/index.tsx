/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI HTML Node Models
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Node definitions, tag names, attribute sets, and child structures
 */

export interface GeminiHtmlNode {
  tag: string;
  attributes: Record<string, string>;
  children: GeminiHtmlNode[];
  text: string;
}

export class GeminiHtmlTagCheck {
  private static readonly VOID_TAGS = new Set([
    "img", "input", "br", "hr", "meta", "link"
  ]);

  public static isVoid(tag: string): boolean {
    return this.VOID_TAGS.has(tag.toLowerCase());
  }
}
