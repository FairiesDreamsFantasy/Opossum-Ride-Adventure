/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { KENDRA_CURTIS_CONFIG } from "./General";
import { KENDRA_CURTIS_MONKEY } from "./profile";
import { KENDRA_CURTIS_BIOGRAPHY, KENDRA_CURTIS_DIMENSIONS } from "./Description";
import { KENDRA_CURTIS_COLORS } from "./Color_Palette";
import * as Animations from "./Animations";

export * from "./General";
export * from "./Description";
export * from "./Color_Palette";
export * from "./Animations";
export { KENDRA_CURTIS_MONKEY };

export const KendraCurtisCharacter = {
  config: KENDRA_CURTIS_CONFIG,
  profile: KENDRA_CURTIS_MONKEY,
  dimensions: KENDRA_CURTIS_DIMENSIONS,
  biography: KENDRA_CURTIS_BIOGRAPHY,
  colors: KENDRA_CURTIS_COLORS,
  animations: Animations
};

export default KendraCurtisCharacter;
