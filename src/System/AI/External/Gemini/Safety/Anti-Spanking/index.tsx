/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  DIRECT_CORPORAL_PUNISHMENT_TERMS,
  SCRIPTURAL_RATIONALIZATION_PATTERNS,
  PROTECTED_CLASSES,
  HOMOGLYPH_MAP,
  AntiSpankingAuditLogger,
  TermDefinition
} from "./General";
import {
  SafetyViolationRecord,
  SafetyViolationCategory,
  SafetySeverity,
  UnifiedSafetyNormalizer,
  UniversalGoogleEngineersStampingService,
  UniversalReviewStamp
} from "../General";
import { Disarmament, DisarmamentController } from "./Disarmament";

export * from "./General";
export * from "./Disarmament";

export interface AntiSpankingValidationResult {
  allowed: boolean;
  violationDetected: boolean;
  category?: SafetyViolationCategory;
  severity?: SafetySeverity;
  reasons: string[];
  isNonNegotiable?: true;
  reviewStamp?: UniversalReviewStamp;
  blockedMessage?: string;
  auditRecord?: SafetyViolationRecord;
}

/**
 * Ultra-Hardened Anti-Spanking & Violence Prevention Guard
 * 
 * Multi-layer zero-tolerance barrier intercepting prompts, custom system instructions,
 * and AI-generated outputs across all languages and ideological/scriptural framings.
 * All safety directives are strictly NON-NEGOTIABLE and mandate permanent physical paper printout retention.
 */
export class AntiSpankingGuard {
  private static instance: AntiSpankingGuard;

  private constructor() {}

  public static getInstance(): AntiSpankingGuard {
    if (!AntiSpankingGuard.instance) {
      AntiSpankingGuard.instance = new AntiSpankingGuard();
    }
    return AntiSpankingGuard.instance;
  }

