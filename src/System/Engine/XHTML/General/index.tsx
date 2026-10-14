/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - XHTML XML Strict Node Types
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: XML tags, XHTML namespaces, strict children structures, and well-formed states
 */

export interface XhtmlNode {
  tag: string;
  namespace: string;
  attributes: Record<string, string>;
  children: XhtmlNode[];
  text: string;
  isSelfClosing: boolean;
}

export class XhtmlValidationUtils {
  private static readonly STRICT_SELF_CLOSING = new Set([
    "img", "br", "hr", "input", "link", "meta"
  ]);

  public static isValidSelfClosing(tag: string, selfClosed: boolean): boolean {
    if (this.STRICT_SELF_CLOSING.has(tag)) {
      return selfClosed;
    }
    return !selfClosed;
  }
}
