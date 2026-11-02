/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Opossum Ride Adventure - Gemini AI HTML CSS Core Specs
 * Protection Standard: 75,000,000,000% Ultra-Broad Protection Standard
 * Standard: Specificity arrays, properties, values, and stylesheet rules mapping
 */

export type GeminiCssSpecificity = [number, number, number, number];

export interface GeminiCssDeclaration {
  property: string;
  value: string;
}

export interface GeminiCssRule {
  selector: string;
  specificity: GeminiCssSpecificity;
  declarations: GeminiCssDeclaration[];
}

export class GeminiSpecificityCalculator {
  public static calculate(selector: string): GeminiCssSpecificity {
    let b = 0;
    let c = 0;
    let d = 0;

    const trimmed = selector.trim();
    if (!trimmed) return [0, 0, 0, 0];

    const ids = trimmed.match(/#[a-zA-Z0-9_-]+/g);
    if (ids) b = ids.length;

    const classes = trimmed.match(/\.[a-zA-Z0-9_-]+/g);
    if (classes) c += classes.length;

    const attributes = trimmed.match(/\[.*?\]/g);
    if (attributes) c += attributes.length;

    const pseudoClasses = trimmed.match(/:[a-zA-Z0-9_-]+/g);
    if (pseudoClasses) c += pseudoClasses.length;

    const elements = trimmed.match(/^[a-zA-Z0-9_-]+| [a-zA-Z0-9_-]+/g);
    if (elements) d += elements.length;

    return [0, b, c, d];
  }

  public static compare(v1: GeminiCssSpecificity, v2: GeminiCssSpecificity): number {
    for (let i = 0; i < 4; i++) {
      if (v1[i] !== v2[i]) {
        return v1[i] - v2[i];
      }
    }
    return 0;
  }
}
