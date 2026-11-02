/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - CSS Cascade Rule Resolver
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Scientific Framework: Specificity vectors [a,b,c,d], selector matching, and rule resolution
 */

import React from "react";
import { CssRule, SpecificityCalculator, CssDeclaration } from "./General";

export interface HTMLStyleableElement {
  tag: string;
  id?: string;
  className?: string;
  attributes: Record<string, string>;
}

export class HtmlCssEngine {
  private stylesheetRules: CssRule[] = [];

  /**
   * Parses basic CSS rules and populates the stylesheet cascade database.
   * Example: ".opossum-card { width: 50px; padding: 10px; }"
   */
  public parseAndAddStylesheet(cssText: string): void {
    const rulesRegex = /([^{]+)\s*\{\s*([^}]+)\s*\}/g;
    let match;

    while ((match = rulesRegex.exec(cssText)) !== null) {
      const selector = match[1].trim();
      const declarationsStr = match[2].trim();
      const specificity = SpecificityCalculator.calculate(selector);

      const declarations: CssDeclaration[] = [];
      const decPairs = declarationsStr.split(";").filter(p => p.trim() !== "");

      for (const pair of decPairs) {
        const eqIdx = pair.indexOf(":");
        if (eqIdx !== -1) {
          declarations.push({
            property: pair.substring(0, eqIdx).trim(),
            value: pair.substring(eqIdx + 1).trim(),
          });
        }
      }

      this.stylesheetRules.push({
        selector,
        specificity,
        declarations,
      });
    }
  }

  /**
   * Resolves CSS styles for a specific element by matching all applicable rules
   * and sorting them lexicographically by selector specificity vectors.
   */
  public resolveStyles(element: HTMLStyleableElement): Record<string, string> {
    const matchedRules: CssRule[] = [];

    for (const rule of this.stylesheetRules) {
      if (this.matchesSelector(element, rule.selector)) {
        matchedRules.push(rule);
      }
    }

    // Sort matching rules by specificity vector
    matchedRules.sort((r1, r2) => SpecificityCalculator.compare(r1.specificity, r2.specificity));

    // Collapse cascading styles (rules with higher specificity overwrite lower ones)
    const finalStyles: Record<string, string> = {};
    for (const rule of matchedRules) {
      for (const dec of rule.declarations) {
        finalStyles[dec.property] = dec.value;
      }
    }

    return finalStyles;
  }

  private matchesSelector(element: HTMLStyleableElement, selector: string): boolean {
    const trimmed = selector.trim();

    // Check ID match: #my-id
    if (trimmed.startsWith("#")) {
      return element.id === trimmed.slice(1);
    }

    // Check Class match: .my-class
    if (trimmed.startsWith(".")) {
      return element.className === trimmed.slice(1);
    }

    // Check tag/element match
    if (trimmed === element.tag || trimmed === "*") {
      return true;
    }

    return false;
  }
}

export const HtmlCssEngineComponent: React.FC = () => {
  return null;
};
