/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../../types";
import { OpossumChatterVariableGeneral } from "./General";

export * from "./General";

export interface ChatterPitchVariable {
  pitchOffsetRatio: number;
  startFreq: number;
  endFreq: number;
  chirpCount: number;
  spacing: number;
  duration: number;
  maxVolume: number;
  waveform: OscillatorType;
}

/**
 * Mathematical Chatter Pitch & Harmonic Variables for each Handcrafted Opossum
 * Preserves the exact sacred mathematical pitch relationships across all 16 characters.
 */
export const OPOSSUM_CHATTER_PITCH_VARIABLES: Record<OpossumId, ChatterPitchVariable> = {
  [OpossumId.MELISSA]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.ASHLEY]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1150.000000000000,
    endFreq: 380.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.AMARA_QIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1400.000000000000,
    endFreq: 500.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.SAFFRON_ROSE]: {
    pitchOffsetRatio: -0.020000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.JALISSA_CHIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1287.000000000000,
    endFreq: 445.500000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.ARDEN_ROSIE]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1069.500000000000,
    endFreq: 353.400000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.JAHMELLA_ROSE]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1109.750000000000,
    endFreq: 366.700000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.DAGMAR_KONE_REYNOLDS]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1138.500000000000,
    endFreq: 376.200000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.AGAPE_ROSE]: {
    pitchOffsetRatio: -0.059200000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.ROXANNE_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.068608000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.TIANA_QIN]: {
    pitchOffsetRatio: -0.030000000000,
    startFreq: 1400.000000000000,
    endFreq: 500.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.WANDA]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1300.000000000000,
    endFreq: 450.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.OLIVIA_CHIN]: {
    pitchOffsetRatio: 0.000000000000,
    startFreq: 1312.740000000000,
    endFreq: 454.410000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.RUTH_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.105863680000,
    startFreq: 1162.377216000000,
    endFreq: 402.361344000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.KADY_ROSE]: {
    pitchOffsetRatio: -0.101536000000,
    startFreq: 1168.003200000000,
    endFreq: 404.308800000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.SANDRA]: {
    pitchOffsetRatio: -0.115384615385,
    startFreq: 1150.000000000000,
    endFreq: 380.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.DRAKE_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.120000000000,
    startFreq: 1120.000000000000,
    endFreq: 370.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.RUDY_KONE_REYNOLDS]: {
    pitchOffsetRatio: -0.050000000000,
    startFreq: 1180.000000000000,
    endFreq: 390.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.EUGENE_ROSE]: {
    pitchOffsetRatio: -0.015000000000,
    startFreq: 1100.000000000000,
    endFreq: 375.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.DAISY_ROSE]: {
    pitchOffsetRatio: -0.035000000000,
    startFreq: 1280.500000000000,
    endFreq: 443.250000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.CALLIE_ROSE]: {
    pitchOffsetRatio: -0.035500000000,
    startFreq: 1279.860000000000,
    endFreq: 443.030000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.STACEY_JASMIN]: {
    pitchOffsetRatio: -0.036500000000,
    startFreq: 1278.580000000000,
    endFreq: 442.580000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.ARNOLD_ROSE]: {
    pitchOffsetRatio: -0.050000000000,
    startFreq: 1150.000000000000,
    endFreq: 380.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.MELVIN_QIN]: {
    pitchOffsetRatio: -0.045000000000,
    startFreq: 1160.000000000000,
    endFreq: 385.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.SAFFORD_CHIN]: {
    pitchOffsetRatio: -0.040000000000,
    startFreq: 1155.000000000000,
    endFreq: 382.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.IVAN_OPOSSUM]: {
    pitchOffsetRatio: -0.042000000000,
    startFreq: 1158.000000000000,
    endFreq: 384.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  },
  [OpossumId.ISAAC_OPOSSUM]: {
    pitchOffsetRatio: -0.043000000000,
    startFreq: 1152.000000000000,
    endFreq: 381.000000000000,
    chirpCount: 6,
    spacing: 0.08,
    duration: 0.04,
    maxVolume: 0.20,
    waveform: "sawtooth"
  }
};

/**
 * Procedural Dynamic Frequency Generator for Custom/Generic Opossums
 */
export const calculateOpossumFrequency = (
  baseFreq: number,
  pitchOffsetRatio: number = 0
): number => {
  return Math.max(
    OpossumChatterVariableGeneral.pitchRangeBounds.minFreq,
    Math.min(
      OpossumChatterVariableGeneral.pitchRangeBounds.maxFreq,
      baseFreq * (1.0 + pitchOffsetRatio)
    )
  );
};
