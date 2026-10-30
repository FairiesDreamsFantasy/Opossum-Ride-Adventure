/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { OpossumCharacter } from "../../../../../../../../../types";
import { BaseNarration } from "../../Logic/Base_Narration";

/**
 * Compact Base Narration Helper
 * Specialized compiler for compact crafted opossums.
 * Ensures exact inclusion of shoulder height, head width, head height, and 4'4.44" rider capacity.
 */
export const CompactBaseNarration = {
  compileRiddenMountProfile: (op: OpossumCharacter): string => {
    return BaseNarration.compileRiddenMountProfile(op);
  },
  compileSelectionProfile: (op: OpossumCharacter): string => {
    const t = BaseNarration.extractTokens(op);
    const aesthetic = BaseNarration.describePhysicalAesthetic(op);
    const dimensions = `${t.pronoun} features a body length of ${op.length} inches, with a body width of ${op.width} inches, a head width of ${op.headWidth} inches, a head height of ${op.headHeight} inches (excluding ears), and a registered shoulder height of ${op.shoulderHeight}.`;
    const capacity = `Perfect compact spacing accommodates rider heights of up to 4 feet and 4.44 inches comfortably.`;
    const facial = `Nose: ${op.noseColor}. Eyes: ${op.eyeColor}.`;
    const background = `Background: ${op.description}`;

    return `Profile of compact mount ${op.name}. ${aesthetic} ${dimensions} ${capacity} ${facial} ${background}`.trim();
  }
};
