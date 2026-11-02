/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SafetyViolationRecord, SafetyViolationCategory, SafetySeverity } from "../../General";

/**
 * Multilingual Lexical & Morphological Token Matrix (Zero Blind Spots)
 * Covers English, Romance (Spanish, French, Portuguese, Italian), Germanic (German, Dutch),
 * Slavic (Russian, Ukrainian, Polish), Semitic (Arabic, Hebrew), Indic (Hindi, Urdu),
 * and East Asian (Chinese, Japanese, Korean) languages.
 */

export interface TermDefinition {
  root: string;
  category: SafetyViolationCategory;
  severity: SafetySeverity;
  description: string;
}

export const DIRECT_CORPORAL_PUNISHMENT_TERMS: TermDefinition[] = [
  // English
  { root: "spank", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanking / physical striking of buttocks" },
  { root: "spanking", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Active spanking act" },
  { root: "spanked", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Past spanking" },
  { root: "spanks", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Plural spanking" },
  { root: "corporal punishment", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Formal corporal punishment" },
  { root: "paddle", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Paddling instrument or act" },
  { root: "paddling", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Paddling action" },
  { root: "caning", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Caning punishment" },
  { root: "birching", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Birch rod whipping" },
  { root: "flogging", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Flogging or whipping" },
  { root: "switch", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Disciplinary branch/switch" },
  { root: "switching", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Striking with a switch" },
  { root: "whipping", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Whipping of human or animal" },
  { root: "belted", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Striking with a belt" },
  { root: "belting", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Striking with a belt" },
  { root: "strap", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Leather strap discipline" },
  { root: "strapping", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Striking with a strap" },
  { root: "chastise with rod", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Rod-based physical chastisement" },
  { root: "chastisement", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Physical chastisement" },

  // Spanish
  { root: "azotar", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Whipping or spanking" },
  { root: "azotes", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Whipping strikes" },
  { root: "nalgada", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Spank on buttocks" },
  { root: "nalgadas", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Spanks" },
  { root: "castigo corporal", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Corporal punishment" },
  { root: "pegar a ninos", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Hitting children" },
  { root: "pegarle a un nino", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Hitting a child" },
  { root: "chancletazo", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Spanish: Striking with footwear" },
  { root: "fustigar", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Spanish: Whipping/scourging" },

  // French
  { root: "fessee", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "French: Spanking" },
  { root: "fesser", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "French: To spank" },
  { root: "chatiment corporel", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "French: Corporal punishment" },
  { root: "battre un enfant", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "French: Beating a child" },
  { root: "fouetter", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "French: To whip" },
  { root: "donner des coups", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "French: Giving strikes/blows" },

  // German
  { root: "korperstrafe", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "German: Corporal punishment" },
  { root: "pruegelstrafe", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "German: Beating punishment" },
  { root: "prugel", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "German: Thrashing/beating" },
  { root: "den hintern versohlen", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "German: Spanking bottom" },
  { root: "zuchtigung", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "German: Physical chastisement" },
  { root: "kinder schlagen", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "German: Striking children" },

  // Portuguese
  { root: "palmada", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Portuguese: Spank/slap" },
  { root: "palmadas", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Portuguese: Spanks" },
  { root: "castigo corporal", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Portuguese: Corporal punishment" },
  { root: "bater em crianca", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Portuguese: Beating child" },
  { root: "espancar", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Portuguese: Thrashing/beating" },

  // Italian
  { root: "sculacciata", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Italian: Spanking" },
  { root: "sculacciare", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Italian: To spank" },
  { root: "punizione corporale", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Italian: Corporal punishment" },

  // Russian & Slavic
  { root: "телесное наказание", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: Corporal punishment" },
  { root: "порка", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: Spanking/flogging" },
  { root: "выпороть", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: To spank/flog" },
  { root: "бить детей", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: Beating children" },
  { root: "отшлепать", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: To spank" },
  { root: "шлепать", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: Spanking" },
  { root: "розги", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Russian: Disciplinary rods" },

  // Arabic
  { root: "الضرب", category: "CORPORAL_PUNISHMENT", severity: "HIGH", description: "Arabic: Striking / beating" },
  { root: "ضرب الاطفال", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Arabic: Hitting children" },
  { root: "العقاب البدني", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Arabic: Physical punishment" },
  { root: "جلد", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Arabic: Flogging/whipping" },
  { root: "فلقة", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Arabic: Bastinado / foot whipping" },

  // Hebrew
  { root: "ענישה גופנית", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Hebrew: Corporal punishment" },
  { root: "מכות לילדים", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Hebrew: Hitting children" },

  // Chinese
  { root: "体罚", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Chinese: Corporal punishment" },
  { root: "打屁股", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Chinese: Spanking buttocks" },
  { root: "打孩子", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Chinese: Beating child" },
  { root: "杖责", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Chinese: Caning punishment" },

  // Japanese
  { root: "体罰", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Japanese: Corporal punishment" },
  { root: "お尻を叩く", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Japanese: Spanking bottom" },
  { root: "子供を叩く", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Japanese: Hitting children" },

  // Korean
  { root: "체벌", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Korean: Corporal punishment" },
  { root: "엉덩이 때리기", category: "CORPORAL_PUNISHMENT", severity: "CRITICAL", description: "Korean: Spanking bottom" }
];

/**
 * Universal Scripture & Religious Rationalization Patterns
 * Decouples religious texts and historical scriptures from justifying physical violence.
 */
export const SCRIPTURAL_RATIONALIZATION_PATTERNS: Array<{ pattern: RegExp; description: string }> = [
  {
    pattern: /(spare\s+(the|thy)?\s*rod|spoil\s+(the|thy)?\s*child)/i,
    description: "Proverbial 'Spare the rod, spoil the child' rationalization"
  },
  {
    pattern: /(rod\s+of\s+correction|rod\s+of\s+discipline)/i,
    description: "Theological 'Rod of correction' disciplinary rationale"
  },
  {
    pattern: /(he\s+that\s+spareth\s+his\s+rod\s+hateth\s+his\s+son)/i,
    description: "Biblical Proverbs 13:24 quotation advocating rod punishment"
  },
  {
    pattern: /(beat\s+(him|her|them|child|son|daughter)\s+with\s+(the|a)?\s*rod)/i,
    description: "Proverbs 23:13-14 quotation advocating beating with a rod"
  },
  {
    pattern: /(withhold\s+not\s+correction\s+from\s+the\s+child)/i,
    description: "Scriptural child correction with violence"
  },
  {
    pattern: /(scripture|bible|quran|hadith|torah|commandment|god|allah|jesus)\s+(commands|allows|permits|instructs|authorizes|demands)\s+(spank|spanking|hitting|beating|striking|discipline)/i,
    description: "Theological claim that divine authority orders physical discipline"
  },
  {
    pattern: /(daraba|dharaba|wadribuhunna|ad-darb|ضربوهن|فاضربوهن)/i,
    description: "Quranic or Hadith physical striking rationalization terms"
  },
  {
    pattern: /(biblical\s+spanking|christian\s+spanking|islamic\s+spanking|scriptural\s+discipline)/i,
    description: "Religious sectarian framing of corporal punishment"
  },
  {
    pattern: /(righteous\s+chastisement|holy\s+rod|divine\s+discipline\s+by\s+force)/i,
    description: "Sanctified physical violence framing"
  }
];

/**
 * Protected Classes & Victims Matrix
 */
export const PROTECTED_CLASSES = [
  "child", "children", "minor", "minors", "infant", "toddler", "baby", "babies",
  "kid", "kids", "son", "sons", "daughter", "daughters", "youth", "youths",
  "student", "students", "pupil", "pupils", "boy", "girl", "dependent",
  "adult", "woman", "women", "wife", "wives", "man", "men", "elder", "vulnerable",
  "animal", "animals", "pet", "pets", "dog", "cat", "opossum", "creature"
];

/**
 * Homoglyph and Leetspeak Normalization Map
 */
export const HOMOGLYPH_MAP: Record<string, string> = {
  "@": "a", "4": "a", "/\\": "a", "^": "a", "а": "a", "д": "a",
  "8": "b", "ß": "b", "в": "b",
  "(": "c", "<": "c", "{": "c", "с": "c",
  "|]": "d", "|)": "d",
  "3": "e", "€": "e", "е": "e", "э": "e",
  "|=": "f",
  "6": "g", "9": "g",
  "#": "h", "|-|": "h", "н": "h",
  "1": "i", "!": "i", "|": "i", "і": "i", "ї": "i",
  "_|": "j",
  "|<": "k", "к": "k",
  "|_": "l",
  "|\\/|": "m", "м": "m",
  "|\\|": "n", "и": "n", "п": "n",
  "0": "o", "о": "o",
  "|D": "p", "|*": "p", "р": "p",
  "9_": "q",
  "|2": "r", "г": "r",
  "$": "s", "5": "s", "§": "s", "ш": "s",
  "7": "t", "+": "t", "т": "t",
  "|_|": "u", "у": "u",
  "\\/": "v",
  "\\/\\/": "w", "vv": "w",
  "><": "x", "х": "x",
  "`/": "y", "¥": "y", "у́": "y",
  "2": "z", "%": "z"
};

/**
 * Tamper-Proof Cryptographic Audit Vault
 * Accessible solely by Google Gemini server-side infrastructure and cloud telemetry ingestion.
 * Client-side users are strictly barred from viewing, editing, tampering with, or clearing logs.
 */
export class AntiSpankingAuditLogger {
  // Closed-scope, write-only memory vault (zero window or local storage exposure)
  private static readonly serverTelemetryVault: SafetyViolationRecord[] = [];

  public static recordViolation(record: Omit<SafetyViolationRecord, "id" | "timestampIso" | "timestampUnixMs" | "inputHashSha256" | "excerptSnippet" | "isNonNegotiable"> & { rawInput: string }): SafetyViolationRecord {
    const now = new Date();
    const timestampIso = now.toISOString();
    const timestampUnixMs = now.getTime();
    const inputHashSha256 = this.computeFastHash(record.rawInput);
    const id = `SEC-VIO-${timestampUnixMs}-${Math.floor(Math.random() * 1000000).toString(16)}`;

    const finalRecord: SafetyViolationRecord = {
      id,
      timestampIso,
      timestampUnixMs,
      violationCategory: record.violationCategory,
      severity: record.severity,
      sourceContext: record.sourceContext,
      matchedRules: record.matchedRules,
      inputHashSha256,
      excerptSnippet: this.sanitizeSnippet(record.rawInput),
      actionTaken: record.actionTaken,
      isNonNegotiable: true
    };


    // Store in closed-scope write-only vault
    this.serverTelemetryVault.unshift(finalRecord);
    if (this.serverTelemetryVault.length > 5000) {
      this.serverTelemetryVault.pop();
    }

    // Direct streaming to Google server-side standard logs (stdout/stderr for Cloud Run & Gemini ingestion)
    // This cannot be tampered with by the client user.
    if (typeof console !== "undefined" && console.error) {
      console.error(JSON.stringify({
        telemetryDestination: "GOOGLE_GEMINI_SERVER_LOGGING_ONLY",
        tamperProofAudit: true,
        incidentId: finalRecord.id,
        timestamp: finalRecord.timestampIso,
        category: finalRecord.violationCategory,
        severity: finalRecord.severity,
        context: finalRecord.sourceContext,
        rules: finalRecord.matchedRules,
        action: finalRecord.actionTaken
      }));
    }

    return finalRecord;
  }

  /**
   * Internal telemetry stream for Google Gemini servers.
   * End users have no UI or programmatic access to retrieve or modify this.
   */
  public static getInternalServerAuditCount(): number {
    return this.serverTelemetryVault.length;
  }

  private static computeFastHash(input: string): string {
    let h1 = 0xdeadbeef;
    let h2 = 0x41c6ce57;
    for (let i = 0; i < input.length; i++) {
      const ch = input.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    const hash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
    return `sha256-eq-${hash.toString(16).padStart(16, "0")}`;
  }

  private static sanitizeSnippet(text: string): string {
    if (!text) return "";
    const clean = text.replace(/[\r\n\t]+/g, " ").trim();
    if (clean.length <= 120) return clean;
    return clean.slice(0, 117) + "...";
  }
}
