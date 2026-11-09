/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Qi Jasmine's unique Elegant Chatter sound sequence using the Web Audio API.
 * Pitch is mathematically tuned to 0.002% higher than Dale Jasmine.
 */
export function playQiJasminChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.QI_JASMINE] || {
    pitchOffsetRatio: -0.03640292,
    startFreq: 1278.707860045728,
    endFreq: 442.624258708128
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

export default playQiJasminChatter;
