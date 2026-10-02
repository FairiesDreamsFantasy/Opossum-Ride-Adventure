/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumId } from "../../../../../../../types";

export interface OpossumChatterConfig {
  pitchOffsetRatio: number;
  startFreq: number;
  endFreq: number;
  chatterRate?: number;
}

export const OpossumChatterConfigs: Record<string, OpossumChatterConfig> = {
  [OpossumId.MELISSA]: { pitchOffsetRatio: 1.0, startFreq: 1200, endFreq: 400 },
  [OpossumId.ASHLEY]: { pitchOffsetRatio: 1.1, startFreq: 1300, endFreq: 450 },
  [OpossumId.AMARA_QIN]: { pitchOffsetRatio: 0.95, startFreq: 1100, endFreq: 380 },
  [OpossumId.SAFFRON_ROSE]: { pitchOffsetRatio: 1.05, startFreq: 1250, endFreq: 420 },
  [OpossumId.JALISSA_CHIN]: { pitchOffsetRatio: 1.0, startFreq: 1200, endFreq: 400 },
  [OpossumId.ARDEN_ROSIE]: { pitchOffsetRatio: 0.93, startFreq: 1050, endFreq: 350 },
  [OpossumId.JAHMELLA_ROSE]: { pitchOffsetRatio: 1.02, startFreq: 1220, endFreq: 410 },
  [OpossumId.DAGMAR_KONE_REYNOLDS]: { pitchOffsetRatio: 0.98, startFreq: 1150, endFreq: 390 },
  [OpossumId.AGAPE_ROSE]: { pitchOffsetRatio: 1.08, startFreq: 1280, endFreq: 440 },
  [OpossumId.ROXANNE_KONE_REYNOLDS]: { pitchOffsetRatio: 1.0, startFreq: 1200, endFreq: 400 },
  [OpossumId.TIANA_QIN]: { pitchOffsetRatio: 1.15, startFreq: 1400, endFreq: 500 },
  [OpossumId.WANDA]: { pitchOffsetRatio: 0.9, startFreq: 1000, endFreq: 330 },
  [OpossumId.OLIVIA_CHIN]: { pitchOffsetRatio: 1.0, startFreq: 1200, endFreq: 400 },
  [OpossumId.RUTH_KONE_REYNOLDS]: { pitchOffsetRatio: 1.03, startFreq: 1240, endFreq: 415 },
  [OpossumId.KADY_ROSE]: { pitchOffsetRatio: 1.07, startFreq: 1270, endFreq: 430 },
  [OpossumId.SANDRA]: { pitchOffsetRatio: 0.96, startFreq: 1120, endFreq: 375 },
  [OpossumId.DRAKE_KONE_REYNOLDS]: { pitchOffsetRatio: 0.85, startFreq: 900, endFreq: 300 },
};
