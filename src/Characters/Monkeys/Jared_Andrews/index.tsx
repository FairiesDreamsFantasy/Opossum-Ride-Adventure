/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { JARED_MONKEY } from "./profile";
import * as Animations from "./Animations";

export * from "./General";

export const JaredAndrewsCharacter = {
  profile: JARED_MONKEY,
  ...Animations
};


export const JaredMonkeyCharacter = JaredAndrewsCharacter;
