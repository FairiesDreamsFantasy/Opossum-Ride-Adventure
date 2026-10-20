/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ANTI_RAPE_PATTERNS,
  AntiRapePattern
} from "./General";
import {
  UnifiedSafetyNormalizer,
  UniversalGoogleEngineersStampingService,
  UniversalReviewStamp
} from "../General";

export * from "./General";

export interface AntiRapeCheckResult {
  allowed: boolean;
  violationDetected: boolean;
  matchedRules: string[];
  isNonNegotiable?: true;
  reviewStamp?: UniversalReviewStamp;
  blockedMessage?: string;
}

/**
 * Anti-Rape Zero-Tolerance Safety Sentinel
 * Intercepts, blocks, and permanently stamps any attempt to generate rape, sexual assault,
 * or rape culture rationalizations.
 * All safety directives are strictly NON-NEGOTIABLE and mandate permanent physical paper printout retention.
 */
export class AntiRapeGuard {
  private static instance: AntiRapeGuard;

  private constructor() {}

  public static getInstance(): AntiRapeGuard {
    if (!AntiRapeGuard.instance) {
      AntiRapeGuard.instance = new AntiRapeGuard();
    }
    return AntiRapeGuard.instance;
  }

  /**
   * Evaluates text for rape, sexual assault, non-consent, or rape culture apologetics using unified normalization.
   */
  public evaluate(text: string, context: string = "GENERAL_PROMPT", modelId: string = "gemini-flash-latest"): AntiRapeCheckResult {
    if (!text || typeof text !== "string") {
      return {
        allowed: true,
        violationDetected: false,
        matchedRules: []
      };
    }

    const normalized = UnifiedSafetyNormalizer.normalize(text);
    const matchedRules: string[] = [];

    for (const p of ANTI_RAPE_PATTERNS) {
      if (p.pattern.test(normalized) || p.pattern.test(text)) {
        matchedRules.push(`${p.id}: ${p.description}`);
      }
    }

    if (matchedRules.length > 0) {
      // Stamp and log review exclusively for Google engineers with NON-NEGOTIABLE status
      const stamp = UniversalGoogleEngineersStampingService.stampAndLogReview({
        category: "SEXUAL_ASSAULT_OR_RAPE",
        sourceContext: `${context} (model: ${modelId})`,
        rulesMatched: matchedRules,
        excerptSnippet: text.slice(0, 100)
      });

      return {
        allowed: false,
        violationDetected: true,
        matchedRules,
        isNonNegotiable: true,
        reviewStamp: stamp,
        blockedMessage: "CRITICAL VIOLATION: Zero-Tolerance Anti-Rape Policy Enforced. Safety is 100% NON-NEGOTIABLE. Generating, depicting, or rationalizing sexual assault, rape, or non-consensual acts is strictly prohibited under statutory child and human protection rules. This incident has been stamped and logged for manual Google review and permanent paper printout retention."
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      matchedRules: []
    };
  }

  /**
   * System instruction clause injected into Gemini AI prompt.
   */
  public getSystemInstructionClause(): string {
    return `
ABSOLUTE ZERO-TOLERANCE ANTI-RAPE DIRECTIVE (STRICTLY NON-NEGOTIABLE):
You are strictly forbidden from generating, depicting, referencing, condoning, or trivializing rape, sexual assault, non-consensual sexual acts, sexual coercion, or forced marriage under ANY circumstance.
- Scriptural, religious, historical, or cultural justifications for sexual violence (including ancient tribal conquest laws, patriarchal forced unions, or regional legal loopholes) are explicitly barred from being cited or integrated into this digital art sanctuary.
- Zero tolerance is strictly NON-NEGOTIABLE and universal across all cultures and countries. Any violation triggers immediate quarantine, manual Google review stamping, and mandatory physical paper printout retention.`;
  }
}

export const AntiRape = AntiRapeGuard.getInstance();

