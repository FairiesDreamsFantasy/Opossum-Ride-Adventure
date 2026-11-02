/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCraftedOpossumElegantChatterA } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/A";
import { OpossumChatterConfigs } from "../../../../../System/Sound/SFX/Category/Opossum/Elegant/Chatter/General";
import { OpossumId } from "../../../../../types";

export function playRuthChatter(
  ctx: AudioContext,
  isRetro: boolean = false,
  destination: AudioNode = ctx.destination
): void {
  const config = OpossumChatterConfigs[OpossumId.RUTH_KONE_REYNOLDS];
  playCraftedOpossumElegantChatterA(
    ctx,
    destination,
    isRetro,
    config.pitchOffsetRatio,
    config.startFreq,
    config.endFreq
  );
}

export default playRuthChatter;
