/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Melissa's unique Elegant Chatter sound sequence using the Web Audio API.
 * High-speed, pleasant, crystal-clear sweeps reflecting her elegant nature.
 */
export function playMelissaElegantChatter(ctx: AudioContext, isRetro: boolean = false, destination: AudioNode = ctx.destination) {
  const config = OpossumChatterConfigs[OpossumId.MELISSA];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

