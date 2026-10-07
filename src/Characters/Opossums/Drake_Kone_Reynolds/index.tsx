/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter, OpossumId } from "../../../types";
import { DRAKE_KONE_REYNOLDS_DESCRIPTION, parts } from "./Description";
import { DRAKE_KONE_REYNOLDS_DIMENSIONS } from "./Description/Dimensions";
import { playDrakeBark } from "./Sounds/Bark";
import { DRAKE_KONE_REYNOLDS_GENERAL } from "./General";

export * from "./General";
export * from "./Description";
export * from "./Animations";
export * from "./Sounds";

export const DrakeKoneReynoldsOpossum: OpossumCharacter = {
  id: OpossumId.DRAKE_KONE_REYNOLDS,
  name: "Drake Kone-Reynolds",
  width: DRAKE_KONE_REYNOLDS_DIMENSIONS.width,
  length: DRAKE_KONE_REYNOLDS_DIMENSIONS.length,
  headWidth: DRAKE_KONE_REYNOLDS_DIMENSIONS.headWidth,
  headHeight: DRAKE_KONE_REYNOLDS_DIMENSIONS.headHeight,
  shoulderHeight: DRAKE_KONE_REYNOLDS_DIMENSIONS.shoulderHeight,
  color: "Red (7 Silver Stripes)",
  eyeColor: "Green",
  noseColor: "Red",
  tailColor: "Red",
  innerEarColor: "Reddish-Brown",
  gender: "Male",
  headOrientation: "perched forward",
  description: DRAKE_KONE_REYNOLDS_DESCRIPTION,
  playChatter: playDrakeBark
};

export default DrakeKoneReynoldsOpossum;