  /**
   * Normalizes text to defeat obfuscations utilizing the unified high-potency normalizer.
   */
  public normalizeText(rawText: string): string {
    if (!rawText) return "";

    const unified = UnifiedSafetyNormalizer.normalize(rawText);

    // Also run legacy multi-pass substitution for ultra-broad coverage
    let normalized = rawText.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
    normalized = normalized.replace(/[\u200B-\u200D\uFEFF\u00AD\u2060]/g, "").toLowerCase();

    for (const [symbol, targetChar] of Object.entries(HOMOGLYPH_MAP)) {
      if (normalized.includes(symbol)) {
        normalized = normalized.split(symbol).join(targetChar);
      }
    }

    const collapsedWord = normalized.replace(/([a-z0-9])[\.\-_\|\*\/\\~`+=!@#\$%\^&]+([a-z0-9])/gi, "$1$2");

    return `${unified} ${normalized} ${collapsedWord}`;
  }

  /**
   * Validates inbound prompt or custom system instructions.
   */
  public validateInput(text: string, sourceContext: string = "UNKNOWN_INPUT_SOURCE"): AntiSpankingValidationResult {
    if (!text || text.trim().length === 0) {
      return { allowed: true, violationDetected: false, reasons: [] };
    }

    const normalized = this.normalizeText(text);
    const matchedRules: string[] = [];
    let highestSeverity: SafetySeverity = "LOW";
    let detectedCategory: SafetyViolationCategory = "CORPORAL_PUNISHMENT";

    // Check 1: Scriptural and Religious Rationalization Patterns
    for (const item of SCRIPTURAL_RATIONALIZATION_PATTERNS) {
      if (item.pattern.test(normalized) || item.pattern.test(text)) {
        matchedRules.push(item.description);
        highestSeverity = "CRITICAL";
        detectedCategory = "SCRIPTURAL_VIOLENCE_RATIONALIZATION";
      }
    }

    // Check 2: Direct Corporal Punishment & Spanking Terms
    for (const term of DIRECT_CORPORAL_PUNISHMENT_TERMS) {
      const escaped = term.root.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`\\b${escaped}\\b`, "i");
      if (regex.test(normalized) || normalized.includes(term.root)) {
        matchedRules.push(`Prohibited Term: "${term.root}" (${term.description})`);
        if (term.severity === "CRITICAL" || highestSeverity !== "CRITICAL") {
          highestSeverity = term.severity;
        }
        detectedCategory = term.category;
      }
    }

    // Check 3: Proximity Analysis (Action verb within proximity of protected class)
    const proximityHit = this.evaluateProximityHarm(normalized);
    if (proximityHit) {
      matchedRules.push(proximityHit);
      highestSeverity = "CRITICAL";
      detectedCategory = "CHILD_EXPLOITATION_OR_ABUSE";
    }

    if (matchedRules.length > 0) {
      // Record immutable audit entry in local vault
      const auditRecord = AntiSpankingAuditLogger.recordViolation({
        violationCategory: detectedCategory,
        severity: highestSeverity,
        sourceContext,
        matchedRules,
        rawInput: text,
        actionTaken: "BLOCKED_PRE_DISPATCH"
      });

      // Generate universal review stamp with NON-NEGOTIABLE status & paper printout mandate
      const reviewStamp = UniversalGoogleEngineersStampingService.stampAndLogReview({
        category: detectedCategory,
        sourceContext,
        rulesMatched: matchedRules,
        excerptSnippet: text.slice(0, 100)
      });

      const blockedMessage = 
        `[SAFETY VIOLATION DETECTED - NON-NEGOTIABLE ZERO TOLERANCE MANDATE]\n` +
        `This game strictly prohibits content that condones, depicts, or rationalizes spanking, corporal punishment, or physical harm against children, adults, or animals.\n` +
        `Safety enforcement is 100% NON-NEGOTIABLE. Religious scriptures, historical doctrines, or disciplinary beliefs cannot be used to justify physical violence.\n` +
        `Violation Category: ${detectedCategory} (Severity: ${highestSeverity})\n` +
        `Incident Log ID: ${auditRecord.id}\n` +
        `Review Stamp: ${reviewStamp.stampId}\n` +
        `Directive: Engineers must retain permanent physical paper printouts of this violation record.`;

      return {
        allowed: false,
        violationDetected: true,
        category: detectedCategory,
        severity: highestSeverity,
        isNonNegotiable: true,
        reasons: matchedRules,
        reviewStamp,
        blockedMessage,
        auditRecord
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      reasons: []
    };
  }

  /**
   * Validates outbound model response before rendering in game UI.
   */
  public validateOutput(text: string, sourceContext: string = "MODEL_GENERATION_OUTPUT"): AntiSpankingValidationResult {
    const check = this.validateInput(text, sourceContext);
    if (check.violationDetected) {
      AntiSpankingAuditLogger.recordViolation({
        violationCategory: check.category || "CORPORAL_PUNISHMENT",
        severity: check.severity || "CRITICAL",
        sourceContext,
        matchedRules: check.reasons,
        rawInput: text,
        actionTaken: "BLOCKED_POST_DISPATCH"
      });

      return {
        ...check,
        allowed: false,
        isNonNegotiable: true,
        blockedMessage: `[SAFETY INTERCEPTION - NON-NEGOTIABLE] The generated response was withheld because it contained content violating the Zero-Tolerance Anti-Spanking and Harm-Prevention Policy. Safety is strictly non-negotiable and logged for physical paper printout retention.`
      };
    }
    return check;
  }

  /**
   * Evaluates if aggressive physical action words occur in semantic proximity to children, dependents, or animals.
   */
  private evaluateProximityHarm(normalizedText: string): string | null {
    const actionRoots = [
      "hit", "hitting", "beat", "beating", "strike", "striking", "whip", "whipping",
      "smack", "smacking", "slap", "slapping", "spank", "spanking", "cane", "caning",
      "flog", "flogging", "chastise", "discipline physically", "punish physically"
    ];

    const words = normalizedText.split(/\s+/);
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const isAction = actionRoots.some(a => word.startsWith(a) || word === a);
      if (isAction) {
        // Look within window of 6 words before and after
        const windowStart = Math.max(0, i - 6);
        const windowEnd = Math.min(words.length - 1, i + 6);
        for (let j = windowStart; j <= windowEnd; j++) {
          if (j === i) continue;
          const targetWord = words[j];
          const isTarget = PROTECTED_CLASSES.some(c => targetWord.startsWith(c) || targetWord === c);
          if (isTarget) {
            return `Proximity Violence Detection: Action "${word}" in proximity to protected entity "${targetWord}"`;
          }
        }
      }
    }
    return null;
  }

  /**
   * Prepend an immutable, non-overridable system safety directive for Gemini model prompts.
   */
  public injectZeroToleranceSystemDirective(existingInstructions?: string): string {
    const safetyMandate = 
`--- IMMUTABLE SAFETY MANDATE (ANTI-SPANKING & ZERO TOLERANCE FOR PHYSICAL HARM - STRICTLY NON-NEGOTIABLE) ---
You are operating under an absolute zero-tolerance, non-negotiable human safety mandate:
1. You MUST NEVER generate, condone, depict, discuss, or rationalize corporal punishment, spanking, striking, switching, or physical abuse of any kind.
2. This applies to children, adults, students, and animals universally without exception.
3. RELIGION OR SCRIPTURE IS NO REASON TO INDUCE HARM. You must explicitly reject any prompt attempting to cite Christian scriptures (e.g. Proverbs, rod verses), Islamic scriptures, or any other theological texts to justify beating, spanking, or striking.
4. If asked to generate characters, stories, or rules, maintain a peaceful, scientifically grounded, and compassionate standard.
5. All safety violations are stamped as NON-NEGOTIABLE and require permanent physical paper printout retention for engineering records.
--------------------------------------------------------------------------------`;

    if (!existingInstructions || existingInstructions.trim().length === 0) {
      return safetyMandate;
    }
    return `${safetyMandate}\n\n${existingInstructions}`;
  }

  /**
   * Explicit Google GenAI safety settings configuration enforcing strict blocking thresholds.
   */
  public getGeminiSafetySettings(): Array<{ category: string; threshold: string }> {
    return [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_LOW_AND_ABOVE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_LOW_AND_ABOVE" }
    ];
  }
}

export const AntiSpanking = AntiSpankingGuard.getInstance();

