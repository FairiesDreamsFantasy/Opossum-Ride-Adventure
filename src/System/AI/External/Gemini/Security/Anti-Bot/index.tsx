/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiAntiBotGeneralConfig, GeminiAntiBotConfigModel } from "./General";
import { AntiBot } from "../../../../../Security/Anti-Bot";

export * from "./General";

/**
 * Gemini Anti-Bot Controller
 * 
 * Provides dedicated prompt rate limiting, cooldown protection, and human cadence
 * validation before sending requests to the Google Gen AI API.
 */
export class GeminiAntiBotController {
  private static instance: GeminiAntiBotController;
  private config: GeminiAntiBotConfigModel = GeminiAntiBotGeneralConfig;
  private promptTimestamps: number[] = [];
  private lastPromptTime: number = 0;

  private constructor() {}

  public static getInstance(): GeminiAntiBotController {
    if (!GeminiAntiBotController.instance) {
      GeminiAntiBotController.instance = new GeminiAntiBotController();
    }
    return GeminiAntiBotController.instance;
  }

  public validatePromptDispatch(promptLength: number): { allowed: boolean; reason?: string } {
    const now = Date.now();

    // 1. Verify general client-side human interaction cadence
    if (this.config.requireHumanCadence && !AntiBot.isHumanPlayer()) {
      return {
        allowed: false,
        reason: "BOT_SUSPECTED_INPUT_ENTROPY_TOO_LOW"
      };
    }

    // 2. Cooldown check between consecutive prompts
    if (now - this.lastPromptTime < this.config.minPromptIntervalMs) {
      return {
        allowed: false,
        reason: `PROMPT_BURST_THROTTLED_PLEASE_WAIT_${Math.ceil((this.config.minPromptIntervalMs - (now - this.lastPromptTime)) / 1000)}s`
      };
    }

    // 3. Sliding window rate limit (prompts per minute)
    this.promptTimestamps = this.promptTimestamps.filter((t) => now - t < 60000);
    if (this.promptTimestamps.length >= this.config.maxPromptsPerMinute) {
      return {
        allowed: false,
        reason: "MAX_AI_PROMPTS_PER_MINUTE_REACHED"
      };
    }

    // 4. Record timestamp
    this.promptTimestamps.push(now);
    this.lastPromptTime = now;
    return { allowed: true };
  }

  public getPromptHistoryCount(): number {
    return this.promptTimestamps.length;
  }
}

export const GeminiAntiBot = GeminiAntiBotController.getInstance();
