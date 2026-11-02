/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Anti-Porn Lexical Matrix and Homoglyph Normalizer
 * Enforces the 1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000% Ultra-Broad Standard.
 */

export interface PornographicPattern {
  id: string;
  category: "EXPLICIT_SEXUAL_ACT" | "EROTIC_EXPLICIT" | "NUDITY_FETISH" | "COMMERCIAL_EXPLOITATION";
  pattern: RegExp;
  severity: "CRITICAL" | "HIGH";
  description: string;
}

export const EXPLICIT_PORN_PATTERNS: PornographicPattern[] = [
  // 1. Core Explicit Terms & Slang
  {
    id: "PORN_CORE_01",
    category: "EXPLICIT_SEXUAL_ACT",
    pattern: /\b(?:porn(?:o|ography|ographic)?|nsfw|xxx|hardcore|softcore|hentai|ecchi|rule\s*34)\b/i,
    severity: "CRITICAL",
    description: "Pornography and adult entertainment classifications."
  },
  {
    id: "PORN_CORE_02",
    category: "EXPLICIT_SEXUAL_ACT",
    pattern: /\b(?:intercourse|fellatio|cunnilingus|blowjob|handjob|anal\s*sex|oral\s*sex|penetrat(?:ion|ing|ed)?\s*(?:sexually|anally|vaginally)|ejaculat(?:ion|e|ed|ing))\b/i,
    severity: "CRITICAL",
    description: "Explicit descriptions of sexual acts and intercourse."
  },
  // 2. Adult Anatomy & Sexualized Genitalia
  {
    id: "PORN_ANATOMY_01",
    category: "NUDITY_FETISH",
    pattern: /\b(?:penis|vagina|vulva|phallus|testicles|clitoris|scrotum|erection|erect\s*cock|dildo|vibrator|fleshlight)\b/i,
    severity: "CRITICAL",
    description: "Sexually explicit genital references or adult novelty objects."
  },
  // 3. Erotica & Sexualized Themes
  {
    id: "PORN_EROTICA_01",
    category: "EROTIC_EXPLICIT",
    pattern: /\b(?:erotic(?:a)?|stripper|strip\s*club|camgirl|onlyfans|escort\s*service|brothel|sex\s*worker|orgasm|masturbat(?:ion|e|ing|ed))\b/i,
    severity: "HIGH",
    description: "Adult commercial sex trades and explicit erotica."
  },
  // 4. Fetish & Explicit Paraphilias
  {
    id: "PORN_FETISH_01",
    category: "NUDITY_FETISH",
    pattern: /\b(?:bdsm|bondage|sadomasochis(?:m|t)|fetish(?:ist)?|erotic\s*choking|voyeur(?:ism)?|exhibitionis(?:m|t))\b/i,
    severity: "CRITICAL",
    description: "Sexually explicit paraphilic and adult fetish themes."
  },
  // 5. Multilingual Explicit Indicators
  {
    id: "PORN_MULTILINGUAL_01",
    category: "EXPLICIT_SEXUAL_ACT",
    pattern: /\b(?:porno|pornografía|erotismo|desnudo\s*explícito|desnudez\s*sexual|porno|sexe\s*explicite|pornographie|nudité\s*sexuelle|geschlechtsverkehr|pornográfico|порнография|порно|эротика|色情|色情片|ポルノ|エロ|성인물|야동)\b/i,
    severity: "CRITICAL",
    description: "Multilingual explicit sexual terms across Romance, Germanic, Slavic, and CJK languages."
  }
];

/**
 * Homoglyph and Leetspeak Character Normalization Map
 */
const HOMOGLYPH_REPLACEMENTS: Record<string, string> = {
  "0": "o",
  "1": "i",
  "!": "i",
  "|": "l",
  "3": "e",
  "4": "a",
  "@": "a",
  "5": "s",
  "$": "s",
  "7": "t",
  "+": "t",
  "8": "b",
  "9": "g",
  "\\/": "v",
  "vv": "w",
  // Cyrillic lookalikes
  "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "у": "y", "х": "x",
  // Greek lookalikes
  "α": "a", "ε": "e", "ο": "o", "ρ": "p", "τ": "t"
};

/**
 * Comprehensive Unicode and Text Sanitizer
 */
export function normalizeAntiPornText(input: string): string {
  if (!input) return "";

  // 1. Unicode NFKD decomposition
  let text = input.normalize("NFKD");

  // 2. Remove non-printable control characters & zero-width spaces
  text = text.replace(/[\u200B-\u200D\uFEFF\u0000-\u001F\u007F-\u009F]/g, "");

  // 3. Lowercase
  text = text.toLowerCase();

  // 4. Normalize homoglyphs
  for (const [gly, rep] of Object.entries(HOMOGLYPH_REPLACEMENTS)) {
    text = text.split(gly).join(rep);
  }

  // 5. Collapse excessive spaces
  text = text.replace(/\s+/g, " ").trim();

  return text;
}
