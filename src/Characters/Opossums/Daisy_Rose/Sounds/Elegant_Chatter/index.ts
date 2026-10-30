/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

/**
 * Triggers Daisy Rose's unique Elegant Chatter sound sequence using the Web Audio API.
 * High-speed, crystal-clear dual-harmonic sweeps with formant filtering and anti-clicking attack ramp.
 */
export function playDaisyRoseChatter(ctx: AudioContext, isRetro: boolean = false, dest?: AudioNode) {
  const config = OpossumChatterConfigs[OpossumId.DAISY_ROSE] || {
    pitchOffsetRatio: -0.035,
    startFreq: 1280.5,
    endFreq: 443.25
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

export default playDaisyRoseChatter;
