/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { EntropyGeneralConfig, ShannonEntropyReport } from "./General";
import { SecurityEngineGeneralConfig } from "../General";

export * from "./General";

/**
 * Shannon Entropy & Statistical Variance Analyzer
 * 
 * Uses Claude Shannon's Information Entropy Formula:
 * H(X) = - SUM( P(x_i) * log2(P(x_i)) )
 * to mathematically evaluate input deltas (keystrokes and pointer moves) and separate
 * natural human motor variance from synthetic, zero-entropy bot scripts.
 */
export class EntropyEngineController {
  private static instance: EntropyEngineController;

  private constructor() {}

  public static getInstance(): EntropyEngineController {
    if (!EntropyEngineController.instance) {
      EntropyEngineController.instance = new EntropyEngineController();
    }
    return EntropyEngineController.instance;
  }

  public computeShannonEntropy(intervals: number[]): ShannonEntropyReport {
    if (intervals.length < EntropyGeneralConfig.minSamplesRequired) {
      return {
        calculatedEntropy: 4.0,
        sampleSize: intervals.length,
        isHumanCadence: true,
        varianceScore: 1.0
      };
    }

    // Discretize intervals into 10ms histogram bins
    const bins = new Map<number, number>();
    for (const delta of intervals) {
      const bin = Math.floor(delta / 10);
      bins.set(bin, (bins.get(bin) || 0) + 1);
    }

    const n = intervals.length;
    let entropy = 0;
    for (const count of bins.values()) {
      const p = count / n;
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }

    // Statistical variance: Var(X) = E[X^2] - (E[X])^2
    const mean = intervals.reduce((a, b) => a + b, 0) / n;
    const variance = intervals.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;

    const isHuman = entropy >= SecurityEngineGeneralConfig.entropyThresholdBits || variance > 25;

    return {
      calculatedEntropy: Number(entropy.toFixed(4)),
      sampleSize: n,
      isHumanCadence: isHuman,
      varianceScore: Number(variance.toFixed(2))
    };
  }
}

export const EntropyEngine = EntropyEngineController.getInstance();
