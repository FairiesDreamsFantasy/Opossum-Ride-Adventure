/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Stacey Jasmin's unique Elegant Chatter sound sequence using the Web Audio API.
 * High-speed, crystal-clear dual-harmonic sweeps with formant filtering and anti-clicking attack ramp.
 */
export function playStaceyJasminChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.STACEY_JASMIN] || {
    pitchOffsetRatio: -0.0365,
    startFreq: 1278.58,
    endFreq: 442.58
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

export default playStaceyJasminChatter;
