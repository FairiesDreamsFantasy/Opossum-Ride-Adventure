/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../../../../types";
import { CompactBaseNarration } from "../Logic";

/**
 * Modular Narration Profile for Ivan Opossum (Compact Jack)
 */
export const IvanOpossumNarration = {
  compileRidden: (op: OpossumCharacter): string => CompactBaseNarration.compileRiddenMountProfile(op),
  compileSelection: (op: OpossumCharacter): string => CompactBaseNarration.compileSelectionProfile(op),
  compile: (op: OpossumCharacter): string => CompactBaseNarration.compileRiddenMountProfile(op)
};

export default IvanOpossumNarration;
