/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../../../../types";
import { CompactBaseNarration } from "../Logic";

/**
 * Modular Narration Profile for Arnold Rose (Compact Jack)
 */
export const ArnoldRoseNarration = {
  compileRidden: (op: OpossumCharacter): string => CompactBaseNarration.compileRiddenMountProfile(op),
  compileSelection: (op: OpossumCharacter): string => CompactBaseNarration.compileSelectionProfile(op),
  compile: (op: OpossumCharacter): string => CompactBaseNarration.compileRiddenMountProfile(op)
};

export default ArnoldRoseNarration;
