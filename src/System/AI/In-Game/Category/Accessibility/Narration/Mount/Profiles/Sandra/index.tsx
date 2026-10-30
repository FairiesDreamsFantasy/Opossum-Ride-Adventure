/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../../../types";
import { BaseNarration } from "../../Logic/Base_Narration";

/**
 * Modular Narration Profile for Sandra
 * Un-diluted zero-omission standard for Ridden Welcome and Selection Screen.
 */
export const SandraNarration = {
  compileRidden: (op: OpossumCharacter): string => BaseNarration.compileRiddenMountProfile(op),
  compileSelection: (op: OpossumCharacter): string => BaseNarration.compileSelectionProfile(op),
  compile: (op: OpossumCharacter): string => BaseNarration.compileRiddenMountProfile(op)
};

export default SandraNarration;
