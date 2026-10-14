/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SecurityEngineGeneralConfig, SecurityEngineConfigModel } from "./General";
import { EntropyEngine, ShannonEntropyReport } from "./Entropy";
import { RateLimiterEngine, BurstMetricsReport } from "./Rate_Limiter";
import * as Languages from "./Languages";
import { PostQuantumLattice } from "./Post_Quantum_Lattice";

export * from "./General";
export * from "./Entropy";
export * from "./Rate_Limiter";
export * from "./Languages";
export * from "./Post_Quantum_Lattice";

/**
 * System Security Engine Coordinator
 * 
 * Unifies Shannon Information Entropy analysis, continuous Leaky-Bucket fluid rate limiting,
 * deterministic mathematical digest verification, and multi-language engines (Assembly, Python, R, Rust, Cotlin, PHP, SQL, XML, CSV, Swift, Java) under the 75,000,000,000% Standard.
 */
export class SecurityEngineController {
  private static instance: SecurityEngineController;
  private config: SecurityEngineConfigModel = SecurityEngineGeneralConfig;
  public readonly Languages = Languages;
  public readonly PostQuantumLattice = PostQuantumLattice;

  private constructor() {}

  public static getInstance(): SecurityEngineController {
    if (!SecurityEngineController.instance) {
      SecurityEngineController.instance = new SecurityEngineController();
    }
    return SecurityEngineController.instance;
  }

  public readonly Entropy = EntropyEngine;
  public readonly RateLimiter = RateLimiterEngine;

  /**
   * Evaluates input intervals and burst rates simultaneously, producing an aggregate security index.
   */
  public evaluateSystemSecurity(intervals: number[]): {
    isSecure: boolean;
    entropy: ShannonEntropyReport;
    burst: BurstMetricsReport;
    securityIndex: number;
  } {
    const entropyReport = this.Entropy.computeShannonEntropy(intervals);
    const burstReport = this.RateLimiter.registerEventAndEvaluate();

    const isSecure = entropyReport.isHumanCadence && !burstReport.burstExceeded;
    const securityIndex = Number(
      Math.max(0, Math.min(100, (entropyReport.calculatedEntropy / 4.0) * 50 + (1 - burstReport.anomalyScore) * 50)).toFixed(2)
    );

    return {
      isSecure,
      entropy: entropyReport,
      burst: burstReport,
      securityIndex
    };
  }
}

export const SecurityEngine = SecurityEngineController.getInstance();
