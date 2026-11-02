/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Agape Rose's unique Elegant Chatter sound sequence using the Web Audio API.
 * 4% lower frequency pitch than Saffron Rose's elegant chatter.
 */
export function playAgapeElegantChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
) {
  const config = OpossumChatterConfigs[OpossumId.AGAPE_ROSE];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

