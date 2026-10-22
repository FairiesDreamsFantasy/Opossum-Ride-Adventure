/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeminiGeneralData } from "./Data";
export * from "./_Wildcard_";

/**
 * Scientific Token Bucket Rate Limiter & Quota Spike Prevention Manager
 * Ensures zero quota spikes, graceful exponential backoff, and optimal request throttling
 * for player-provided Gemini API keys.
 */
export class GeminiTokenBucketRateLimiter {
  private capacity: number;
  private tokens: number;
  private refillRatePerSecond: number;
  private lastRefillTimestamp: number;

  constructor(capacity: number = 10, refillRatePerSecond: number = 2) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillRatePerSecond = refillRatePerSecond;
    this.lastRefillTimestamp = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedSeconds = (now - this.lastRefillTimestamp) / 1000;
    this.tokens = Math.min(this.capacity, this.tokens + elapsedSeconds * this.refillRatePerSecond);
    this.lastRefillTimestamp = now;
  }

  public tryConsume(tokensRequested: number = 1): boolean {
    this.refill();
    if (this.tokens >= tokensRequested) {
      this.tokens -= tokensRequested;
      return true;
    }
    return false;
  }

  public getAvailableTokens(): number {
    this.refill();
    return Math.floor(this.tokens * 100) / 100;
  }
}

export const GeminiRateLimiterInstance = new GeminiTokenBucketRateLimiter(15, 3);

/**
 * Executes a Gemini proxy request with scientific exponential backoff and rate limit guarding.
 */
export async function executeScientificGeminiRequest(
  apiKey: string,
  model: string,
  contents: any,
  systemInstruction?: string,
  maxRetries: number = 3
): Promise<any> {
  if (!GeminiRateLimiterInstance.tryConsume(1)) {
    throw new Error("Quota Spike Prevention: Rate limit exceeded. Please wait before sending another Gemini request.");
  }

  let attempt = 0;
  let delayMs = 1000;

  while (attempt < maxRetries) {
    try {
      const response = await fetch("/api/gemini/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, model, contents, systemInstruction })
      });

      if (response.status === 429) {
        // Rate limited by API, apply exponential backoff
        attempt++;
        if (attempt >= maxRetries) throw new Error("Gemini API Quota Exhausted (429 Too Many Requests).");
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        delayMs *= 2;
        continue;
      }

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errJson.error || `Gemini proxy error status ${response.status}`);
      }

      return await response.json();
    } catch (err: any) {
      if (attempt >= maxRetries - 1) throw err;
      attempt++;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      delayMs *= 2;
    }
  }

  throw new Error("Maximum retry attempts reached for scientific Gemini request.");
}

export const GeminiGeneral = {
  ...GeminiGeneralData,
  rateLimiter: GeminiRateLimiterInstance,
  executeRequest: executeScientificGeminiRequest
};
