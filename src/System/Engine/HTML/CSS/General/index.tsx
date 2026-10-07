/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - CSS Rule Mappings & Specificity Vectors
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Specificity vectors [a, b, c, d], declarations, and cascade maps
 */

export type SpecificityVector = [number, number, number, number];

export interface CssDeclaration {
  property: string;
  value: string;
}

export interface CssRule {
  selector: string;
  specificity: SpecificityVector;
  declarations: CssDeclaration[];
}

export class SpecificityCalculator {
  /**
   * Calculates specificity vector [a, b, c, d] where:
   * a = inline styles (handled separately, usually 0 or 1)
   * b = number of ID selectors
   * c = number of class, attribute, and pseudo-class selectors
   * d = number of element and pseudo-element selectors
   */
  public static calculate(selector: string): SpecificityVector {
    let b = 0;
    let c = 0;
    let d = 0;

    const trimmed = selector.trim();
    if (!trimmed) return [0, 0, 0, 0];

    // Count IDs: #id
    const ids = trimmed.match(/#[a-zA-Z0-9_-]+/g);
    if (ids) b = ids.length;

    // Count classes (.class) and attributes ([attr=val])
    const classes = trimmed.match(/\.[a-zA-Z0-9_-]+/g);
    if (classes) c += classes.length;

    const attributes = trimmed.match(/\[.*?\]/g);
    if (attributes) c += attributes.length;

    const pseudoClasses = trimmed.match(/:[a-zA-Z0-9_-]+/g);
    if (pseudoClasses) c += pseudoClasses.length;

    // Count elements (tags)
    const elements = trimmed.match(/^[a-zA-Z0-9_-]+| [a-zA-Z0-9_-]+/g);
    if (elements) {
      d += elements.length;
    }

    return [0, b, c, d];
  }

  /**
   * Compares two specificity vectors lexicographically.
   * Returns positive if v1 > v2, negative if v1 < v2, 0 if equal.
   */
  public static compare(v1: SpecificityVector, v2: SpecificityVector): number {
    for (let i = 0; i < 4; i++) {
      if (v1[i] !== v2[i]) {
        return v1[i] - v2[i];
      }
    }
    return 0;
  }
}
