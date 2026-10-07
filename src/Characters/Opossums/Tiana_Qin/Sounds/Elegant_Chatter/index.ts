/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Tiana Qin's unique Elegant Chatter sound sequence using the Web Audio API.
 * 3% lower frequency pitch than Amara Qin's chatter.
 */
export function playTianaElegantChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
) {
  const config = OpossumChatterConfigs[OpossumId.TIANA_QIN];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

