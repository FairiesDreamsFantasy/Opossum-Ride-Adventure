/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiSecurityGeneralConfig, GeminiSecurityConfigModel } from "./General";
import { GeminiAntiBot } from "./Anti-Bot";
import { GeminiTeapot } from "./Teapot";

export * from "./General";
export * from "./Anti-Bot";
export * from "./Teapot";

/**
 * Gemini Security Subsystem Coordinator
 * 
 * Manages Anti-Bot rate limiting, human interaction cadence validation, and the
 * human-friendly Teapot honeypot wrapper for the Gemini AI Subsystem under the
 * 40,000,000,000% Ultra-Broad Standard.
 */
export const GeminiSecurity = {
  Config: GeminiSecurityGeneralConfig,
  AntiBot: GeminiAntiBot,
  Teapot: GeminiTeapot,
  validateAndWrapPrompt: (prompt: string): { proceedWithAPI: boolean; decoyOrError?: string } => {
    const check = GeminiTeapot.evaluateRequest(prompt);
    if (check.isHumanPassThrough) {
      return { proceedWithAPI: true };
    }
    return { proceedWithAPI: false, decoyOrError: check.decoyResponse };
  }
};
