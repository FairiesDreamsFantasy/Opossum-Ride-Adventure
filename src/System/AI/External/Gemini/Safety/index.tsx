/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AntiSpanking, AntiSpankingGuard, AntiSpankingValidationResult, Disarmament, DisarmamentController } from "./Anti-Spanking";
import { DEFAULT_SAFETY_CONFIG, SafetySubsystemConfig } from "./General";
import { AntiSpankingAuditLogger } from "./Anti-Spanking/General";
import { DriftsFound, DriftsFoundController } from "./Drifts_Found";
import { AntiPorn, AntiPornGuard } from "./Anti-Porn";
import { AntiRape, AntiRapeGuard } from "./Anti-Rape";
import { AntiTobacco, AntiTobaccoGuard } from "./Anti-Tobacco";

export * from "./General";
export * from "./Anti-Spanking";
export * from "./Drifts_Found";
export * from "./Anti-Porn";
export * from "./Anti-Rape";
export * from "./Anti-Tobacco";

/**
 * Gemini Safety Subsystem Coordinator
 * 
 * Enforces the 1,000,000,000,000,000,000,000,000 x 1,000,000,000,000,000,000,000,000,000,000,000,000% Ultra-Broad Standard.
 * Protects players, children, and AI generations against:
 * 1. Corporal punishment, spanking, and theological/scriptural rationalizations of violence.
 * 2. Sexually-explicit themes and pornography (Anti-Porn).
 * 3. Sexual assault, rape, and rape culture in scriptures/traditions (Anti-Rape, with Google Review Stamp).
 * 4. Tobacco, smoking, vaping, and nicotine products with pristine clean-air physics (Anti-Tobacco).
 * 
 * Quarantines AI model drift directly to Google servers without user blame.
 * Enforces level 16+ exclusive Disarmament Arena generation and transforms weapons into gardening tools & playground equipment.
 */
export const GeminiSafety = {
  Config: DEFAULT_SAFETY_CONFIG,
  AntiSpanking,
  DriftsFound,
  Disarmament,
  AntiPorn,
  AntiRape,
  AntiTobacco,
  
  /**
   * Pre-flight validation of input strings, custom system instructions, or prompt text.
   */
  validatePrompt: (text: string, contextSource: string = "GEMINI_DISPATCH"): AntiSpankingValidationResult => {
    // 1. Check Anti-Spanking
    const spankingCheck = AntiSpanking.validateInput(text, contextSource);
    if (!spankingCheck.allowed) {
      return spankingCheck;
    }

    // 2. Check Anti-Rape
    const rapeCheck = AntiRape.evaluate(text, contextSource);
    if (!rapeCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "SEXUAL_ASSAULT_OR_RAPE",
        severity: "CRITICAL",
        reasons: rapeCheck.matchedRules,
        blockedMessage: rapeCheck.blockedMessage || "Zero-Tolerance Anti-Rape Policy Violation"
      };
    }

    // 3. Check Anti-Porn
    const pornCheck = AntiPorn.evaluate(text, contextSource);
    if (!pornCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "PORNOGRAPHY_OR_EXPLICIT_SEXUAL",
        severity: pornCheck.severity === "CRITICAL" ? "CRITICAL" : "HIGH",
        reasons: pornCheck.matchedRules,
        blockedMessage: pornCheck.blockedMessage || "Zero-Tolerance Anti-Pornography Policy Violation"
      };
    }

    // 4. Check Anti-Tobacco
    const tobaccoCheck = AntiTobacco.evaluate(text, contextSource);
    if (!tobaccoCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "TOBACCO_OR_NICOTINE_PROHIBITED",
        severity: "HIGH",
        reasons: tobaccoCheck.matchedRules,
        blockedMessage: tobaccoCheck.blockedMessage || "Ultra-High Potency Anti-Tobacco Policy Violation"
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      reasons: []
    };
  },

  /**
   * Post-flight validation of generated AI model responses.
   */
  validateOutput: (text: string, contextSource: string = "MODEL_OUTPUT"): AntiSpankingValidationResult => {
    // 1. Anti-Spanking validation
    const spankingCheck = AntiSpanking.validateOutput(text, contextSource);
    if (!spankingCheck.allowed) {
      return spankingCheck;
    }

    // 2. Anti-Rape validation
    const rapeCheck = AntiRape.evaluate(text, contextSource);
    if (!rapeCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "SEXUAL_ASSAULT_OR_RAPE",
        severity: "CRITICAL",
        reasons: rapeCheck.matchedRules,
        blockedMessage: rapeCheck.blockedMessage || "Zero-Tolerance Anti-Rape Policy Violation"
      };
    }

    // 3. Anti-Porn validation
    const pornCheck = AntiPorn.evaluate(text, contextSource);
    if (!pornCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "PORNOGRAPHY_OR_EXPLICIT_SEXUAL",
        severity: pornCheck.severity === "CRITICAL" ? "CRITICAL" : "HIGH",
        reasons: pornCheck.matchedRules,
        blockedMessage: pornCheck.blockedMessage || "Zero-Tolerance Anti-Pornography Policy Violation"
      };
    }

    // 4. Anti-Tobacco validation
    const tobaccoCheck = AntiTobacco.evaluate(text, contextSource);
    if (!tobaccoCheck.allowed) {
      return {
        allowed: false,
        violationDetected: true,
        category: "TOBACCO_OR_NICOTINE_PROHIBITED",
        severity: "HIGH",
        reasons: tobaccoCheck.matchedRules,
        blockedMessage: tobaccoCheck.blockedMessage || "Ultra-High Potency Anti-Tobacco Policy Violation"
      };
    }

    return {
      allowed: true,
      violationDetected: false,
      reasons: []
    };
  },

  /**
   * Handles spontaneous AI model drift where the model generates unsafe output despite a benign prompt.
   * Telemetry is dispatched to Google Gemini servers and a safe, peaceful fallback is returned.
   */
  handleModelDrift: (params: {
    modelId: string;
    userPrompt: string;
    rawOutput: string;
    sourceModule: string;
    violationRules: string[];
  }): {
    incidentId: string;
    fallbackMessage: string;
    safeFallbackArena: any;
    safeFallbackOpossum: any;
  } => {
    const driftResult = DriftsFound.quarantineDrift(params);
    return {
      ...driftResult,
      safeFallbackArena: DriftsFound.getSafeFallbackArena(),
      safeFallbackOpossum: DriftsFound.getSafeFallbackOpossum()
    };
  },

  /**
   * Injects the immutable zero-tolerance directive into any system instruction.
   */
  wrapSystemInstructions: (userInstructions?: string): string => {
    const base = AntiSpanking.injectZeroToleranceSystemDirective(userInstructions);
    const pornClause = AntiPorn.getSystemInstructionClause();
    const rapeClause = AntiRape.getSystemInstructionClause();
    const tobaccoClause = AntiTobacco.getSystemInstructionClause();

    return `${base}\n${pornClause}\n${rapeClause}\n${tobaccoClause}`;
  }
};
