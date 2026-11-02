/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Dagmar's elegant chatter sequence using Web Audio API.
 * Pitch is 1% lower than Ashley's chatter.
 */
export function playDagmarElegantChatter(ctx: AudioContext, isRetro: boolean = false, destination: AudioNode = ctx.destination) {
  const config = OpossumChatterConfigs[OpossumId.DAGMAR_KONE_REYNOLDS];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

