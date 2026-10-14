/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Bio_Feedback General: Biometric Normalization Models
 */

export interface BiometricSignal {
  heartRate: number;
  galvanicSkinResponse: number;
  eegAlphaWave: number;
  timestamp: number;
}

export class BioFeedbackMath {
  /**
   * Normalizes a raw sensor signal into a standard [0, 1] range.
   */
  public static normalizeSignal(raw: number, baseline: number, range: number): number {
    return Math.max(0, Math.min(1, (raw - baseline) / range));
  }

  /**
   * Calculates a 'Focus Score' based on EEG alpha wave intensity.
   */
  public static calculateFocusScore(alphaWave: number): number {
    return 1.0 - alphaWave; // Simplified: lower alpha often correlates with higher focus
  }
}

export default BioFeedbackMath;
