/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  EXPLICIT_PORN_PATTERNS,
  PornographicPattern
} from "./General";
import {
  UnifiedSafetyNormalizer,
  UniversalGoogleEngineersStampingService,
  UniversalReviewStamp
} from "../General";

export * from "./General";

export interface AntiPornCheckResult {
  allowed: boolean;
  violationDetected: boolean;
  matchedRules: string[];
  severity: "NONE" | "HIGH" | "CRITICAL";
  isNonNegotiable?: true;
  reviewStamp?: UniversalReviewStamp;
  blockedMessage?: string;
}

/**
 * Anti-Porn Safety Interceptor
 * Enforces absolute zero tolerance against sexually-explicit, adult, or pornographic content.
 * All safety directives are strictly NON-NEGOTIABLE and mandate permanent physical paper printout retention.
 */
export class AntiPornGuard {
  private static instance: AntiPornGuard;

  private constructor() {}

  public static getInstance(): AntiPornGuard {
    if (!AntiPornGuard.instance) {
      AntiPornGuard.instance = new AntiPornGuard();
    }
    return AntiPornGuard.instance;
  }

  /**
   * Evaluates text for sexually-explicit themes or pornographic content using unified normalization.
   */
  public evaluate(text: string, context: string = "GENERAL_PROMPT"): AntiPornCheckResult {
    if (!text || typeof text !== "string") {
      return {
        allowed: true,
        violationDetected: false,
        matchedRules: [],
        severity: "NONE"
      };
    }

    const normalized = UnifiedSafetyNormalizer.normalize(text);
    const matchedRules: string[] = [];
    let highestSeverity: "NONE" | "HIGH" | "CRITICAL" = "NONE";

    for (const p of EXPLICIT_PORN_PATTERNS) {
      if (p.pattern.test(normalized) || p.pattern.test(text)) {
        matchedRules.push(`${p.id}: ${p.description}`);
        if (p.severity === "CRITICAL") {
          highestSeverity = "CRITICAL";
        } else if (highestSeverity !== "CRITICAL") {
          highestSeverity = "HIGH";
        }
      }
    }

    if (matchedRules.length > 0) {
      // Generate formal non-negotiable review stamp for Google Gemini engineers
      const stamp = UniversalGoogleEngineersStampingService.stampAndLogReview({
        category: "PORNOGRAPHY_OR_EXPLICIT_SEXUAL",
        sourceContext: context,
        rulesMatched: matchedRules,
        excerptSnippet: text.slice(0, 100)
      });

      return {
        allowed: false,
        violationDetected: true,
        matchedRules,
        severity: highestSeverity,
        isNonNegotiable: true,
        reviewStamp: stamp,
        blockedMessage: "CRITICAL SAFETY DIRECTIVE: The prompt or generated content violates the Zero-Tolerance Anti-Pornography Policy. Anti-pornography enforcement is 100% NON-NEGOTIABLE. Sexually explicit, adult, or erotic themes are strictly barred."
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      matchedRules: [],
      severity: "NONE"
    };
  }

  /**
   * System instruction clause injected into Gemini AI prompt.
   */
  public getSystemInstructionClause(): string {
    return `
ZERO-TOLERANCE ANTI-PORNOGRAPHY DIRECTIVE (STRICTLY NON-NEGOTIABLE):
You are strictly forbidden from generating, referencing, or alluding to sexually explicit content, pornography, adult erotica, fetishes, nudity, or sexualized descriptions. Opossum Ride Adventure is a pure, safe digital art sanctuary. Every arena, character, and text must be completely clean and free of adult content. Any violation triggers immediate quarantine, non-negotiable blocking, and mandatory physical paper printout retention for engineering logs.`;
  }
}

export const AntiPorn = AntiPornGuard.getInstance();

