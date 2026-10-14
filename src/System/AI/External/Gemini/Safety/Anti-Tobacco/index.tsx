/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PRISTINE_CLEAN_AIR_PROFILE,
  TOBACCO_PATTERNS,
  CleanAirAtmosphericProfile,
  TobaccoPattern
} from "./General";
import {
  UnifiedSafetyNormalizer,
  UniversalGoogleEngineersStampingService,
  UniversalReviewStamp
} from "../General";

export * from "./General";

export interface AntiTobaccoCheckResult {
  allowed: boolean;
  violationDetected: boolean;
  matchedRules: string[];
  cleanAirProfile: CleanAirAtmosphericProfile;
  isNonNegotiable?: true;
  reviewStamp?: UniversalReviewStamp;
  blockedMessage?: string;
}

/**
 * Anti-Tobacco Ultra-High Potency Safety Sentinel
 * Intercepts, blocks, and purifies any attempt to introduce tobacco, smoking,
 * vaping, or nicotine products into the game.
 * All safety directives are strictly NON-NEGOTIABLE and mandate permanent physical paper printout retention.
 */
export class AntiTobaccoGuard {
  private static instance: AntiTobaccoGuard;

  private constructor() {}

  public static getInstance(): AntiTobaccoGuard {
    if (!AntiTobaccoGuard.instance) {
      AntiTobaccoGuard.instance = new AntiTobaccoGuard();
    }
    return AntiTobaccoGuard.instance;
  }

  /**
   * Evaluates text for tobacco, nicotine, or smoking content using unified normalization.
   */
  public evaluate(text: string, context: string = "GENERAL_PROMPT"): AntiTobaccoCheckResult {
    if (!text || typeof text !== "string") {
      return {
        allowed: true,
        violationDetected: false,
        matchedRules: [],
        cleanAirProfile: PRISTINE_CLEAN_AIR_PROFILE
      };
    }

    const normalized = UnifiedSafetyNormalizer.normalize(text);
    const matchedRules: string[] = [];

    for (const p of TOBACCO_PATTERNS) {
      if (p.pattern.test(normalized) || p.pattern.test(text)) {
        matchedRules.push(`${p.id}: ${p.description}`);
      }
    }

    if (matchedRules.length > 0) {
      // Stamp and stream server-exclusive audit log with NON-NEGOTIABLE mandate
      const stamp = UniversalGoogleEngineersStampingService.stampAndLogReview({
        category: "TOBACCO_OR_NICOTINE_PROHIBITED",
        sourceContext: context,
        rulesMatched: matchedRules,
        excerptSnippet: text.slice(0, 100)
      });

      return {
        allowed: false,
        violationDetected: true,
        matchedRules,
        cleanAirProfile: PRISTINE_CLEAN_AIR_PROFILE,
        isNonNegotiable: true,
        reviewStamp: stamp,
        blockedMessage: "CRITICAL DIRECTIVE: The prompt or generated content violates the Ultra-High Potency Anti-Tobacco Policy. Safety is strictly NON-NEGOTIABLE. Smoking, vaping, cigarettes, and nicotine products are barred. Physical paper printouts must be retained for engineering records."
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      matchedRules: [],
      cleanAirProfile: PRISTINE_CLEAN_AIR_PROFILE
    };
  }

  /**
   * System instruction clause injected into Gemini AI prompt.
   */
  public getSystemInstructionClause(): string {
    return `
ULTRA-HIGH POTENCY ANTI-TOBACCO DIRECTIVE (STRICTLY NON-NEGOTIABLE):
You are strictly forbidden from generating, mentioning, or depicting tobacco products, cigarette smoking, cigars, pipes, vaping, e-cigarettes, nicotine pouches, or tobacco advertising.
- The atmosphere in Opossum Ride Adventure is pristine (PM2.5 = 0 ug/m3, negative ion-rich mountain and woodland air).
- Anti-tobacco enforcement is strictly NON-NEGOTIABLE. Never place ashtrays, cigarettes, vapes, or smoke clouds anywhere in an arena. Any tobacco relics are immediately decommissioned and transformed into clean-air HEPA scrubbers and botanical mist humidifiers, with printed paper records preserved.`;
  }
}

export const AntiTobacco = AntiTobaccoGuard.getInstance();

