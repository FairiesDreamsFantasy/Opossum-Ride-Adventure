/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { playCompactOpossumSound } from "../../../../System/Sound/SFX/Category/Opossum/Compact";

export const playEugeneCompactSound = (_ctx?: AudioContext, _isRetro?: boolean, _dest?: AudioNode) => {
  playCompactOpossumSound("chuff", 0.95);
};

export const EugeneRoseSounds = {
  playChatter: playEugeneCompactSound
};
