/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Callie Rose's unique Elegant Chatter sound sequence using the Web Audio API.
 * High-speed, crystal-clear dual-harmonic sweeps with formant filtering and anti-clicking attack ramp.
 */
export function playCallieRoseChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.CALLIE_ROSE] || {
    pitchOffsetRatio: -0.0355,
    startFreq: 1279.86,
    endFreq: 443.03
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

export default playCallieRoseChatter;
