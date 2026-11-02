/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Ashley's sturdy, cheerful chatter sequence using Web Audio API.
 * High-speed clicks and stable bird-like sweeping frequencies matching her sturdy poise.
 */
export function playAshleyElegantChatter(ctx: AudioContext, isRetro: boolean = false, destination: AudioNode = ctx.destination) {
  const config = OpossumChatterConfigs[OpossumId.ASHLEY];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

