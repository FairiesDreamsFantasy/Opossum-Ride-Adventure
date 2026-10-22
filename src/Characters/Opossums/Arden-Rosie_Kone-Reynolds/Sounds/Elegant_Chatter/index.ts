/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Arden-Rosie's elegant chatter sequence using Web Audio API.
 * Pitch is 7% lower than Ashley's chatter.
 */
export function playArdenRosieElegantChatter(ctx: AudioContext, isRetro: boolean = false, destination: AudioNode = ctx.destination) {
  const config = OpossumChatterConfigs[OpossumId.ARDEN_ROSIE];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

