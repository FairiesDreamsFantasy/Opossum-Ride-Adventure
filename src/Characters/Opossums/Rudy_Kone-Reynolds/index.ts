/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from '../../../types';
import { RudyProfile } from './profile';
import { RUDY_KONE_REYNOLDS_DESCRIPTION, parts } from './Description';
import { RUDY_KONE_REYNOLDS_DIMENSIONS } from './Description/Dimensions';
import { RudyKoneReynoldsGeneral } from './General';
import { playCompactOpossumSound } from '../../../System/Sound/SFX/Category/Opossum/Compact';

export * from './profile';
export * from './General';
export * from './Description';
export * from './Animations';

export const playRudyCompactSound = (_ctx?: AudioContext, _isRetro?: boolean, _dest?: AudioNode) => {
  playCompactOpossumSound("chuff", 0.92);
};

export const RudyKoneReynoldsOpossum: OpossumCharacter = {
  id: OpossumId.RUDY_KONE_REYNOLDS,
  name: "Rudy Kone-Reynolds",
  width: 27,
  length: 64,
  headWidth: 24,
  headHeight: 32,
  shoulderHeight: RUDY_KONE_REYNOLDS_DIMENSIONS.shoulderHeight,
  color: "Yellow (Brown Circles)",
  eyeColor: "Blue",
  noseColor: "Brownish-Red",
  tailColor: "Dark-brown",
  innerEarColor: "Brownish-Red",
  gender: "Male",
  sex: "Jack",
  headOrientation: "Standard",
  description: RUDY_KONE_REYNOLDS_DESCRIPTION,
  playChatter: playRudyCompactSound
};

export const RudyKoneReynolds = {
  ...RudyProfile,
  description: RUDY_KONE_REYNOLDS_DESCRIPTION,
  dimensions: RUDY_KONE_REYNOLDS_DIMENSIONS,
  general: RudyKoneReynoldsGeneral,
  parts,
  character: RudyKoneReynoldsOpossum
};

export default RudyKoneReynoldsOpossum;
