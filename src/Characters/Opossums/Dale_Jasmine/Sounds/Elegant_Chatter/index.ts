/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Dale Jasmine's unique Elegant Chatter sound sequence using the Web Audio API.
 * Pitch is mathematically tuned to 0.008% higher than Stacey Jasmine.
 */
export function playDaleJasminChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.DALE_JASMINE] || {
    pitchOffsetRatio: -0.03642292,
    startFreq: 1278.6822864,
    endFreq: 442.6154064
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

export default playDaleJasminChatter;
