/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ValidationMetric {
  name: string;
  result: boolean;
  scientificConfidence: number; // 0.0 to 1.0
}

export interface ValidationReport {
  timestamp: number;
  isCompliant: boolean;
  metrics: ValidationMetric[];
}
