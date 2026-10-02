/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MelissaOpossumRegistry } from "../../Crafted/Melissa_Opossum";
import { AshleyOpossumRegistry } from "../../Crafted/Ashley_Opossum";

export const GeneralPasselRegistry = {
  id: "general-passels",
  description: "Opossum passels with only 'Opossum' as their last name or other generalized surnames.",
  passels: {
    Opossum: [MelissaOpossumRegistry, AshleyOpossumRegistry]
  }
};
