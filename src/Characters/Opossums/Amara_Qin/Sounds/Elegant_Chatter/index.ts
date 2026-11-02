/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Amara Qin's unique majestic Elegant Chatter sound sequence using the Web Audio API.
 * High-speed, clear, and bright chirrups reflecting her white-furred majestic presence.
 */
export function playAmaraElegantChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
) {
  const config = OpossumChatterConfigs[OpossumId.AMARA_QIN];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

