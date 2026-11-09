/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Camryn Opossum's unique Elegant Chatter sound sequence using the Web Audio API.
 * Pitch is mathematically tuned to 1.5% higher than Jacinta Opossum.
 */
export function playCamrynOpossumChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.CAMRYN_OPOSSUM] || {
    pitchOffsetRatio: 0.025150000000,
    startFreq: 1332.695000000000,
    endFreq: 461.317500000000
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

export default playCamrynOpossumChatter;
