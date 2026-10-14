/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../../types";

export interface OpossumChatterConfig {
  pitchOffsetRatio: number;
  startFreq: number;
  endFreq: number;
}

export type OpossumChatterProfile = OpossumChatterConfig;

/**
 * 64-bit DSP Centralized Opossum Elegant Chatter Configuration Registry
 * Eliminates character-level hardcoding by defining mathematically precise (64-bit IEEE 754)
 * tuning parameters for each crafted opossum.
 */
export const OpossumChatterConfigs: Record<OpossumId, OpossumChatterConfig> = {
  [OpossumId.MELISSA]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000
  },
  [OpossumId.ASHLEY]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1150.000000000000,
    endFreq: 380.000000000000
  },
  [OpossumId.AMARA_QIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1400.000000000000,
    endFreq: 500.000000000000
  },
  [OpossumId.SAFFRON_ROSE]: {
    pitchOffsetRatio: -0.020000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000
  },
  [OpossumId.JALISSA_CHIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1287.000000000000,
    endFreq: 445.500000000000
  },
  [OpossumId.ARDEN_ROSIE]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1069.500000000000,
    endFreq: 353.400000000000
  },
  [OpossumId.JAHMELLA_ROSE]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1109.750000000000,
    endFreq: 366.700000000000
  },
  [OpossumId.DAGMAR_KONE_REYNOLDS]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1138.500000000000,
    endFreq: 376.200000000000
  },
  [OpossumId.AGAPE_ROSE]: {
    pitchOffsetRatio: -0.059200000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000
  },
  [OpossumId.ROXANNE_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.068608000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000
  },
  [OpossumId.TIANA_QIN]: {
    pitchOffsetRatio: -0.030000000000,
    startFreq: 1400.000000000000,
    endFreq: 500.000000000000
  },
  [OpossumId.WANDA]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000
  },
  [OpossumId.OLIVIA_CHIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1312.740000000000,
    endFreq: 454.410000000000
  },
  [OpossumId.RUTH_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.105863680000,
    startFreq: 1162.377216000000,
    endFreq: 402.361344000000
  },
  [OpossumId.KADY_ROSE]: {
    pitchOffsetRatio: -0.101536000000,
    startFreq: 1168.003200000000,
    endFreq: 404.308800000000
  },
  [OpossumId.SANDRA]: {
    pitchOffsetRatio: -0.115384615385,
    startFreq: 1150.000000000000,
    endFreq: 380.000000000000
  },
  [OpossumId.DRAKE_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.120000000000,
    startFreq: 1120.000000000000,
    endFreq: 370.000000000000
  }
};

/**
 * Elegant Opossum Chatter General Parameters (64-bit DSP precision)
 * Centralized constants and frequency scaling utilities for crafted opossum vocal chatter.
 */
export const ElegantChatterGeneral = {
  bitDepth: 64 as const,
  baseChirpCount: 6,
  baseSpacing: 0.080000000000,
  baseDuration: 0.040000000000,
  baseMaxVolume: 0.200000000000,
  defaultWaveform: "sawtooth" as const,
  retroWaveform: "square" as const,
  
  calculateFrequency64: (baseFreq: number, pitchOffsetRatio: number = 0.000000000000) => {
    return baseFreq * (1.000000000000 + pitchOffsetRatio);
  }
};

