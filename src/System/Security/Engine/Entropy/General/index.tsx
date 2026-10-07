/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ShannonEntropyReport {
  calculatedEntropy: number;
  sampleSize: number;
  isHumanCadence: boolean;
  varianceScore: number;
}

export const EntropyGeneralConfig = {
  name: "Entropy Analysis General",
  module: "System/Security/Engine/Entropy",
  version: "0.1.0.2",
  standard: "40,000,000,000%_ULTRA_BROAD",
  minSamplesRequired: 8
};
