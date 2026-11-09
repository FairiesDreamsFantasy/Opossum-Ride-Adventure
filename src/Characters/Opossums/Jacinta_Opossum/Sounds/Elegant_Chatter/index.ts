/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Jacinta Opossum's unique Elegant Chatter sound sequence using the Web Audio API.
 * Pitch is mathematically tuned to 1.0% higher than Melissa Opossum.
 */
export function playJacintaOpossumChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.JACINTA_OPOSSUM] || {
    pitchOffsetRatio: 0.010000000000,
    startFreq: 1313.000000000000,
    endFreq: 454.500000000000
  };

  const output = dest || ctx.destination;
  playCraftedOpossumElegantChatterA(
    ctx,
    output,
    isRetro,
    config.pitchOffsetRatio,
    config.startFreq,
    config.endFreq
  );
}

export default playJacintaOpossumChatter;
