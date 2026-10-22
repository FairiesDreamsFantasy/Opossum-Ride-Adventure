/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Jahmella Rose's elegant chatter sequence using Web Audio API.
 * Pitch is set between Arden-Rosie Kone-Reynolds and Ashley Opossum.
 */
export function playJahmellaElegantChatter(ctx: AudioContext, isRetro: boolean = false, destination: AudioNode = ctx.destination) {
  const config = OpossumChatterConfigs[OpossumId.JAHMELLA_ROSE];
  playCraftedOpossumElegantChatterA(ctx, destination, isRetro, config.pitchOffsetRatio, config.startFreq, config.endFreq);
}

