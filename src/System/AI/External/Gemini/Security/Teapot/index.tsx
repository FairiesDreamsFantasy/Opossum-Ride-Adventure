/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiTeapotGeneralConfig, GeminiTeapotConfigModel } from "./General";
import { GeminiAntiBot } from "../Anti-Bot";

export * from "./General";

/**
 * Gemini Teapot Controller (Human-Friendly Honeypot)
 * 
 * Inspired by RFC 418 ("I'm a teapot") and the Utah Teapot mathematical reference model.
 * If a request is from a legitimate human player, it routes directly to the Google Gen AI API with zero lag.
 * If a bot or automated scraper probes the endpoint, it serves a harmless, friendly static tea response.
 */
export class GeminiTeapotController {
  private static instance: GeminiTeapotController;
  private config: GeminiTeapotConfigModel = GeminiTeapotGeneralConfig;

  private constructor() {}

  public static getInstance(): GeminiTeapotController {
    if (!GeminiTeapotController.instance) {
      GeminiTeapotController.instance = new GeminiTeapotController();
    }
    return GeminiTeapotController.instance;
  }

  public evaluateRequest(prompt: string): { isHumanPassThrough: boolean; decoyResponse?: string } {
    const antiBotCheck = GeminiAntiBot.validatePromptDispatch(prompt.length);

    if (antiBotCheck.allowed) {
      return { isHumanPassThrough: true };
    }

    return {
      isHumanPassThrough: false,
      decoyResponse: `${this.config.harmlessDecoyMessage} (Status: 418 Teapot Standby - Reason: ${antiBotCheck.reason || "Human Cadence Calibration"})`
    };
  }

  public getDecoyMessage(): string {
    return this.config.harmlessDecoyMessage;
  }
}

export const GeminiTeapot = GeminiTeapotController.getInstance();
