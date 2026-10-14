/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Roxanne Kone-Reynolds's unique Elegant Chatter sound sequence using the Web Audio API.
 * 1% lower frequency pitch than Agape Rose (5% lower than Saffron Rose).
 */
export function playRoxanneElegantChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
) {
  const config = OpossumChatterConfigs[OpossumId.ROXANNE_KONE_REYNOLDS];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

