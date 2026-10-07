/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Saffron Rose's unique Elegant Chatter sound sequence using the Web Audio API.
 * 2% lower than Melissa's elegant chatter in pitch (frequency) and volume.
 */
export function playSaffronElegantChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
) {
  const config = OpossumChatterConfigs[OpossumId.SAFFRON_ROSE];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

