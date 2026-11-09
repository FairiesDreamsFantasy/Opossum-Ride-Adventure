/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Jamie Jasmine's unique Elegant Chatter sound sequence using the Web Audio API.
 * Pitch is mathematically tuned to 0.008% higher than Qi Jasmine.
 */
export function playJamieJasminChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.JAMIE_JASMINE] || {
    pitchOffsetRatio: -0.03632292,
    startFreq: 1278.810156674532,
    endFreq: 442.659668648825
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

export default playJamieJasminChatter;
